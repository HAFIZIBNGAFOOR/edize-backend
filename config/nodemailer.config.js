import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()


const mailTransporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.MAIL_USERNAME,
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
        }
    }
)

export default mailTransporter