import Course from "./course.model.js";
import { AppError } from "../../utils/appError.js";
import mongoose from "mongoose";

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


export const getCourseByIdService = async (courseId, trainerId) => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return null;
  }

  try {
    const course = await Course.findOne({
      _id: courseId,
      trainer: trainerId,
    })
      .select("-__v")
      .populate({
        path: "sections",
        options: { sort: { order: 1 } },
        populate: {
          path: "contents",
          model: "Lesson", // ← MUST match EXACTLY the modelName in lesson.model.js
        },
      })
      .lean(); // optional: faster + avoids some issues

    return course;
  } catch (err) {
    console.error("getCourseByIdService ERROR:", err);
    throw err; // let asyncHandler catch it
  }
};