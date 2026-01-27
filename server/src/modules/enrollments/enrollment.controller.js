import asyncHandler from "../../utils/asyncHandler.js";
import {
  enrollCourseService,
  getMyEnrollmentsService,
  checkEnrollmentService,
} from "./enrollment.service.js";

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
