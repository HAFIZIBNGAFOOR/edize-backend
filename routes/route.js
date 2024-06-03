import express from 'express'
import { schoolRouter } from './school.route.js';
import { userRouter } from './user.route.js';
import auth from '../auth/auth.js';
import { auth2CallBack } from '../services/nodemailer.service.js';
const router = express.Router();

router.use('/school',auth(),schoolRouter)
router.use('/',userRouter)
router.get('/oauth2callback',auth2CallBack)
export default router