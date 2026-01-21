import Course from "./course.model.js";
import { AppError } from "../../utils/appError.js";
import mongoose from "mongoose";
import Lesson from "../lessons/lesson.model.js";
import Assignment from "../assignments/assignment.model.js";
import Quiz from "../quizzes/quiz.model.js";

// ================= CREATE COURSE =================
export const createCourseService = async (data) => {
  const exists = await Course.findOne({
    title: data.title,
    trainer: data.trainer,
  });

  if (exists) {
    throw new AppError("Course with this title already exists", 409);
  }

  return Course.create(data);
};

// ================= GET ALL COURSES =================
export const getAllCoursesService = async (filter = {}) => {
  return Course.find(filter)
    .populate("trainer", "name email")
    .sort({ createdAt: -1 });
};

// ================= GET COURSE BY ID =================
export const getCourseByIdService = async (courseId, user) => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) return null;

  const query =
    user.role === "trainer"
      ? { _id: courseId, trainer: user.id }
      : { _id: courseId, status: "published" };

  const course = await Course.findOne(query)
    .select("-__v")
    .populate({
      path: "sections",
      options: { sort: { order: 1 } },
    })
    .lean();

  if (!course) return null;

  for (const section of course.sections) {
    const lessons = await Lesson.find({ section: section._id })
      .sort({ order: 1 })
      .lean();

    const assignments = await Assignment.find({ section: section._id })
      .sort({ dueDate: 1 })
      .lean();
    assignments.forEach((a) => (a.type = "assignment"));

    const quizzes = await Quiz.find({ section: section._id })
      .sort({ order: 1 })
      .lean();
    quizzes.forEach((q) => (q.type = "quiz"));

    section.contents = [...lessons, ...assignments, ...quizzes];
  }

  return course;
};

// ================= GET MY COURSES =================
export const getMyCoursesService = async (trainerId) => {
  return Course.find({ trainer: trainerId })
    .select(
      "title slug thumbnail price level language status createdAt updatedAt"
    )
    .sort({ createdAt: -1 });
};

// ================= PUBLISH COURSE =================
export const publishCourseService = async (courseId, trainerId) => {
  const course = await Course.findOne({ _id: courseId, trainer: trainerId });

  if (!course) return null;

  if (!course.sections?.length) {
    throw new AppError("Add at least one section before publishing", 400);
  }

  course.status = "published";
  await course.save();

  return course;
};
