import Assignment from "./assignment.model.js";
import Section from "../sections/section.model.js";
import Course from "../courses/course.model.js";
import { AppError } from "../../utils/appError.js";

export const createAssignmentService = async (data) => {
  // 1️⃣ Validate course
  const course = await Course.findById(data.course);
  if (!course) {
    throw new AppError("Course not found", 404);
  }

  // 2️⃣ Ownership check
  if (course.trainer.toString() !== data.createdBy.toString()) {
    throw new AppError("Not authorized to add assignment", 403);
  }

  // 3️⃣ Validate section
  const section = await Section.findById(data.section);
  if (!section) {
    throw new AppError("Section not found", 404);
  }

  // 4️⃣ Auto order
  const lastAssignment = await Assignment.findOne({ section: data.section })
    .sort({ order: -1 })
    .select("order");

  const nextOrder = lastAssignment ? lastAssignment.order + 1 : 1;

  // 5️⃣ Create assignment
  const assignment = await Assignment.create({
    ...data,
    order: nextOrder,
    isPublished: false,
  });

  return assignment;
};
