import mongoose from "mongoose";

const lessonProgressSchema = new mongoose.Schema(
  {
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },

    watchedDuration: {
      type: Number, // seconds
      default: 0,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
    },
  },
  { _id: false }
);

const quizProgressSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    bestScore: {
      type: Number,
      default: 0,
    },

    passed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
    },
  },
  { _id: false }
);

const sectionProgressSchema = new mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },

    lessons: [lessonProgressSchema],
    quizzes: [quizProgressSchema],

    isCompleted: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
    },
  },
  { _id: false }
);

const studentProgressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    sections: [sectionProgressSchema],

    completionPercentage: {
      type: Number,
      default: 0,
    },

    isCourseCompleted: {
      type: Boolean,
      default: false,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// One progress document per student per course
studentProgressSchema.index(
  { student: 1, course: 1 },
  { unique: true }
);

export default mongoose.model(
  "StudentProgress",
  studentProgressSchema
);
