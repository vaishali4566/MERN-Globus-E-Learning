import express from "express";
import {createQuiz} from "./quiz.controller.js"
import {protect} from "../../middlewares/auth.middleware.js"
import { allowedRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, allowedRoles("trainer"), createQuiz);

export default router;