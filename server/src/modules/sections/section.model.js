import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    order: {
      type: Number,
      required: true, // for sorting sections
    },

    totalLessons: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: false, // trainer hide/show section
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // trainer only
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique order per course
sectionSchema.index({ course: 1, order: 1 }, { unique: true });

export default mongoose.model("Section", sectionSchema);
