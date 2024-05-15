const recipients = {
    'prospect' :['muhammedmamz18@gmail.com','hafizahmed0303@gmail.com'],
    'appointment' :['suraj@edize.in'],
    'kdm':['suraj@edize.in'],
    'product-presentation':['suraj@edize.in'],
    'hot-lead':['suraj@edize.in','sarath@edize.in'],
    'proposal-signed':['suraj@edize.in','sarath@edize.in','nisam@edize.in'],
    'parent-orientation':['suraj@edize.in','sarath@edize.in','nisam@edize.in'],
    'contract-signed':['suraj@edize.in','sarath@edize.in','nisam@edize.in'],
    'lost':['suraj@edize.in','sarath@edize.in']
}
 import dotenv from "dotenv";
import mailTransporter from "../config/nodemailer.config.js";

 dotenv.config()

export const sendMail = async(status,html)=>{
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
        mailTransporter.sendMail(data,(err)=>{
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