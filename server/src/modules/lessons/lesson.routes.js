import express from "express";
import {createLesson} from "./lesson.controller.js"
import {protect} from "../../middlewares/auth.middleware.js"
import { allowedRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, allowedRoles("trainer"), createLesson);

export default router;
