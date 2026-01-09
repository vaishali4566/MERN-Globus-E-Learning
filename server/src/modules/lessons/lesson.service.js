import Lesson from "./lesson.model.js";
import Section from "../sections/section.model.js";
import { AppError } from "../../utils/appError.js";

export const createLessonService = async (data) => {
  // 1️⃣ Validate section exists
  const sectionExists = await Section.findById(data.section);
  if (!sectionExists) {
    throw new AppError("Section not found", 404);
  }

  // 2️⃣ Auto-calculate order
  const lastLesson = await Lesson.findOne({ section: data.section })
    .sort({ order: -1 })
    .select("order");

  const nextOrder = lastLesson ? lastLesson.order + 1 : 1;

  // 3️⃣ Create lesson (draft)
  const lesson = await Lesson.create({
    ...data,
    order: nextOrder,
    isPublished: false,
  });

  return lesson;
};
