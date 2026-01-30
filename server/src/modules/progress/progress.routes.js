import express from "express";
import {
  getCourseProgress,
  getAllCoursesProgress,
  markLessonComplete,
  updateQuizProgress,
  markAssignmentComplete,
} from "./progress.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowedRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

// Get all courses progress
router.get("/", protect, allowedRoles("student"), getAllCoursesProgress);

// Get progress for specific course
router.get("/:courseId", protect, allowedRoles("student"), getCourseProgress);

// Mark lesson as completed
router.post(
  "/:courseId/lesson/:lessonId/complete",
  protect,
  allowedRoles("student"),
  markLessonComplete
);

// Update quiz progress
router.post(
  "/:courseId/quiz/:quizId/result",
  protect,
  allowedRoles("student"),
  updateQuizProgress
);

// Mark assignment as completed
router.post(
  "/:courseId/assignment/:assignmentId/complete",
  protect,
  allowedRoles("student"),
  markAssignmentComplete
);

export default router;
