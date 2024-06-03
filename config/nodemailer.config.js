import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { google } from 'googleapis';
dotenv.config()


const oAuthClient = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    process.env.GOOGLE_OAUTH_REDIRECT_URI 
);

oAuthClient.setCredentials({
    refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN
});

async function createTransporter() {
    const accessToken = await oAuthClient.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
            accessToken: accessToken.token,
        },
    });

    return transporter;
}

export default createTransporter;
export const oAuth2Client =  oAuthClient
