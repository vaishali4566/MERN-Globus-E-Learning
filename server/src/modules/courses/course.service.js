import Course from "./course.model.js";
import { AppError } from "../../utils/appError.js";
import mongoose from "mongoose";
import Lesson from "../lessons/lesson.model.js";
import Assignment from "../assignments/assignment.model.js";
import Quiz from "../quizzes/quiz.model.js";

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
  if (!mongoose.Types.ObjectId.isValid(courseId)) return null;

  const course = await Course.findOne({
    _id: courseId,
    trainer: trainerId,
  })
    .select("-__v")
    .populate({
      path: "sections",
      options: { sort: { order: 1 } },
    })
    .lean();

  if (!course) return null;

  console.log("[DEBUG] Fetched course:", course.title);
  console.log("[DEBUG] Number of sections:", course.sections.length);

  // 👇 Attach lessons, assignments, quizzes
  for (let i = 0; i < course.sections.length; i++) {
    const section = course.sections[i];
    console.log(`\n[DEBUG] Processing section: ${section.title} (${section._id})`);

    // LESSONS
    const lessons = await Lesson.find({ section: section._id })
      .sort({ order: 1 })
      .lean();
    console.log(`[DEBUG] Found ${lessons.length} lessons`);
    section.lessons = lessons;

    // ASSIGNMENTS
    const assignments = await Assignment.find({ section: section._id })
      .sort({ dueDate: 1 })
      .lean();
    assignments.forEach((a) => (a.type = "assignment"));
    console.log(`[DEBUG] Found ${assignments.length} assignments`);

    // QUIZZES
    const quizzes = await Quiz.find({ section: section._id })
      .sort({ order: 1 })
      .lean();
    quizzes.forEach((q) => (q.type = "quiz"));
    console.log(`[DEBUG] Found ${quizzes.length} quizzes`);

    // Merge into contents array for frontend
    section.contents = [...lessons, ...assignments, ...quizzes];
    console.log(`[DEBUG] Total contents in section: ${section.contents.length}`);
  }

  return course;
};

export const getMyCoursesService = async (trainerId) => {
  return await Course.find({ trainer: trainerId })
    .select(
      "title slug thumbnail price level language status createdAt updatedAt"
    )
    .sort({ createdAt: -1 });
};
