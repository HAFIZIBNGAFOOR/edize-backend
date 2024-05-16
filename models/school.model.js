import mongoose from "mongoose"
import mongoose_Sequence from "mongoose-sequence"

const AutoIncrementFactory =  mongoose_Sequence(mongoose)
const SchoolSchema = new mongoose.Schema({
    status:{
        type:String,
        required:true
    },
    SchoolId: {
        type: Number,
        unique: true
    },
    name:{
        required:true,
        type:String
    },
    address:{
        type:String
    },
    district:{
        type:String
    },
    state:{
        type:String
    },
    UDSE_Number:{
        type:Number
    },
    phone:{
        type:Number
    },
    KDM_Name:{
        type:String
    },
    KDM_Designation:{
        type:String
    },
    KDM_Mobile_Number:{
        type:String
    },
    KDM_Meeting_time:{
        type:String
    },
    city_of_school:{
        type:String
    },
    KDM_Meeting_Done_Date:{
        type:String
    },
    demo:{
        type:Boolean
    },
    Demo_schedule_date:{
        type:String
    },
    product_presentation:{
        type:Boolean
    },
    participitated_members:{
        type:[String]
    },
    Hot_lead:{
        type:Boolean
    },
    students_count:{
        type:[
            {class:String,count:Number}
        ]
    },
    proposal_signed:{
        type:Boolean
    },
    PO_scan_copy:{
        type:String
    },
    PO_signedBy:{
        type:String
    },
    Rate:{
        type:String
    },
    Parent_Orientation_Date:{
        type:String
    },
    Parent_Orientation_Done_Date:{
        type:String
    },
    Contract_signed_date:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    lost:{
        type:Boolean,
        deafult:false
    },
    lead:{
        default:false,
        type:Boolean
    },
    remarks:{
        type:String
    }
},
{timestamps:true,timeseries:true} )


SchoolSchema.plugin(AutoIncrementFactory, { inc_field: 'SchoolId', start_seq: 101 });

export const School = mongoose.model('School',SchoolSchema)