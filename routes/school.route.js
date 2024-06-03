import express from 'express'
import controller from '../controllers/common.controller.js';
import { addSchool, appointment, contractSinged, getAllSchools, getClasses, getSchools, hotLead, kdmMeeting, lostSchool, parentOrientation, product_demo, product_presentation, proposalSinged, singleSchool } from '../services/school.service.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/',controller(addSchool));
router.get('/',controller(getSchools))

router.get('/allSchools',controller(getAllSchools))

router.get('/single-school',controller(singleSchool))

router.get('/classes',controller(getClasses))

router.post('/appointment',controller(appointment))

router.post('/kdm',controller(kdmMeeting))

router.post('/product-demo',controller(product_demo))

router.post('/product-presentation',controller(product_presentation))

router.post('/hot-lead',controller(hotLead))

router.post('/proposal-signed',upload.single('file'),controller(proposalSinged))

router.post('/parent-orientation',controller(parentOrientation))

router.post('/contract-signed',upload.single('file'),controller(contractSinged))

router.post('/lost',controller(lostSchool))



export const schoolRouter = router