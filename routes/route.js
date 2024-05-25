import express from 'express'
import { schoolRouter } from './school.route.js';
import { userRouter } from './user.route.js';
import auth from '../auth/auth.js';
const router = express.Router();

router.use('/school',auth(),schoolRouter)
router.use('/',userRouter)
export default router