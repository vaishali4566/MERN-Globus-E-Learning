import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["pdf", "link", "zip", "code"],
      required: true,
    },
  },
  { _id: false }
);

const lessonSchema = new mongoose.Schema(
  {
    // ===== BASIC INFO =====
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

    // ===== RELATION =====
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

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // trainer
    },

    // ===== TYPE =====
    type: {
      type: String,
      enum: ["video", "article", "live"],
      required: true,
    },

    // ===== VIDEO LESSON =====
    video: {
      url: {
        type: String,
      },
      duration: {
        type: Number, // seconds
      },
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
      meetingUrl: {
        type: String,
      },
      startTime: {
        type: Date,
      },
      duration: {
        type: Number, // minutes
      },
      platform: {
        type: String,
        enum: ["zoom", "google-meet", "teams", "custom"],
      },
      recordingUrl: {
        type: String, // added after live ends
      },
    },

    // ===== SHARED =====
    resources: [resourceSchema],

    order: {
      type: Number,
      required: true,
    },

    isPreview: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ===== INDEXES =====

// unique order per section
lessonSchema.index(
  { section: 1, order: 1 },
  { unique: true }
);

// ===== VALIDATION BASED ON TYPE =====
lessonSchema.pre("validate", function (next) {
  if (this.type === "video") {
    if (!this.video?.url) {
      return next(new Error("Video URL is required for video lesson"));
    }
  }

  if (this.type === "article") {
    if (!this.content) {
      return next(new Error("Content is required for article lesson"));
    }
  }

  if (this.type === "live") {
    if (!this.liveClass?.meetingUrl || !this.liveClass?.startTime) {
      return next(
        new Error("Meeting URL and start time are required for live class")
      );
    }
  }

  next();
});

export default mongoose.model("Lesson", lessonSchema);


// Course
//  └── Section
//       └── Content (ordered items)
//            ├── Lesson
//            │     ├── type: video | article | live
//            │     ├── duration
//            │     └── resources
//            ├── Assignment
//            │     ├── instructions
//            │     ├── dueDate
//            │     ├── maxMarks
//            │     └── submissions (student-specific)
//            └── Quiz
//                  ├── questions
//                  └── attempts (student-specific)






// import { useState } from "react";
// import { Plus, ChevronDown, BookOpen, ClipboardList, HelpCircle } from "lucide-react";

// const contentTypes = [
//   { type: "lesson", label: "Lesson", icon: BookOpen },
//   { type: "assignment", label: "Assignment", icon: ClipboardList },
//   { type: "quiz", label: "Quiz", icon: HelpCircle },
// ];

// export default function CourseBuilder() {
//   const [course, setCourse] = useState({
//     title: "Untitled Course",
//     description: "",
//     sections: [],
//   });

//   const addSection = () => {
//     setCourse((c) => ({
//       ...c,
//       sections: [...c.sections, { id: Date.now(), title: "New Section", contents: [] }],
//     }));
//   };

//   const addContent = (sectionId, type) => {
//     setCourse((c) => ({
//       ...c,
//       sections: c.sections.map((s) =>
//         s.id === sectionId
//           ? {
//               ...s,
//               contents: [
//                 ...s.contents,
//                 { id: Date.now(), type, title: `New ${type}` },
//               ],
//             }
//           : s
//       ),
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 space-y-6">

//         {/* Course Basics */}
//         <div>
//           <input
//             className="text-2xl font-semibold w-full border-b outline-none"
//             value={course.title}
//             onChange={(e) => setCourse({ ...course, title: e.target.value })}
//           />
//           <textarea
//             placeholder="Course description"
//             className="mt-2 w-full border rounded p-2"
//             value={course.description}
//             onChange={(e) => setCourse({ ...course, description: e.target.value })}
//           />
//         </div>

//         {/* Sections */}
//         <div className="space-y-4">
//           {course.sections.map((section) => (
//             <div key={section.id} className="border rounded-xl p-4 bg-gray-50">
//               <div className="flex items-center justify-between">
//                 <input
//                   className="font-medium text-lg bg-transparent outline-none"
//                   value={section.title}
//                   onChange={(e) =>
//                     setCourse((c) => ({
//                       ...c,
//                       sections: c.sections.map((s) =>
//                         s.id === section.id ? { ...s, title: e.target.value } : s
//                       ),
//                     }))
//                   }
//                 />
//                 <ChevronDown size={18} />
//               </div>

//               {/* Content List */}
//               <div className="mt-4 space-y-2">
//                 {section.contents.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center gap-2 p-2 bg-white rounded border"
//                   >
//                     <span className="text-xs px-2 py-1 bg-gray-200 rounded">
//                       {item.type}
//                     </span>
//                     <span>{item.title}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Add Content */}
//               <div className="mt-4 flex gap-2">
//                 {contentTypes.map(({ type, label, icon: Icon }) => (
//                   <button
//                     key={type}
//                     onClick={() => addContent(section.id, type)}
//                     className="flex items-center gap-1 px-3 py-1 text-sm rounded bg-white border hover:bg-gray-100"
//                   >
//                     <Icon size={14} /> {label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Add Section */}
//         <button
//           onClick={addSection}
//           className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//         >
//           <Plus size={16} /> Add Section
//         </button>

//         {/* Footer Actions */}
//         <div className="flex justify-end gap-2 pt-4">
//           <button className="px-4 py-2 rounded border">Save Draft</button>
//           <button className="px-4 py-2 rounded bg-green-600 text-white">Publish</button>
//         </div>
//       </div>
//     </div>
//   );
// }



