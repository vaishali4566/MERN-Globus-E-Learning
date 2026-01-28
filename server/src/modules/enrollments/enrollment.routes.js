import express from "express";
import {
  getMyEnrollments,
  checkEnrollment,
  getMyEnrolledCourses
} from "./enrollment.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowedRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.get("/my", protect, allowedRoles("student"), getMyEnrollments);
router.get("/my-courses", protect, getMyEnrolledCourses);

router.get(
  "/check/:courseId",
  protect,
  allowedRoles("student"),
  checkEnrollment,
);

export default router;
