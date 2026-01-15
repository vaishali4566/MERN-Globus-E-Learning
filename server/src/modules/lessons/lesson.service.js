import mongoose from "mongoose";
import Course from "../courses/course.model.js";
import Section from "../sections/section.model.js";
import { AppError } from "../../utils/appError.js";
import Lesson from "../lessons/lesson.model.js";

export const createLessonService = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { course, section, createdBy } = data;

    // 1️⃣ Validate course exists
    const courseExists = await Course.findById(course).session(session);
    if (!courseExists) throw new AppError("Course not found", 404);

    // 2️⃣ Validate section exists + not deleted
    const sectionExists = await Section.findOne({
      _id: section,
      isDeleted: false,
    }).session(session);

    if (!sectionExists) throw new AppError("Section not found", 404);

    // 3️⃣ Section belongs to course
    if (sectionExists.course.toString() !== course.toString()) {
      throw new AppError("Section does not belong to this course", 400);
    }

    // 4️⃣ Trainer ownership check
    if (courseExists.trainer.toString() !== createdBy.toString()) {
      throw new AppError("Unauthorized lesson creation", 403);
    }

    // 5️⃣ Calculate next order
    const lastLesson = await Lesson.findOne({ section })
      .sort({ order: -1 })
      .select("order")
      .session(session);

    const nextOrder = lastLesson ? lastLesson.order + 1 : 1;

    // 6️⃣ Create lesson
    const [lesson] = await Lesson.create(
      [
        {
          ...data,
          order: nextOrder,
          isPublished: false,
        },
      ],
      { session }
    );

    // 7️⃣ VERY IMPORTANT: Add lesson to section.contents array
    await Section.findByIdAndUpdate(
      section,
      { 
        $push: { contents: lesson._id },    // ← This was missing!
        $inc: { totalLessons: 1 }
      },
      { session, new: true }
    );

    await session.commitTransaction();
    session.endSession();

    return lesson;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};