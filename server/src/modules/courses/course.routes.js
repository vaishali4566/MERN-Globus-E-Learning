import express from "express";
import { createCourse } from "./course.controller.js";
import {protect} from "../../middlewares/auth.middleware.js"
import { allowedRoles } from "../../middlewares/role.middleware.js";
import { getCourseById } from "./course.controller.js";

const router = express.Router();

router.post("/", protect, allowedRoles("trainer"), createCourse);
router.get("/:courseId", protect, allowedRoles("trainer"), getCourseById)

export default router;
