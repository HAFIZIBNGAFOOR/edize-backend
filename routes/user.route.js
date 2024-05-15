import express from 'express'
import controller from '../controllers/common.controller.js';
import { doLogin, doSignup, getProfile, putProfile, toVerifyUser, verifyUser } from '../services/user.services.js';
import auth from '../auth/auth.js';
import { adminDashboard, dashboardData } from '../services/dashboard.service.js';

const router = express.Router();

router.post('/signup',controller(doSignup))
router.post('/login',controller(doLogin))

router.get('/verify-user',controller(toVerifyUser))
router.post('/verify-user',controller(verifyUser))

router.get('/profile',auth(),controller(getProfile))
router.put('/profile',auth(),controller(putProfile))

router.get('/dashboard',auth(),controller(dashboardData));
router.get('/admin-dashboard',auth(),controller(adminDashboard))

export const userRouter = router