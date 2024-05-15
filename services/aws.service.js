import AWS from 'aws-sdk'
import dotenv from "dotenv"
dotenv.config()
// AWS.config.update({
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     region: process.envAWS_REGION
//   });
console.log(process.env.AWS_SECRET_ACCESS_KEY,process.env.AWS_ACCESS_KEY, 'keyssss')
const S3 = new AWS.S3({
  signatureVersion:'v4',
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY
});

export const getSignedUrl = async () => {
    const Bucket = process.env.AWS_S3_ASSETS_BUCKET;
    const Key = process.env.FILE_NAME;
    const signedUrl = await S3.getSignedUrlPromise("putObject", {
      Bucket,
      Key,
      Expires: 60,
    });
    console.log("signedUrl", Bucket, Key, signedUrl);
    return signedUrl;
};