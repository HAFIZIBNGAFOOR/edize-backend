import aws from "aws-sdk";
import dotenv from "dotenv"

dotenv.config()

export const uploadToS3 = async(file)=>{
  const s3Client = new aws.S3({
    region:process.env.AWS_REGION,
    credentials:{
      accessKeyId:process.env.AWS_ACCESS_KEY,
      secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
  })
  const filename = Date.now().toString()
  const params = {
    Bucket:process.env.AWS_S3_ASSETS_BUCKET,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  }
  try {
    const url = `${process.env.AWS_CLIENT_URL}${filename}`
    const response = await s3Client.upload(params).promise() 
    return url

  } catch (error) {
    console.log(error,' error inside aws ');
    throw {
      message:'cannot upload file'
    }
  }
}