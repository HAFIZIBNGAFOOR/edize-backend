import controller from '../controllers/common.controller.js';
import { getManagers} from '../services/manager.service.js'

import express from "express"
const router = express.Router();

router.get('/',controller(getManagers))

export const managerRouter = router