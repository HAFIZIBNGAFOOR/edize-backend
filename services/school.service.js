import { appointmentEmailTemplate } from "../mail_templates/appointment_template.js";
import { prospectEmailTemplate } from "../mail_templates/prospect_template.js";
import { kdmMeetingEmailTemplate } from "../mail_templates/kdm_template.js";
import { School } from "../models/school.model.js";
import { sendMail } from "./nodemailer.service.js";
import { User } from "../models/user.model.js";
import { productPresentationEmailTemplate } from "../mail_templates/product_presentation_template.js";
import { hotLeadEmailTemplate } from "../mail_templates/hot_lead.template.js";
import { proposalSignedEmailTemplate } from "../mail_templates/proposal_signed.template.js";
import { parentOrientationEmailTemplate } from "../mail_templates/parent_orientation_template.js";
import { contractSignedEmailTemplate } from "../mail_templates/contract_signed_template.js";
import { lostEmailTemplate } from "../mail_templates/lost_template.js";
import { uploadToS3 } from "./aws.service.js";
import { productDemoEmailTemplate } from "../mail_templates/product_demo.js";

export const addSchool = async ({
    user: {
        userId
    },
    body: {
        school_name,
        Address,
        district,
        state,
        udise,
        phone
    }
}) => {
    const user =await User.findById(userId)
    if(user.isVerified == false || user.isVerified == undefined){
        throw {
            message:'User is Not verified',
            status:404
        }
    }
    if (!school_name) {
        throw {
            status: 400,
            message: 'Name is required'
        };
    }
    if (!Address) {
        throw {
            status: 400,
            message: 'Address is required'
        };
    }
    if (!district) {
        throw {
            status: 400,
            message: 'District is required'
        };
    }
    if (!state) {
        throw {
            status: 400,
            message: 'State is required'
        };
    }
    if (!udise) {
        throw {
            status: 400,
            message: 'UDISE Number is required'
        };
    }
    if (!phone) {
        throw {
            status: 400,
            message: 'Phone is required'
        };
    }

    const schoolExist = await School.findOne({
        name: school_name,
        UDSE_Number: udise
    });

    if (schoolExist) {
        let data = ''
        schoolExist.name == school_name ? schoolExist.UDSE_Number == udise ? data = 'Name and UDISE' : data = 'Name' : data = 'UDISE'
        throw {
            status: 400,
            message: `School with this ${data} already exists`
        };
    }

    const school = await School.create({
        name: school_name,
        address: Address,
        district,
        state,
        UDSE_Number: udise,
        phone,
        status: 'Prospect',
        userId
    });
    const schoolDetails = await School.findOne({ name: school_name })
    const username = await User.findById(userId)
    const sendingMail = await sendMail('prospect', prospectEmailTemplate(schoolDetails, username.first_name))
    if (school && sendingMail.isSend) return true;
    else throw {
        message: 'Unexpected error occured',
        status: 500
    };
};

export const appointment = async ({
    user: {
        userId
    },
    body: {
        KDM_Designation,
        KDM_Name,
        KDM_Mobile_Number,
        KDM_Meeting_time,
        city_of_school,
        schoolId
    }
}) => {
    console.log(userId, ' user id',
        KDM_Designation,
        KDM_Name,
        KDM_Mobile_Number,
        KDM_Meeting_time,
        city_of_school,
        schoolId
    )
    const updateSchool = await School.findByIdAndUpdate({ _id: schoolId },
        {
            $set: {
                KDM_Name,
                KDM_Designation,
                KDM_Meeting_time,
                KDM_Mobile_Number,
                city_of_school,
                status: 'appointment'
            }
        },
        { new: true }
    )
    const kdmDetails = await School.findById(schoolId)
    const user = await User.findById(userId)
    const sendingMail = await sendMail('appointment', appointmentEmailTemplate(kdmDetails, kdmDetails.name, user.first_name))
    if (updateSchool && sendingMail.isSend) {
        return true
    } else throw {
        status: 404,
        message: 'Error occured while saving data'
    }
}

export const kdmMeeting = async ({
    user: {
        userId
    },
    body: {
        Meeting_done_date,
        demoOption,
        Demo_schedule_date,
        schoolId,
        smartClassRooms,
        smartStudio,
        schoolInternet
    }
}) => {
    const demoB = Boolean(demoOption)
    console.log(smartClassRooms,smartStudio,schoolInternet);

    const facilities_available = []
    if(smartClassRooms){
        facilities_available.push('Smart Class Rooms')
    }
    if(smartStudio){
        facilities_available.push('Smart Studio')
    }
    if(schoolInternet){
        facilities_available.push('School Internet')
    }
    const updateSchool = await School.findByIdAndUpdate(
        { _id: schoolId }, {
        $set: {
            KDM_Meeting_Done_Date: Meeting_done_date,
            demo: demoB,
            Demo_schedule_date,
            facilities_available,
            status: 'kdm'
        }
    },
        { new: true }
    )
    const kdmDetails = await School.findById(schoolId)
    const user = await User.findById(userId)
    const sendingMail = await sendMail('kdm', kdmMeetingEmailTemplate(kdmDetails, kdmDetails.name, user.first_name))
    if (updateSchool && sendingMail.isSend) {
        return true
    } else throw {
        status: 404,
        message: 'Error occured while saving data'
    }
}
export const product_demo= async({
    user: {
        userId
    },
    body: {
        support_required,
        schoolId
    }  
})=>{ 
    const updateSchool = await School.findByIdAndUpdate(
        { _id: schoolId }, {
        $set: {
            support_required,
            status: 'product-demo'
        }
    },
        { new: true }
    )
    const kdmDetails = await School.findById(schoolId)
    const user = await User.findById(userId)
    const sendingMail = await sendMail('product-demo', productDemoEmailTemplate(kdmDetails, kdmDetails.name, user.first_name))
    if (updateSchool && sendingMail.isSend) {
        return true
    } else throw {
        status: 404,
        message: 'Error occured while saving data'
    }
}
export const product_presentation = async ({
    user: {
        userId
    },
    body: {
        participated_members,
        schoolId,
        demo_done_date,
        further_requirement
    }
}) => {
    console.log(participated_members,' sfmnedebooenononsnfd',demo_done_date)
    const updateSchool = await School.findByIdAndUpdate(
        { _id: schoolId }, {
        $set: {
            demo_attended_by: participated_members,
            demo_done_date,
            further_requirement,
            status: 'product-presentation'
        }
    },
        { new: true }
    )
    const details = await School.findById(schoolId)
    const user = await User.findById(userId)
    const sendingMail = await sendMail('product-presentation', productPresentationEmailTemplate(details, details.name, user.first_name))
    if (updateSchool && sendingMail.isSend) {
        return true
    } else throw {
        status: 404,
        message: 'Error occured while saving data'
    }
}

export const hotLead = async ({
    user: {
        userId
    },
    body: {
        interestedClasses,
        schoolId,
        product
    }
}) => {
    const students_count = interestedClasses.map(classValue => ({ class: classValue, count: null }));

    console.log(students_count, 'students count',interestedClasses);
    const updateSchool = await School.findByIdAndUpdate(
        { _id: schoolId }, {
        $set: {
            students_count,
            status: 'hot-lead',
            product,
            lead: true,
            lost: false
        }
    },
        { new: true }
    )
    const details = await School.findById(schoolId)
    const user = await User.findById(userId)
    const sendingMail = await sendMail('hot-lead', hotLeadEmailTemplate(details, details.name, user.first_name))
    if (updateSchool && sendingMail.isSend) {
        return true
    } else throw {
        status: 404,
        message: 'Error occured while saving data'
    }
}
export const proposalSinged = async ({
    user: {
        userId
    },
    body: {
        schoolId,
        price_for_classed,
        total_deal_year1,
        total_deal_year2,
        total_deal_year3,
        data
    },
    file
}) => {
    console.log(data,' datata');
    const formattedData = data.map(item => ({
        class: item.class,
        count: item.count
    }));
    console.log(formattedData,' formataeed');

    if(file){
        try {
            const url = await uploadToS3(file);
            if(url){
                const updateSchool = await School.findByIdAndUpdate(
                    { _id: schoolId }, {
                    $set: {
                        students_count: formattedData,
                        Price_for_class:price_for_classed,
                        total_deal:{
                            year1:total_deal_year1,
                            year2:total_deal_year2,
                            year3:total_deal_year3,
                        },
                        PO_scan_copy: url,
                        status: 'proposal-signed'
                    }
                },
                    { new: true }
                )
            
                const details = await School.findById(schoolId)
                const user = await User.findById(userId)
                const sendingMail = await sendMail('proposal-signed', proposalSignedEmailTemplate(details, details.name, user.first_name))
                if (updateSchool && sendingMail.isSend) {
                    return true
                } else throw {
                    status: 404,
                    message: 'Error occured while saving data'
                }
            }else {
                throw{
                    status:400,
                    message:'Error uploading to bucket'
                }
            }
        } catch (error) {
            console.log(error,' iside file updalod to aws');
            throw{
                status:500,
                message:`Internal server error ${error.message}`
            }
        }
        
    }else{
        throw{
            status:400,
            message:'No file present'
        } 
    }   
    
}

export const parentOrientation = async ({
    user: {
        userId
    },
    body: {
        PO_done_date,
        Parent_Orientation_Done_By,
        Parents_attended,
        schoolId
    }
}) => {
    const updateSchool = await School.findByIdAndUpdate(
        { _id: schoolId }, {
        $set: {
            Parent_Orientation_Done_Date: PO_done_date,
            Parent_Orientation_Done_By,
            Parents_attended,
            status: 'parent-orientation'
        }
    },
        { new: true }
    )

    const details = await School.findById(schoolId)
    const user = await User.findById(userId)
    const sendingMail = await sendMail('parent-orientation', parentOrientationEmailTemplate(details, details.name, user.first_name))
    if (updateSchool && sendingMail.isSend) {
        return true
    } else throw {
        status: 404,
        message: 'Error occured while saving data'
    }
}


export const contractSinged = async ({
    user: {
        userId
    },
    body: {
        schoolId,
        Boarding_student_count,
        Boarding_meeting_date
    },
    file
}) => {
    if(file){
        try {
            const url = await uploadToS3(file);
            if(url){
                const updateSchool = await School.findByIdAndUpdate(
                    { _id: schoolId }, {
                    $set: {
                        Contract_signed_copy:url,
                        Boarding_student_count,
                        Boarding_meeting_date, 
                        status:'contract-signed'
                    }
                },
                    { new: true }
                )
                const details = await School.findById(schoolId)
                const user = await User.findById(userId)
                const sendingMail = await sendMail('contract-signed', contractSignedEmailTemplate(details.name,details, user.first_name))
                if (updateSchool && sendingMail.isSend) {
                    return true
                } else throw {
                    status: 404,
                    message: 'Error occured while saving data'
                }
            }else {
                throw{
                    status:400,
                    message:'Error uploading to bucket'
                }
            }
        } catch (error) {
            console.log(error,' iside file updalod to aws');
            throw{
                status:500,
                message:`Internal server error ${error.message}`
            }
        }
        
    }else{
        throw{
            status:400,
            message:'No file present'
        } 
    }   
}

export const lostSchool = async ({
    user: {
        userId
    },
    body: {
        schoolId,
        remarks,
        next_year_prospect
    }
}) => {
    const updateSchool = await School.findByIdAndUpdate(
        { _id: schoolId },
        {
            $set: {
                lost: true,
                remarks,
                lead: false,
                next_year_prospect,
                status: "lost"
            }
        }
    )
    const details = await School.findById(schoolId)
    const user = await User.findById(userId)
    const sendingMail = await sendMail('lost', lostEmailTemplate(details, details.name, user.first_name))
    if (updateSchool && sendingMail.isSend) {
        return true
    } else throw {
        status: 404,
        message: 'Error occured while saving data'
    }
}

export const getClasses = async({
    query:{
        schoolId
    }
})=>{
    console.log(schoolId, 'sindeideeeeeds get calssses');
    const school = await School.findById(schoolId);
    const classes = school.students_count.map(count =>count.class)
    console.log(classes,'classess insde fet ckasees');
    return classes
}
export const getSchools = async ({
    user: {
        userId,
        roleId
    },
    query: {
        page,
        pageSize,
        searchTerm,
        user
    }
}) => {
        const pageNumber = parseInt(page) || 1;
        const limit = parseInt(pageSize) || 10;
        let query ={}
        if(userId && roleId=='User'){
             query.userId = userId 
        }
        if(user){
            query.userId = user
        }
        if (searchTerm) {
            query.name = { $regex: new RegExp(searchTerm, 'i') };
        }
        const totalCount = await School.countDocuments(query);
        const schools = await School.find(query).populate("userId")
            .skip((pageNumber - 1) * limit)
            .limit(limit);
        if (schools && schools.length > 0) {
            return { schools, totalCount };
        } else {
            throw {
                status: 404,
                message: 'No Schools found'
            }
        }
}

export const getAllSchools = async({
    user:{
        userId,
        roleId
    }
})=>{
    if(roleId!=='Admin'){
        const allSchools = await School.find({userId}) 
        return allSchools
    }else{
        const allSchools = await School.find()
        return allSchools
    }
    
}

export const singleSchool = async ({
    query: {
        id
    }

}) => {
    const school = await School.findById(id);
    if (school) {
        return school
    } else {
        throw {
            status: 404,
            message: 'No school found find '
        }
    }
}  
