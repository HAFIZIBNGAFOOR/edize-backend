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
        schoolId
    }
}) => {
    const demoB = Boolean(demoOption)
    const updateSchool = await School.findByIdAndUpdate(
        { _id: schoolId }, {
        $set: {
            KDM_Meeting_Done_Date: Meeting_done_date,
            demo: demoB,
            Demo_schedule_date,
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

export const product_presentation = async ({
    user: {
        userId
    },
    body: {
        participated_members,
        schoolId
    }
}) => {
    const memberNames = participated_members.map(member => member.memberName);
    const updateSchool = await School.findByIdAndUpdate(
        { _id: schoolId }, {
        $set: {
            participitated_members: memberNames,
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
        students_count,
        schoolId
    }
}) => {
    console.log(students_count, 'students count');
    const updateSchool = await School.findByIdAndUpdate(
        { _id: schoolId }, {
        $set: {
            students_count,
            status: 'hot-lead',
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
        PO_Signed_By,
        Rate,
        parent_orientation_date,
    },
    file
}) => {
    console.log(schoolId, PO_Signed_By,
        Rate,
        parent_orientation_date,
        file);

    if(file){
        try {
            const url = await uploadToS3(file);
            console.log(url,' urlllllllleeeee');
            if(url){
                const updateSchool = await School.findByIdAndUpdate(
                    { _id: schoolId }, {
                    $set: {
                        PO_signedBy: PO_Signed_By,
                        Parent_Orientation_Date: parent_orientation_date,
                        Rate,
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
        schoolId
    }
}) => {
    const updateSchool = await School.findByIdAndUpdate(
        { _id: schoolId }, {
        $set: {
            Parent_Orientation_Done_Date: PO_done_date,
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
        Contract_signed_date
    }
}) => {
    const updateSchool = await School.findByIdAndUpdate(
        { _id: schoolId }, {
        $set: {
            Contract_signed_date,
            status: 'contract-signed'
        }
    },
        { new: true }
    )

    const details = await School.findById(schoolId)
    const user = await User.findById(userId)
    const sendingMail = await sendMail('contract-signed', contractSignedEmailTemplate(details.name, user.first_name))

    if (updateSchool && sendingMail.isSend) {
        return true
    } else throw {
        status: 404,
        message: 'Error occured while saving data'
    }
}

export const lostSchool = async ({
    user: {
        userId
    },
    body: {
        schoolId,
        remarks
    }
}) => {
    const updateSchool = await School.findByIdAndUpdate(
        { _id: schoolId },
        {
            $set: {
                lost: true,
                remarks,
                lead: false,
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
