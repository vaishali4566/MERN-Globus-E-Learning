import Quiz from "./quiz.model.js";
import Course from "../courses/course.model.js";
import Section from "../sections/section.model.js";
import { AppError } from "../../utils/appError.js";

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
