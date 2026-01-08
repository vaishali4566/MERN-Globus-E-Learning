// Course
//  └── Section
//       └── Quiz
//            ├── Questions
//            └── Attempts (per student)


import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      default: "",
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
      index: true,
    },

    timeLimit: {
      type: Number, // minutes
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    passMarks: {
      type: Number,
      required: true,
    },

    allowedAttempts: {
      type: Number,
      default: 1,
    },

    shuffleQuestions: {
      type: Boolean,
      default: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // trainer
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Quiz", quizSchema);
