import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

console.log(process.env.MAIL_USERNAME,'usererererere',process.env.GOOGLE_OAUTH_REFRESH_TOKEN,process.env.GOOGLE_OAUTH_CLIENT_SECRET,process.env.GOOGLE_OAUTH_CLIENT_ID);
const mailTransporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            type:"OAuth2",
            user: process.env.MAIL_USERNAME,
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
        }
    }
)

export default mailTransporter