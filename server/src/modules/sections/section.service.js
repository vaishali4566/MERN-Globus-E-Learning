import Section from "./section.model.js";
import Course from "../courses/course.model.js";
import { AppError } from "../../utils/appError.js";

export const createSectionService = async (data) => {
  // 1️⃣ Check course exists
  const course = await Course.findById(data.course);
  if (!course) throw new AppError("Course not found", 404);

  // 2️⃣ Ensure trainer owns the course
  if (course.trainer.toString() !== data.createdBy.toString()) {
    throw new AppError("You are not allowed to add section to this course", 403);
  }

  // 3️⃣ Auto-calculate order
  const lastSection = await Section.findOne({ course: data.course })
    .sort({ order: -1 })
    .select("order");

  const nextOrder = lastSection ? lastSection.order + 1 : 1;

  // 4️⃣ Create section (draft)
  const section = await Section.create({
    ...data,
    order: nextOrder,
    isPublished: false,
  });

  // 5️⃣ Push section into course.sections array
  course.sections.push(section._id);
  await course.save();

  return section;
};