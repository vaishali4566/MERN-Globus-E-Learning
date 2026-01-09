import asyncHandler from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/appError.js";
import { createQuestionService } from "./question.service.js";

export const createQuestion = asyncHandler(async (req, res) => {
  const { quizId, text, type, options, marks } = req.body;

  if (!quizId) throw new AppError("Quiz ID is required", 400);
  if (!text?.trim()) throw new AppError("Question text is required", 400);
  if (!type) throw new AppError("Question type is required", 400);
  if (!marks || marks <= 0) throw new AppError("Marks must be > 0", 400);

  // MCQ / multi_select should have options
  if ((type === "mcq" || type === "multi_select") && (!options || options.length < 2)) {
    throw new AppError("At least 2 options required for MCQ / Multi-select", 400);
  }

  // true_false options optional
  const question = await createQuestionService({
    quiz: quizId,
    text: text.trim(),
    type,
    options,
    marks,
    createdBy: req.user.id, // trainer
  });

  res.status(201).json({
    success: true,
    message: "Question created successfully",
    data: {
      id: question._id,
      text: question.text,
      type: question.type,
      order: question.order,
    },
  });
});
