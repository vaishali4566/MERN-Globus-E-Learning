import express from "express";
import { createCourse, getCourseById , getMyCourses, publishCourse, getAllCourses} from "./course.controller.js";
import {protect} from "../../middlewares/auth.middleware.js"
import { allowedRoles } from "../../middlewares/role.middleware.js";
const router = express.Router();

router.get("/all", getAllCourses);
router.post("/", protect, allowedRoles("trainer"), createCourse);
router.get("/my-courses", protect, allowedRoles("trainer"), getMyCourses);
router.get("/:courseId", protect, allowedRoles("trainer"), getCourseById);
router.patch("/:courseId/publish", protect, allowedRoles("trainer"), publishCourse);


export default router;
