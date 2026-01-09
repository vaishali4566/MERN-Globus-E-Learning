import Course from "./course.model.js";
import { AppError } from "../../utils/appError.js";

export const createCourseService = async (data) => {
  const exists = await Course.findOne({
    title: data.title,
    trainer: data.trainer,
  });

  if (exists) {
    throw new AppError("Course with this title already exists", 409);
  }

  return await Course.create(data);
};
