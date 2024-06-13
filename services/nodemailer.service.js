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
import createTransporter from "../config/nodemailer.config.js";
dotenv.config()


export const sendMail = async(status,html)=>{
        try {
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
            const transporter = await createTransporter()
            const sendMail = await transporter.sendMail(data)
            return { isSend:true }
        } catch (error) {
            console.log(error,'error in send mail');
            return { isSend:false }
        }
    
}
