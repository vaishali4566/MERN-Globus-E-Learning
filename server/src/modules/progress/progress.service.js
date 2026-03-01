import StudentProgress from "./progress.model.js";
import Enrollment from "../enrollments/enrollment.model.js";
import Course from "../courses/course.model.js";
import Section from "../sections/section.model.js";
import Lesson from "../lessons/lesson.model.js";
import Assignment from "../assignments/assignment.model.js";
import Quiz from "../quizzes/quiz.model.js";
import { AppError } from "../../utils/appError.js";
import mongoose from "mongoose";

/**
 * Initialize progress for a new enrollment
 */
export const initializeProgressService = async (studentId, courseId) => {
  try {
    // Check if progress already exists
    const existingProgress = await StudentProgress.findOne({
      student: studentId,
      course: courseId,
    });

    if (existingProgress) {
      return existingProgress;
    }

    // Get course sections
    const sections = await Section.find({ course: courseId })
      .select("_id")
      .lean();

    const sectionsData = await Promise.all(
      sections.map(async (section) => {
        const lessons = await Lesson.find({ section: section._id }).select("_id").lean();
        const quizzes = await Quiz.find({ section: section._id }).select("_id").lean();

        return {
          section: section._id,
          lessons: lessons.map((l) => ({
            lesson: l._id,
            watchedDuration: 0,
            isCompleted: false,
            completedAt: null,
          })),
          quizzes: quizzes.map((q) => ({
            quiz: q._id,
            attempts: 0,
            bestScore: 0,
            passed: false,
            completedAt: null,
          })),
          isCompleted: false,
          completedAt: null,
        };
      })
    );

    const progress = await StudentProgress.create({
      student: studentId,
      course: courseId,
      sections: sectionsData,
      completionPercentage: 0,
      isCourseCompleted: false,
      startedAt: new Date(),
    });

    return progress;
  } catch (error) {
    throw error;
  }
};

/**
 * Mark lesson as completed
 */
export const markLessonCompleteService = async (
  studentId,
  courseId,
  lessonId,
  watchedDuration = 0
) => {
  // Convert IDs to ObjectId for proper comparison
  const studentObjectId = new mongoose.Types.ObjectId(studentId);
  const courseObjectId = new mongoose.Types.ObjectId(courseId);
  const lessonObjectId = new mongoose.Types.ObjectId(lessonId);

  let progress = await StudentProgress.findOne({
    student: studentObjectId,
    course: courseObjectId,
  });

  if (!progress) {
    // If progress doesn't exist, initialize it first
    progress = await initializeProgressService(studentId, courseId);
  }

  // Find and update lesson progress
  let found = false;
  progress.sections.forEach((section) => {
    const lesson = section.lessons.find(
      (l) => l.lesson.toString() === lessonObjectId.toString()
    );
    if (lesson) {
      lesson.watchedDuration = watchedDuration;
      lesson.isCompleted = true;
      lesson.completedAt = new Date();
      found = true;
    }
  });

  if (!found) {
    throw new AppError("Lesson not found in progress", 404);
  }

  // Recalculate completion percentage
  updateCompletionPercentage(progress);

  await progress.save();
  return progress;
};

/**
 * Update quiz attempt progress
 */
export const updateQuizProgressService = async (
  studentId,
  courseId,
  quizId,
  score,
  totalMarks,
  passed
) => {
  const progress = await StudentProgress.findOne({
    student: studentId,
    course: courseId,
  });

  if (!progress) {
    throw new AppError("Progress not found", 404);
  }

  // Find and update quiz progress
  let found = false;
  progress.sections.forEach((section) => {
    const quiz = section.quizzes.find((q) => q.quiz.toString() === quizId);
    if (quiz) {
      quiz.attempts += 1;
      quiz.bestScore = Math.max(quiz.bestScore, score);
      quiz.passed = passed;
      if (passed || quiz.passed) {
        quiz.completedAt = new Date();
      }
      found = true;
    }
  });

  if (!found) {
    throw new AppError("Quiz not found in progress", 404);
  }

  // Recalculate completion percentage
  updateCompletionPercentage(progress);

  // Also update enrollment progress
  await Enrollment.findOneAndUpdate(
    { student: studentId, course: courseId },
    { progressPercentage: progress.completionPercentage }
  );

  await progress.save();
  return progress;
};

/**
 * Mark assignment as completed
 */
export const markAssignmentCompleteService = async (
  studentId,
  courseId,
  assignmentId
) => {
  const progress = await StudentProgress.findOne({
    student: studentId,
    course: courseId,
  });

  if (!progress) {
    throw new AppError("Progress not found", 404);
  }

  // Find assignment in sections to get section ID
  const assignment = await Assignment.findById(assignmentId).select("section").lean();
  
  if (!assignment) {
    throw new AppError("Assignment not found", 404);
  }

  // Find the correct section in progress and mark assignment
  let found = false;
  progress.sections.forEach((section) => {
    if (section.section.toString() === assignment.section.toString()) {
      // Initialize assignments array if not exists
      if (!section.assignments) {
        section.assignments = [];
      }

      // Check if assignment already marked
      let assignmentProgress = section.assignments.find(
        (a) => a.assignment?.toString() === assignmentId
      );

      if (!assignmentProgress) {
        section.assignments.push({
          assignment: assignmentId,
          isCompleted: true,
          submittedAt: new Date(),
        });
      } else {
        assignmentProgress.isCompleted = true;
        assignmentProgress.submittedAt = new Date();
      }
      found = true;
    }
  });

  if (!found) {
    throw new AppError("Assignment not found in course sections", 404);
  }

  // Recalculate completion percentage
  updateCompletionPercentage(progress);

  // Also update enrollment progress
  await Enrollment.findOneAndUpdate(
    { student: studentId, course: courseId },
    { progressPercentage: progress.completionPercentage }
  );

  await progress.save();
  return progress;
};

/**
 * Get course progress for student
 */
export const getCourseProgressService = async (studentId, courseId) => {
  const progress = await StudentProgress.findOne({
    student: studentId,
    course: courseId,
  })
    .populate("student", "name email")
    .populate("course", "title totalLessons")
    .lean();

  if (!progress) {
    return null;
  }

  // Calculate stats
  const stats = calculateProgressStats(progress);

  return {
    ...progress,
    stats,
  };
};

/**
 * Get all courses progress for student
 */
export const getAllCoursesProgressService = async (studentId) => {
  const progress = await StudentProgress.find({
    student: studentId,
  })
    .populate("course", "title description thumbnail")
    .lean();

  return progress.map((p) => ({
    ...p,
    stats: calculateProgressStats(p),
  }));
};

/**
 * Helper: Calculate completion percentage and stats
 */
function updateCompletionPercentage(progress) {
  let totalItems = 0;
  let completedItems = 0;

  progress.sections.forEach((section) => {
    section.lessons.forEach((lesson) => {
      totalItems++;
      if (lesson.isCompleted) completedItems++;
    });

    section.quizzes.forEach((quiz) => {
      totalItems++;
      if (quiz.passed) completedItems++;
    });
  });

  progress.completionPercentage =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // Mark course as completed if 100%
  if (progress.completionPercentage === 100) {
    progress.isCourseCompleted = true;
    progress.completedAt = new Date();
  }
}

/**
 * Helper: Calculate detailed progress stats
 */
function calculateProgressStats(progress) {
  let totalLessons = 0;
  let completedLessons = 0;
  let totalQuizzes = 0;
  let passedQuizzes = 0;
  let totalDuration = 0; // in minutes

  progress.sections.forEach((section) => {
    section.lessons.forEach((lesson) => {
      totalLessons++;
      if (lesson.isCompleted) {
        completedLessons++;
        totalDuration += lesson.watchedDuration / 60; // Convert to minutes
      }
    });

    section.quizzes.forEach((quiz) => {
      totalQuizzes++;
      if (quiz.passed) {
        passedQuizzes++;
      }
    });
  });

  return {
    totalLessons,
    completedLessons,
    lessonsProgress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
    totalQuizzes,
    passedQuizzes,
    quizzesProgress: totalQuizzes > 0 ? Math.round((passedQuizzes / totalQuizzes) * 100) : 0,
    totalDuration: Math.round(totalDuration), // in minutes
    overallProgress: progress.completionPercentage,
  };
}
