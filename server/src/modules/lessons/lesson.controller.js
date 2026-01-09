import asyncHandler from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/appError.js";
import { createLessonService } from "./lesson.service.js";

export const createLesson = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    courseId,
    sectionId,
    type,
    video,
    content,
    liveClass,
    isPreview,
  } = req.body;

  if (!title?.trim()) {
    throw new AppError("Lesson title is required", 400);
  }

  if (!courseId || !sectionId) {
    throw new AppError("Course and section are required", 400);
  }

  if (!type) {
    throw new AppError("Lesson type is required", 400);
  }

  const lesson = await createLessonService({
    title: title.trim(),
    description,
    course: courseId,
    section: sectionId,
    type,
    video,
    content,
    liveClass,
    isPreview: Boolean(isPreview),
    createdBy: req.user.id, // trainer from token
  });

  res.status(201).json({
    success: true,
    message: "Lesson created successfully",
    data: {
      id: lesson._id,
      title: lesson.title,
      type: lesson.type,
      order: lesson.order,
      isPublished: lesson.isPublished,
    },
  });
});
