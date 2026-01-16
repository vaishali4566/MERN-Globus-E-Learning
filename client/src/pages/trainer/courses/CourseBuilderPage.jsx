import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";

import SectionCard from "../../../features/courses/components/SectionCard";
import ContentModalWrapper from "../../../features/courses/modals/ContentModalWrapper";

import {
  getCourseById,
  saveDraft,
  publishCourse,
} from "../../../features/courses/services/courseService";

import { createSection } from "@/features/courses/services/sectionService";

/* ================= HELPERS ================= */
const normalizeSection = (section) => ({
  _id: section._id || null,
  tempId: section.tempId || crypto.randomUUID(),
  title: section.title || "Untitled Section",
  contents: Array.isArray(section.contents) ? section.contents : [], // ✅ use contents
});



/* ================= COMPONENT ================= */
export default function CourseBuilderPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // ← missing tha

  const [modal, setModal] = useState({
    open: false,
    type: null,
    sectionId: null,
  });

  /* ================= FETCH COURSE ================= */
  useEffect(() => {
    let isMounted = true;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await getCourseById(courseId);

        console.log("[DEBUG: fetchCourse] Raw response from backend:", res);
        console.log("[DEBUG: fetchCourse] Course data:", res.data);
        console.log("[DEBUG: fetchCourse] Sections in data:", res.data.sections);

        if (!isMounted) return;

        const normalizedSections = Array.isArray(res.data.sections)
          ? res.data.sections.map((s) => normalizeSection({ ...s }))
          : [];

        console.log("[DEBUG: fetchCourse] Normalized sections:", normalizedSections);
        normalizedSections.forEach((sec, idx) => {
          console.log(`[DEBUG: fetchCourse] Section ${idx + 1} contents:`, sec.contents);
        });

        setCourse({
          ...res.data,
          sections: normalizedSections,
        });
      } catch (error) {
        console.error("[DEBUG: fetchCourse] Failed to load course:", error);
        setCourse(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourse();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  /* ================= ADD SECTION ================= */
  const addSection = async () => {
    if (!courseId) return;

    try {
      const res = await createSection(courseId, { title: "New Section" });

      setCourse((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          sections: [
            ...prev.sections,
            normalizeSection(res.data.section || res.data),
          ],
        };
      });
    } catch (error) {
      console.error("Add section error:", error);
      alert("Failed to add section");
    }
  };

  const openAddContentModal = (sectionId, type) => {
    setModal({
      open: true,
      type,
      sectionId,
    });
  };

const handleContentCreated = async (sectionId, newContent) => {
  console.log("[DEBUG: handleContentCreated] Called with sectionId:", sectionId);
  console.log("[DEBUG: handleContentCreated] Raw newContent:", newContent);

  const actualLesson = newContent?.data || newContent;

  if (!actualLesson) return;

  // === 1️⃣ Call API to create assignment ===
  try {
    const response = await createAssignment({
      ...actualLesson,
      sectionId,
      courseId: course._id,
    });

    console.log("[DEBUG: Assignment created via API]", response.data);

    // === 2️⃣ Update course state ===
    setCourse((prevCourse) => {
      if (!prevCourse) return prevCourse;

      const updatedSections = prevCourse.sections.map((sec) => {
        if (sec._id.toString() === sectionId.toString()) {
          const newContents = [...(sec.contents || []), response.data.assignment];
          return { ...sec, contents: newContents };
        }
        return sec;
      });

      return { ...prevCourse, sections: updatedSections };
    });
  } catch (err) {
    console.error("[DEBUG: createAssignment API error]", err);
    alert("Failed to create assignment");
  }
};




  /* ================= PUBLISH ================= */
  const handlePublish = async () => {
    if (!courseId) return;

    try {
      setSaving(true);
      await publishCourse(courseId);

      setCourse((prev) => ({
        ...prev,
        status: "published",
      }));

      alert("Course published successfully");
    } catch (error) {
      console.error("Publish error:", error);
      alert("Publish failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center">Loading course...</p>;
  if (!course) return <p className="text-center">Course not found</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-[#1f2337] rounded-2xl p-6 space-y-6">
      {/* COURSE TITLE */}
      <input
        value={course.title}
        onChange={(e) =>
          setCourse((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="Course title"
        className="text-2xl font-semibold bg-transparent w-full outline-none border-b pb-2"
      />

      {/* SECTIONS */}
      <div className="space-y-4">
        {course.sections.length ? (
          course.sections.map((section) => (
            <SectionCard
              key={section._id}
              section={section}
              setCourse={setCourse}
              openAddContentModal={openAddContentModal}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400">No sections yet</p>
        )}
      </div>

      {/* ADD SECTION */}
      <button
        onClick={addSection}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-800"
      >
        <Plus size={16} />
        Add Section
      </button>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        

        <button
          onClick={handlePublish}
          disabled={saving}
          className="bg-green-600 text-white cursor-pointer py-2 px-6 text-sm rounded-md disabled:opacity-50"
        >
          Publish
        </button>
      </div>

      {/* CONTENT MODAL */}
      {modal.open && course?._id && (
  <ContentModalWrapper
    type={modal.type}
    sectionId={modal.sectionId}
    courseId={course._id}
    onClose={() => setModal({ open: false, type: null, sectionId: null })}
    onSubmit={(newContent) => {
      handleContentCreated(modal.sectionId, newContent);
      setModal({ open: false, type: null, sectionId: null });
    }}
  />
)}

    </div>
  );
}