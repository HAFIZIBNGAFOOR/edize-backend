import mongoose from "mongoose";

const managerModel = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        district:{
            required:true,
            type:String
        },
        phone:{
            type:String
        },
        isBlocked:{
            default:false,
            type:Boolean
        },
        isVerified:{
            default:false,
            type:Boolean
        },
        role:{
            type:String,
        }
    },
    {timestamps:true,timeseries:true} 
);

export const Manager = mongoose.model('Manager',managerModel)