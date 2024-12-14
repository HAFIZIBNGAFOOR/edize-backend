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
    facilities_available:{
        type:[String]
    },
    support_required:{
        type:String
    },
    demo_attended_by:{
        type:[String]
    },
    demo_done_date:{
        type:String
    },
    further_requirement:{
        type:String
    },
    product:{
        type:String
    },
    proposal_signed:{
        type:Boolean
    },
    PO_scan_copy:{
        type:String
    },
    Price_for_class:{
        type:String
    },
    total_deal:{
        type:{
            year1:String,
            year2:String,
            year3:String
        }
    },
    Parent_Orientation_Date:{
        type:String
    },
    Parent_Orientation_Done_Date:{
        type:String
    },
    Parent_Orientation_Done_By:{
        type:String
    },
    Parents_attended:{
        type:String
    },
    Contract_signed_date:{
        type:String
    },
    Contract_signed_copy:{
        type:String
    },
    Boarding_student_count:{
        type:String
    },
    Boarding_meeting_date:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    lost:{
        type:Boolean,
        default:false
    },
    lead:{
        default:false,
        type:Boolean
    },
    remarks:{
        type:String
    },
    next_year_prospect:{
        type:String
    },
    
    deletedAt:{
        type: String,
        default:null
    },
    schoolUpdate: {
        type: Boolean,
        default: false
    },
    appointmentUpdate: {
        type: Boolean,
        default: false
    },
    kdmMeetingUpdate: {
        type: Boolean,
        default: false
    },
    product_demoUpdate: {
        type: Boolean,
        default: false
    },
    schoolUpdate: {
        type: Boolean,
        default: false
    },
    product_presentationUpdate: {
        type: Boolean,
        default: false
    },
    hotLeadUpdate: {
        type: Boolean,
        default: false
    },
    proposalSingedUpdate: {
        type: Boolean,
        default: false
    },
    parentOrientationUpdate: {
        type: Boolean,
        default: false
    },
    contractSingedUpdate: {
        type: Boolean,
        default: false
    },
    lostSchoolUpdate: {
        type: Boolean,
        default: false
    },

},
{timestamps:true,timeseries:true} )

SchoolSchema.pre('find', function () {
  this.where({ deletedAt: null });
});


SchoolSchema.plugin(AutoIncrementFactory, { inc_field: 'SchoolId', start_seq: 101 });

export const School = mongoose.model('School',SchoolSchema)