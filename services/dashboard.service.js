import { School } from "../models/school.model.js";

export const dashboardData = async({
    user:{
        userId,
        roleId
    },
    query:{
      user
    }
})=>{
    let totalSchools, lostSchools, hotLead ;
    if(roleId ==='User' && userId){
       totalSchools = await School.countDocuments({userId});
       lostSchools = await School.countDocuments({userId,lost:true});
       hotLead = await School.countDocuments({userId,lead:true})
    }
    if(user){
      totalSchools = await School.countDocuments({userId:user})
      lostSchools = await School.countDocuments({userId:user,lost:true});
      hotLead = await School.countDocuments({userId:user,lead:true})
    }
    if(totalSchools!==undefined && lostSchools!==undefined && hotLead!==undefined){
        return {
            totalSchools,
            lostSchools,
            hotLead
        }
    }else{
        throw{
            status:400,
            message:'No Dashboard Data present'
        }
    }
}

export const adminDashboard = async()=>{
    const results = await School.aggregate([
        {
          $group: {
            _id: "$userId",
            totalSchools: { $sum: 1 },
            leadTrueCount: { $sum: { $cond: ["$lead", 1, 0] } },
            lostTrueCount: { $sum: { $cond: ["$lost", 1, 0] } }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $unwind: "$user"
        },
        {
          $project: {
            _id: 0,
            userId: "$_id",
            username: "$user.first_name",
            totalSchools: 1,
            leadTrueCount: 1,
            lostTrueCount: 1
          }
        }
      ]);
      const totalSchools = await School.countDocuments();
      const lostSchools = await School.countDocuments({lost:true});
      const hotLead = await School.countDocuments({lead:true})
    if(results){
        return {
          results,
          totalSchools,
          lostSchools,
          hotLead
        }
    }else{
        throw{
            status:400,
            message:'Something went wrong. Try Again'
        }
    }
}