// Course
//  └── Section
//       └── Assignment
//            ├── Instructions
//            ├── Submission (file / text / link)
//            ├── Due date
//            ├── Marks & feedback




import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
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
      maxlength: 1000,
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

    type: {
      type: String,
      enum: ["video", "article", "live"],
      required: true,
    },

    // ===== VIDEO LESSON =====
    video: {
      url: String,
      duration: Number, // seconds
      provider: {
        type: String,
        enum: ["youtube", "vimeo", "s3", "wasabi"],
      },
    },

    // ===== ARTICLE LESSON =====
    content: {
      type: String, // HTML / Markdown
    },

    // ===== LIVE CLASS =====
    liveClass: {
      meetingUrl: String,
      startTime: Date,
      endTime: Date,
    },

    order: {
      type: Number,
      required: true,
    },

    isPreview: {
      type: Boolean,
      default: false, // free preview before purchase
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

// Ensure lesson order unique inside section
lessonSchema.index(
  { section: 1, order: 1 },
  { unique: true }
);

export default mongoose.model("Lesson", lessonSchema);
