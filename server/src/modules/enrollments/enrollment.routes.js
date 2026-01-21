import express from "express";
import {
  enrollCourse,
  getMyEnrollments,
  checkEnrollment,
} from "./enrollment.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowedRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post("/:courseId", protect, allowedRoles("student"), enrollCourse);

router.get("/my", protect, allowedRoles("student"), getMyEnrollments);

router.get(
  "/check/:courseId",
  protect,
  allowedRoles("student"),
  checkEnrollment,
);

export default router;
