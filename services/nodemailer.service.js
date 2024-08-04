const recipients = {
  prospect: ['suraj@edize.in', 'hafizahmed0303@gmail.com'],
  appointment: ['suraj@edize.in', 'hafizahmed0303@gmail.com'],
  kdm: ['suraj@edize.in', 'hafizahmed0303@gmail.com'],
  'product-demo': [
    'suraj@edize.in',
    'pratheekhas@edize.in',
    'hafizahmed0303@gmail.com',
  ],
  'product-presentation': [   
    'suraj@edize.in',
    'pratheekhas@edize.in',
    'hafizahmed0303@gmail.com',
  ],
  'hot-lead': ['suraj@edize.in', 'sarath@edize.in', 'hafizahmed0303@gmail.com'],
  'proposal-signed': [
    'suraj@edize.in',
    'sarath@edize.in',
    'pratheekhas@edize.in',
    'amrutha@edize.in',
    'hafizahmed0303@gmail.com',
  ],
  'parent-orientation': [
    'suraj@edize.in',
    'sarath@edize.in',
    'pratheekhas@edize.in',
    'hafizahmed0303@gmail.com',
  ],
  'contract-signed': [
    'suraj@edize.in',
    'sarath@edize.in',
    'pratheekhas@edize.in',
    'amrutha@edize.in',
    'hafizahmed0303@gmail.com',
  ],
  lost: ['suraj@edize.in', 'sarath@edize.in', 'hafizahmed0303@gmail.com'],
};
import dotenv from 'dotenv';
import createTransporter from '../config/nodemailer.config.js';
import { sampleEmailTemplate } from '../mail_templates/lost_template.js';
dotenv.config();

export const sendMail = async (status, html) => {
  try {
    if (!(status && html)) {
      return reject({
        isSend: false,
        error: `status ${status} and html ${html} required`,
      });
    }
    const to = recipients[status].join(',');
    const data = {
      from: 'edizeedtech@gmail.com',
      to: to,
      subject: status,
      html,
    };
    const transporter = await createTransporter();
    const sendMail = await transporter.sendMail(data);
    return { isSend: true };
  } catch (error) {
    console.log(error, 'error in send mail');
    return { isSend: true };
  }
};
