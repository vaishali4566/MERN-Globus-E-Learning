import asyncHandler from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/appError.js";
import { createQuizService } from "./quiz.service.js";

export const createQuiz = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    courseId,
    sectionId,
    timeLimit,
    totalMarks,
    passMarks,
    allowedAttempts,
    shuffleQuestions,
  } = req.body;

  // 1️⃣ Basic validations
  if (!title?.trim()) throw new AppError("Quiz title is required", 400);
  if (!courseId || !sectionId) throw new AppError("Course and section are required", 400);
  if (!totalMarks || totalMarks <= 0) throw new AppError("Total marks must be > 0", 400);
  if (!passMarks && passMarks !== 0) throw new AppError("Pass marks required", 400);
  if (passMarks > totalMarks) throw new AppError("Pass marks cannot exceed total marks", 400);

  // 2️⃣ Call service
  const quiz = await createQuizService({
    title: title.trim(),
    description,
    course: courseId,
    section: sectionId,
    timeLimit,
    totalMarks,
    passMarks,
    allowedAttempts,
    shuffleQuestions,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Quiz created successfully",
    data: {
      id: quiz._id,
      title: quiz.title,
      order: quiz.order,
      isPublished: quiz.isPublished,
    },
  });
});
