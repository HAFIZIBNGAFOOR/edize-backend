const recipients = {
    'prospect' :['suraj@edize.in'],
    'appointment' :['suraj@edize.in'],
    'kdm':['suraj@edize.in'],
    'product-demo':['suraj@edize.in','pratheekhas@edize.in'],
    'product-presentation':['suraj@edize.in','pratheekhas@edize.in'],
    'hot-lead':['suraj@edize.in','sarath@edize.in'],
    'proposal-signed':['suraj@edize.in','sarath@edize.in','pratheekhas@edize.in','amrutha@edize.in'],
    'parent-orientation':['suraj@edize.in','sarath@edize.in','pratheekhas@edize.in'],
    'contract-signed':['suraj@edize.in','sarath@edize.in','pratheekhas@edize.in','amrutha@edize.in'],
    'lost':['suraj@edize.in','sarath@edize.in']
}
import dotenv from "dotenv";
import mailTransporter, { oAuth2Client } from "../config/nodemailer.config.js";
import createTransporter from "../config/nodemailer.config.js";
dotenv.config()


export const sendMail = async(status,html)=>{
    const transporter = await createTransporter();
    return new Promise((resolve,reject)=>{
        console.log(status,' this is resipients ', recipients[status]);
        if(!(status && html)){
           return reject ({
            isSend:false,
            error:`status ${status} and html ${html} required`
           })
        }
        const to = recipients[status].join(',')
        const data = {
            from:"edizeedtech@gmail.com",
            to:to,
            subject:status,
            html
        }
        transporter.sendMail(data,(err)=>{
            if(err){
                console.log(err,' mail sending error');
                reject({
                    isSend:false,
                    err
                })
            }else{
                resolve({
                    isSend:true,
                    data
                })
            }
        })
    })
    
}

export const auth2CallBack = async({
    query:{
        code
    }
})=>{
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.send('Authentication successful! You can close this window.');
}