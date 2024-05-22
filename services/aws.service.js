
import  {s3} from "../config/aws.config.js"
import dotenv from "dotenv"
dotenv.config()

const region = process.env.AWS_REGION
const accessKeyId =  process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
console.log(region,'regions', accessKeyId,'accessKeyId',secretAccessKey,'sercrt access key');



export const getSignedUrl = async ({
    query:{
      fileName
    }
}) => {
    const Bucket = process.env.AWS_S3_ASSETS_BUCKET;
    const Key = fileName
    const params=({
      Bucket,
      Key,
      Expires:60
    })
    const signedUrl = await s3.getSignedUrlPromise("putObject",params);
    console.log("signedUrl", signedUrl,Bucket);
    return signedUrl;
};