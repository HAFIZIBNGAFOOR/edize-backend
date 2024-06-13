import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { google } from 'googleapis';
dotenv.config()


const OAuth2 = google.auth.OAuth2;


const createTransporter = async()=>{
    try {
        const oauth2Client = new OAuth2(
                process.env.GOOGLE_OAUTH_CLIENT_ID,
                process.env.GOOGLE_OAUTH_CLIENT_SECRET,
                "https://developers.google.com/oauthplayground"
            );
        oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
        });
        const accessToken = await  oauth2Client.getAccessToken();
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: process.env.MAIL_USERNAME,
              accessToken,
              clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
              clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
              refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
            },
          });
          return transporter;
    } catch (error) {
        console.log(error);
    }
}

export default createTransporter

