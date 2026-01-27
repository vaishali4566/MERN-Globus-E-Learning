import asyncHandler from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/appError.js";
import {
  createCourseService,
  getCourseByIdService,
  getMyCoursesService,
  publishCourseService,
  getAllCoursesService,
} from "./course.service.js";
import Enrollment from "../enrollments/enrollment.model.js";

// ================= CREATE COURSE =================
export const createCourse = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    thumbnail,
    price = 0,
    level = "beginner",
    language = "English",
  } = req.body;

  if (!title?.trim() || !description?.trim()) {
    throw new AppError("Title and description are required", 400);
  }

  if (price < 0) {
    throw new AppError("Price cannot be negative", 400);
  }

  const course = await createCourseService({
    title: title.trim(),
    description: description.trim(),
    thumbnail,
    price,
    level,
    language,
    trainer: req.user.id,
    status: "draft",
  });

  res.status(201).json({
    success: true,
    message: "Course draft created",
    data: {
      id: course._id,
      title: course.title,
      slug: course.slug,
      status: course.status,
    },
  });
});

// ================= GET COURSE BY ID (TRAINER) =================
export const getCourseById = asyncHandler(async (req, res) => {
  console.log("USER 👉", req.user);
  console.log("COURSE ID 👉", req.params.courseId);
  const { courseId } = req.params;

  const course = await getCourseByIdService(courseId, req.user);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// ================= GET MY COURSES =================
export const getMyCourses = asyncHandler(async (req, res) => {
  const courses = await getMyCoursesService(req.user.id);

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses, // 🔥 empty array allowed
  });
});

// ================= GET ALL PUBLISHED COURSES =================
// ================= GET ALL PUBLISHED COURSES =================
export const getAllCourses = asyncHandler(async (req, res) => {
  const userId = req.user?.id?.toString(); // ✔
  const role = req.user?.role;

  console.log("🟢 getAllCourses called");
  console.log("User ID:", userId);
  console.log("Role:", role);

  const { category, level, language, search } = req.query;

  const filter = { status: "published" };
  if (category) filter.category = category;
  if (level) filter.level = level;
  if (language) filter.language = language;
  if (search) filter.title = { $regex: search, $options: "i" };

  const courses = await getAllCoursesService(filter);
  console.log("Total courses fetched:", courses.length);
  console.log("Course IDs:", courses.map(c => c._id.toString()));

  let enrolledCourseIds = [];

  if (userId && role === "student") {
    const enrollments = await Enrollment.find({
      student: userId,
      status: "active",
    })
      .select("course")
      .lean();

    console.log("Enrollments found:", enrollments.length);
    enrollments.forEach(e => console.log("Enrolled course ID:", e.course.toString()));

    enrolledCourseIds = enrollments.map((e) => e.course.toString());
  }

  const formattedCourses = courses.map((course) => {
    const courseId = course._id.toString();

    const isTrainerView =
      role === "trainer" &&
      course.trainer?._id?.toString() === userId;

    const isEnrolled =
      role === "student" &&
      enrolledCourseIds.includes(courseId);

    console.log(`Course ${courseId} → isEnrolled:`, isEnrolled);

    return {
      ...course.toObject(),
      isTrainerView,
      isEnrolled,
      isPurchased: isEnrolled,
      canEdit: isTrainerView,
    };
  });

  res.status(200).json({
    success: true,
    count: formattedCourses.length,
    data: formattedCourses,
  });
});



// ================= PUBLISH COURSE =================
export const publishCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await publishCourseService(courseId, req.user.id);

  if (!course) {
    throw new AppError("Course not found or permission denied", 404);
  }

  res.status(200).json({
    success: true,
    message: "Course published successfully",
    data: {
      id: course._id,
      title: course.title,
      status: course.status,
    },
  });
});
