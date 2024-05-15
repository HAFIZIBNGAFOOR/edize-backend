import { School } from "../models/school.model.js";

export const dashboardData = async({
    user:{
        userId
    }
})=>{
    console.log(userId,' this is the user');
    const totalSchools = await School.countDocuments({userId});
    const lostSchools = await School.countDocuments({userId,lost:true});
    const hotLead = await School.countDocuments({userId,lead:true})
    console.log(totalSchools, lostSchools, hotLead);
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
            username: "$user.username",
            totalSchools: 1,
            leadTrueCount: 1,
            lostTrueCount: 1
          }
        }
      ]);
      console.log(results);
    if(results){
        return results
    }else{
        throw{
            status:400,
            message:'Something went wrong. Try Again'
        }
    }
}