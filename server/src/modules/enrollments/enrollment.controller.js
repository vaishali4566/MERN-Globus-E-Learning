import asyncHandler from "../../utils/asyncHandler.js";
import {
  enrollCourseService,
  getMyEnrollmentsService,
  checkEnrollmentService,
} from "./enrollment.service.js";

/**
 * POST /api/enrollments/:courseId
 * Enroll user (fake payment / direct)
 */
export const enrollCourse = asyncHandler(async (req, res) => {
  console.log("PARAMS 👉", req.params);
  console.log("COURSE ID 👉", req.params.courseId);
  const studentId = req.user.id;
  const { courseId } = req.params;

  const enrollment = await enrollCourseService({
    studentId,
    courseId,
  });

  res.status(201).json({
    success: true,
    message: "Successfully enrolled in course",
    data: enrollment,
  });
});

/**
 * GET /api/enrollments/my
 */
export const getMyEnrollments = asyncHandler(async (req, res) => {
  const studentId = req.user.id;

  const enrollments = await getMyEnrollmentsService(studentId);

  res.status(200).json({
    success: true,
    count: enrollments.length,
    data: enrollments,
  });
});

/**
 * GET /api/enrollments/check/:courseId
 */
export const checkEnrollment = asyncHandler(async (req, res) => {
  const studentId = req.user.id;
  const { courseId } = req.params;

  const enrolled = await checkEnrollmentService(studentId, courseId);

  res.status(200).json({
    success: true,
    isEnrolled: !!enrolled,
  });
});
