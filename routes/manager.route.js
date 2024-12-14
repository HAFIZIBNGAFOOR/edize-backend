import controller from '../controllers/common.controller.js';
import { addManager, getManagers} from '../services/manager.service.js'

import express from "express"
const router = express.Router();

router.get('/', controller(getManagers))
router.post('/',controller(addManager))

export const managerRouter = router