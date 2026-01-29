import Quiz from "./quiz.model.js";
import Course from "../courses/course.model.js";
import Section from "../sections/section.model.js";
import { AppError } from "../../utils/appError.js";
import Question from "./question.model.js";
import mongoose from "mongoose";

export const createQuizService = async (data) => {
  // 1️⃣ Validate course exists
  const course = await Course.findById(data.course);
  if (!course) throw new AppError("Course not found", 404);

  // 2️⃣ Only trainer can create quiz
  if (course.trainer.toString() !== data.createdBy.toString()) {
    throw new AppError("Not authorized to add quiz to this course", 403);
  }

  // 3️⃣ Validate section exists
  const section = await Section.findById(data.section);
  if (!section) throw new AppError("Section not found", 404);

  // 4️⃣ Auto order (next available order in section)
  const lastQuiz = await Quiz.findOne({ section: data.section })
    .sort({ order: -1 })
    .select("order");

  const nextOrder = lastQuiz ? lastQuiz.order + 1 : 1;

  // 5️⃣ Create quiz
  const quiz = await Quiz.create({
    ...data,
    order: nextOrder,
    isPublished: false, // default draft
  });

  return quiz;
};

export const getQuizForStudentService = async (quizId) => {
  // 🛑 HARD GUARD
  if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
    throw new AppError("Invalid or missing quiz ID", 400);
  }

  const quiz = await Quiz.findOne({
    _id: quizId,
    isPublished: true,
  }).select(
    "title description timeLimit totalMarks passMarks allowedAttempts shuffleQuestions"
  );

  if (!quiz) {
    throw new AppError("Quiz not found or not published", 404);
  }

  const questions = await Question.find({ quiz: quizId })
    .sort({ order: 1 })
    .select("text options marks order")
    .lean();

  // 🔒 REMOVE correct answers
  const safeQuestions = questions.map((q) => ({
    _id: q._id,
    text: q.text,
    marks: q.marks,
    order: q.order,
    options: q.options.map((o) => ({
      _id: o._id,
      text: o.text,
    })),
  }));

  return {
    quiz,
    questions: safeQuestions,
  };
};

export const getQuizWithAnswersService = async (quizId) => {
  // 🛑 HARD GUARD
  if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
    throw new AppError("Invalid or missing quiz ID", 400);
  }

  const quiz = await Quiz.findOne({
    _id: quizId,
    isPublished: true,
  }).select(
    "title description timeLimit totalMarks passMarks allowedAttempts shuffleQuestions"
  );

  if (!quiz) {
    throw new AppError("Quiz not found or not published", 404);
  }

  const questions = await Question.find({ quiz: quizId })
    .sort({ order: 1 })
    .select("text options marks order")
    .lean();

  // ✅ INCLUDE correct answers (only for showing results)
  const questionsWithAnswers = questions.map((q) => ({
    _id: q._id,
    text: q.text,
    marks: q.marks,
    order: q.order,
    options: q.options.map((o) => ({
      text: o.text,
      isCorrect: o.isCorrect,
    })),
  }));

  return {
    quiz,
    questions: questionsWithAnswers,
  };
};
