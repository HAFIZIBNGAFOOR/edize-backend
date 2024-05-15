import express from "express";
import controller from "../controllers/common.controller.js";
import { getSignedUrl } from "../services/aws.service.js";

const awsRouter = express.Router()

awsRouter.get('/presigned-url',controller(getSignedUrl));

export default awsRouter