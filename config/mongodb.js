import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.Mongo_URI)
        console.log('Mongo DB connection successfull ');
    } catch (error) {
        console.log('error from mongo db connection ',error);
    }
}

export default connectDB