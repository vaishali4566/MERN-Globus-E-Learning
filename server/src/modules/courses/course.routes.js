import express from "express";
import { createCourse, getCourseById , getMyCourses} from "./course.controller.js";
import {protect} from "../../middlewares/auth.middleware.js"
import { allowedRoles } from "../../middlewares/role.middleware.js";
const router = express.Router();

router.post("/", protect, allowedRoles("trainer"), createCourse);
router.get("/my-courses", protect, allowedRoles("trainer"), getMyCourses);
router.get("/:courseId", protect, allowedRoles("trainer"), getCourseById);

export default router;
