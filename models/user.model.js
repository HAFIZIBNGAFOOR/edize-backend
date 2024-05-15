import mongoose from "mongoose";

const userModel = new mongoose.Schema(
    {
        first_name:{
            type:String,
            required:true
        },
        last_name:{
            type:String,
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
            required:true,
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
            required:true
        }
    },
    {timestamps:true,timeseries:true} 
);

export const User = mongoose.model('User',userModel)