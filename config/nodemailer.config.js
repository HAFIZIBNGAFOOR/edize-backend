import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()


const mailTransporter = nodemailer.createTransport(
    {
        service:"gmail",
        auth:{
            user:process.env.MAIL_USERNAME,
            pass:process.env.MAIL_PASSWORD
        }
    }
)

export default mailTransporter