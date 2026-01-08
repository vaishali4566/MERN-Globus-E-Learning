import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    thumbnail: {
      type: String, // S3 / Cloudinary URL
      default: "",
    },

    price: {
      type: Number,
      default: 0, // free course
      min: 0,
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    language: {
      type: String,
      default: "English",
    },

    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },

    totalStudents: {
      type: Number,
      default: 0,
    },

    totalLessons: {
      type: Number,
      default: 0,
    },

    totalDuration: {
      type: Number, // minutes
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);