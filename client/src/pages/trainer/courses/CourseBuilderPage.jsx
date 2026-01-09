import { useState } from "react";
import { Plus } from "lucide-react";
import SectionCard from "../../../features/courses/components/SectionCard";
import { saveDraft, publishCourse } from "../../../features/courses/services/courseService";

export default function CourseBuilderPage() {
  const [course, setCourse] = useState({
    title: "Untitled Course",
    description: "",
    sections: [],
  });

  const addSection = () => {
    setCourse((c) => ({
      ...c,
      sections: [
        ...c.sections,
        { id: Date.now(), title: "New Section", contents: [] },
      ],
    }));
  };

  const addContent = (sectionId, type) => {
    setCourse((c) => ({
      ...c,
      sections: c.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              contents: [
                ...s.contents,
                { id: Date.now(), type, title: `New ${type}` },
              ],
            }
          : s
      ),
    }));
  };

  const removeContent = (sectionId, contentId) => {
  setCourse((c) => ({
    ...c,
    sections: c.sections.map((s) =>
      s.id === sectionId
        ? {
            ...s,
            contents: s.contents.filter(
              (item) => item.id !== contentId
            ),
          }
        : s
    ),
  }));
};


  // Save Draft
  const handleSaveDraft = async () => {
    try {
      const res = await saveDraft(course);
      alert("Draft saved successfully!");
      setCourse((prev) => ({ ...prev, _id: res.data._id }));
    } catch (err) {
      console.error(err);
      alert("Failed to save draft");
    }
  };

  // Publish
  const handlePublish = async () => {
    try {
      if (!course._id) {
        const res = await saveDraft(course);
        setCourse((prev) => ({ ...prev, _id: res.data._id }));
      }
      await publishCourse(course._id);
      alert("Course published successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to publish course");
    }
  };

  return (
    <div className="">
      <div
        className="max-w-4xl mx-auto
        bg-white dark:bg-[#1f2337]
        rounded-2xl shadow-sm p-6 space-y-8"
      >
        {/* ===== Course Basics ===== */}
        <div>
          <input
            value={course.title}
            onChange={(e) =>
              setCourse({ ...course, title: e.target.value })
            }
            placeholder="Course title"
            className="w-full text-2xl font-semibold
            bg-transparent outline-none
            border-b border-gray-200 dark:border-gray-700
            text-gray-900 dark:text-white
            pb-2"
          />

        </div>

        {/* ===== Sections ===== */}
        <div className="space-y-4">
          {course.sections.length > 0 ? (
            course.sections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                setCourse={setCourse}
                addContent={addContent}
                removeContent={removeContent}
              />
            ))
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500">
              No sections added yet
            </p>
          )}
        </div>

        {/* ===== Add Section CTA ===== */}
        <button
          onClick={addSection}
          className="flex items-center gap-2
          px-4 py-2 rounded-xl text-sm font-medium
          border border-blue-600 text-blue-600
          hover:bg-blue-600 hover:text-white
          transition"
        >
          <Plus size={16} />
          Add Section
        </button>

        {/* ===== Footer Actions ===== */}
        <div className="flex justify-end gap-3 pt-6 border-t dark:border-gray-700">
          <button
            onClick={handleSaveDraft}
            className="px-5 py-2 rounded-lg text-sm font-medium
            border border-gray-300 dark:border-gray-600
            text-gray-700 dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-darkHover
            transition"
          >
            Save Draft
          </button>

          <button
            onClick={handlePublish}
            className="px-5 py-2 rounded-lg text-sm font-medium
            bg-green-600 text-white
            hover:bg-green-700 transition"
          >
            Publish Course
          </button>
        </div>
      </div>
    </div>
  );
}
