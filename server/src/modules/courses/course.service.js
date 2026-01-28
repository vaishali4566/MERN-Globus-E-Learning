import Course from "./course.model.js";
import { AppError } from "../../utils/appError.js";
import mongoose from "mongoose";
import Lesson from "../lessons/lesson.model.js";
import Assignment from "../assignments/assignment.model.js";
import Quiz from "../quizzes/quiz.model.js";
import Section from "../sections/section.model.js";


// ================= CREATE COURSE =================
export const createCourseService = async (data) => {
  try {

    // Check if course already exists
    const exists = await Course.findOne({
      title: data.title,
      trainer: data.trainer,
    });

    if (exists) {
      throw new AppError("Course with this title already exists", 409);
    }

    // Create new course
    const course = await Course.create(data);

    return course;
  } catch (error) {
    throw error;
  }
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
export const getMyCoursesService = async (userId, role) => {
  if (role === "trainer") {

    const courses = await Course.find({ trainer: userId })
      .select("title description slug thumbnail price level language status createdAt updatedAt trainer")
      .sort({ createdAt: -1 })
      .lean();
    return courses;
  }

  if (role === "student") {

    const enrollments = await Enrollment.find({
      student: userId,
      status: "active",
    })
      .select("course")
      .lean();

    const courseIds = enrollments.map((e) => e.course);

    const courses = await Course.find({
      _id: { $in: courseIds },
    })
      .select("title slug thumbnail price level language status createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();

    return courses;
  }

  return [];
};



// ================= PUBLISH COURSE =================
export const publishCourseService = async (courseId, trainerId) => {
  // 1️⃣ Find the course by id & trainer
  const course = await Course.findOne({ _id: courseId, trainer: trainerId });

  if (!course) return null;

  // 2️⃣ Check if course has at least one section
  if (!course.sections?.length) {
    throw new AppError("Add at least one section before publishing", 400);
  }

  // 3️⃣ Publish the course
  course.status = "published";
  await course.save();

  // 4️⃣ Auto-publish all sections of this course
  await Section.updateMany(
    { course: course._id },
    { $set: { isPublished: true } }
  );

  // 5️⃣ Auto-publish all lessons inside those sections
  const sections = await Section.find({ course: course._id });
  const sectionIds = sections.map(s => s._id);

  if (sectionIds.length) {
    await Lesson.updateMany(
      { section: { $in: sectionIds } },
      { $set: { isPublished: true } }
    );
  }

  return course;
};

// ================= COURSE PLAYER =================
export const getCoursePlayerDataService = async (courseId, userId) => {
  console.log("🟢 Fetching course:", courseId, "for user:", userId);

  // 1️⃣ Course basic info
  const course = await Course.findOne({
    _id: courseId,
    status: "published"
  }).select("title description level totalDuration totalLessons trainer");

  if (!course) {
    console.log("❌ Course not found or not published");
    return null;
  }

  console.log("✅ Course found:", course);

  // 2️⃣ Check if user is trainer
  const isTrainer = course.trainer.toString() === userId.toString();
  console.log("ℹ️ Is user trainer?", isTrainer);

  // 3️⃣ Fetch sections (without lookups first)
  const sectionFilter = {
    course: course._id,
    isDeleted: false,
    ...(isTrainer ? {} : { isPublished: true })
  };
  console.log("🔹 Section filter:", sectionFilter);

  const sectionsRaw = await Section.find(sectionFilter).sort({ order: 1 });
  console.log("🔹 Sections found (raw):", sectionsRaw);

  // 4️⃣ If sections exist, check lessons for each section
  for (let section of sectionsRaw) {
    const lessonFilter = {
      section: section._id,
      ...(isTrainer ? {} : { isPublished: true })
    };
    const lessons = await Lesson.find(lessonFilter).sort({ order: 1 });
    console.log(`🔹 Lessons for section ${section._id}:`, lessons);
  }

  // 5️⃣ Only now, you can run the full aggregation if raw fetch works
  const sections = await Section.aggregate([
    { $match: sectionFilter },
    { $sort: { order: 1 } },
    {
      $lookup: {
        from: "lessons",
        let: { sectionId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$section", "$$sectionId"] },
                  ...(isTrainer ? [] : [{ $eq: ["$isPublished", true] }])
                ]
              }
            }
          },
          { $sort: { order: 1 } },
          { $project: { _id: 1, title: 1, type: 1, duration: 1, isPreview: 1, order: 1 } }
        ],
        as: "lessons"
      }
    }
  ]);

  console.log("🔹 Sections after aggregation:", sections);

  return { course, sections };
};




