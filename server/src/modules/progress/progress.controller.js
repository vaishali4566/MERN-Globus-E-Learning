import asyncHandler from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/appError.js";
import {
  getCourseProgressService,
  getAllCoursesProgressService,
  updateQuizProgressService,
  markLessonCompleteService,
  markAssignmentCompleteService,
} from "./progress.service.js";

/**
 * GET /api/progress/:courseId
 * Get progress for a specific course
 */
export const getCourseProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user.id;

  const progress = await getCourseProgressService(studentId, courseId);

  if (!progress) {
    throw new AppError("Progress not found. Please enroll in the course first.", 404);
  }

  res.status(200).json({
    success: true,
    data: progress,
  });
});

/**
 * GET /api/progress
 * Get all courses progress for student
 */
export const getAllCoursesProgress = asyncHandler(async (req, res) => {
  const studentId = req.user.id;

  const progress = await getAllCoursesProgressService(studentId);

  res.status(200).json({
    success: true,
    count: progress.length,
    data: progress,
  });
});

/**
 * POST /api/progress/:courseId/lesson/:lessonId/complete
 * Mark lesson as completed
 */
export const markLessonComplete = asyncHandler(async (req, res) => {
  const { courseId, lessonId } = req.params;
  const { watchedDuration = 0 } = req.body;
  const studentId = req.user.id;

  const progress = await markLessonCompleteService(
    studentId,
    courseId,
    lessonId,
    watchedDuration
  );

  res.status(200).json({
    success: true,
    message: "Lesson marked as completed",
    data: progress,
  });
});

/**
 * POST /api/progress/:courseId/quiz/:quizId/result
 * Update quiz progress with result
 */
export const updateQuizProgress = asyncHandler(async (req, res) => {
  const { courseId, quizId } = req.params;
  const { score, totalMarks, passed } = req.body;
  const studentId = req.user.id;

  // Validation
  if (
    typeof score !== "number" ||
    typeof totalMarks !== "number" ||
    typeof passed !== "boolean"
  ) {
    throw new AppError("Invalid score, totalMarks, or passed parameter", 400);
  }

  if (score < 0 || totalMarks <= 0 || score > totalMarks) {
    throw new AppError("Invalid score values", 400);
  }

  const progress = await updateQuizProgressService(
    studentId,
    courseId,
    quizId,
    score,
    totalMarks,
    passed
  );

  res.status(200).json({
    success: true,
    message: "Quiz progress updated",
    data: progress,
  });
});

/**
 * POST /api/progress/:courseId/assignment/:assignmentId/complete
 * Mark assignment as completed
 */
export const markAssignmentComplete = asyncHandler(async (req, res) => {
  const { courseId, assignmentId } = req.params;
  const studentId = req.user.id;

  const progress = await markAssignmentCompleteService(
    studentId,
    courseId,
    assignmentId
  );

  res.status(200).json({
    success: true,
    message: "Assignment marked as completed",
    data: progress,
  });
});
