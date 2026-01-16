import asyncHandler from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/appError.js";
import { createCourseService,getCourseByIdService, getMyCoursesService,publishCourseService, getAllCoursesService } from "./course.service.js";

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


export const getCourseById = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const trainerId = req.user.id;

  const course = await getCourseByIdService(courseId, trainerId);

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

export const getMyCourses = asyncHandler(async (req, res) => {
  const trainerId = req.user.id;

  const courses = await getMyCoursesService(trainerId);

  if (!courses || courses.length === 0) {
    throw new AppError("No courses found", 404);
  }

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

export const getAllCourses = asyncHandler(async (req, res) => {
  // Optional query params: category, level, language, search
  const { category, level, language, search } = req.query;

  const filter = { status: "published" }; // Only published courses

  if (category) filter.category = category;
  if (level) filter.level = level;
  if (language) filter.language = language;
  if (search) filter.title = { $regex: search, $options: "i" };

  const courses = await getAllCoursesService(filter);

  if (!courses || courses.length === 0) {
    throw new AppError("No courses found", 404);
  }

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

export const publishCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const trainerId = req.user.id;

  const course = await publishCourseService(courseId, trainerId);

  if (!course) {
    throw new AppError("Course not found or you don't have permission", 404);
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
