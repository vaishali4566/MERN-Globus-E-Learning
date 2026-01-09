import asyncHandler from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/appError.js";
import { createSectionService } from "./section.service.js";

export const createSection = asyncHandler(async (req, res) => {
  const { title, description, courseId } = req.body;

  if (!title?.trim()) {
    throw new AppError("Section title is required", 400);
  }

  if (!courseId) {
    throw new AppError("Course id is required", 400);
  }

  const section = await createSectionService({
    title: title.trim(),
    description,
    course: courseId,
    createdBy: req.user.id, // trainer from token
  });

  res.status(201).json({
    success: true,
    message: "Section created successfully",
    data: {
      id: section._id,
      title: section.title,
      order: section.order,
      isPublished: section.isPublished,
    },
  });
});
