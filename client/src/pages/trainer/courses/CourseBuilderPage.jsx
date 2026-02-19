import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

import SectionCard from "../../../features/courses/components/SectionCard";
import ContentModalWrapper from "../../../features/courses/modals/ContentModalWrapper";

import {
  getCourseById,
  publishCourse,
} from "../../../features/courses/services/courseService";

import { createSection } from "@/features/courses/services/sectionService";

/* ================= HELPERS ================= */
const normalizeSection = (section) => ({
  _id: section._id,
  title: section.title || "Untitled Section",
  contents: Array.isArray(section.contents) ? section.contents : [],
});

export default function CourseBuilderPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
        console.log("🔄 Fetching course with ID:", courseId);

        const data = await getCourseById(courseId);

        console.log("📦 Fetched course data:", data);
        console.log("📌 Fetched course status:", data?.status);

        if (!isMounted) return;

        const normalizedSections = Array.isArray(data.sections)
          ? data.sections.map((s) => normalizeSection(s))
          : [];

        const finalCourse = {
          ...data,
          sections: normalizedSections,
        };

        console.log("✅ Setting course in state:", finalCourse);

        setCourse(finalCourse);
      } catch (error) {
        console.error("❌ Fetch course failed:", error);
        setCourse(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (courseId) fetchCourse();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  /* ================= ADD SECTION ================= */
  const addSection = async () => {
    if (!courseId) return;

    try {
      console.log("➕ Adding section to course:", courseId);

      const res = await createSection(courseId, { title: "New Section" });

      console.log("📦 Add section response:", res);

      setCourse((prev) => {
        if (!prev) return prev;

        console.log("📌 Status BEFORE adding section:", prev.status);

        const newSection = normalizeSection(
          res.data?.section || res.data
        );

        const updated = {
          ...prev,
          sections: [...prev.sections, newSection],
        };

        console.log("✅ Updated course AFTER adding section:", updated);
        console.log("📌 Status AFTER adding section (frontend):", updated.status);

        return updated;
      });
    } catch (error) {
      console.error("❌ Add section error:", error);
      alert("Failed to add section");
    }
  };

  /* ================= CONTENT CREATED ================= */
  const handleContentCreated = (sectionId, newContent) => {
    const lesson = newContent?.data || newContent;
    if (!lesson) return;

    console.log("📘 New content created:", lesson);

    setCourse((prevCourse) => {
      if (!prevCourse) return prevCourse;

      const updatedSections = prevCourse.sections.map((sec) => {
        if (sec._id.toString() === sectionId.toString()) {
          return {
            ...sec,
            contents: [...(sec.contents || []), lesson],
          };
        }
        return sec;
      });

      const updatedCourse = {
        ...prevCourse,
        sections: updatedSections,
      };

      console.log("✅ Course after adding content:", updatedCourse);

      return updatedCourse;
    });
  };

  /* ================= PUBLISH ================= */
  const handlePublish = async () => {
    if (!courseId) return;

    try {
      setSaving(true);

      console.log("🚀 Publishing course:", courseId);

      const res = await publishCourse(courseId);

      console.log("📦 Publish response:", res);

      setCourse((prev) => {
        const updated = {
          ...prev,
          status: "published",
        };

        console.log("✅ Status AFTER publish (frontend):", updated.status);
        return updated;
      });

      navigate("/trainer/my-courses");
    } catch (error) {
      console.error("❌ Publish error:", error);
      alert("Publish failed");
    } finally {
      setSaving(false);
    }
  };

  /* ================= GLOBAL RENDER DEBUG ================= */
  console.log("🔁 Component render - Current course status:", course?.status);

  if (loading) return <p className="text-center">Loading course...</p>;
  if (!course) return <p className="text-center">Course not found</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-[#1f2337] rounded-2xl p-6 space-y-6">
      <input
        value={course.title}
        onChange={(e) =>
          setCourse((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="Course title"
        className="text-2xl font-semibold bg-transparent w-full outline-none border-b pb-2"
      />

      <div className="space-y-4">
        {course.sections.length ? (
          course.sections.map((section) => (
            <SectionCard
              key={section._id}
              section={section}
              setCourse={setCourse}
              openAddContentModal={(type) =>
                setModal({
                  open: true,
                  type,
                  sectionId: section._id,
                })
              }
            />
          ))
        ) : (
          <p className="text-sm text-gray-400">No sections yet</p>
        )}
      </div>

      <button
        onClick={addSection}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <Plus size={16} />
        Add Section
      </button>

      <div className="flex justify-end gap-3 pt-4 border-t">
  {course.status === "draft" && (
    <button
      onClick={handlePublish}
      disabled={saving}
      className="bg-green-600 text-white py-2 px-6 text-sm rounded-md disabled:opacity-50"
    >
      {saving ? "Publishing..." : "Publish"}
    </button>
  )}

  {course.status === "published" && course.needsRepublish && (
    <button
      onClick={handlePublish}
      disabled={saving}
      className="bg-yellow-600 text-white py-2 px-6 text-sm rounded-md"
    >
      {saving ? "Republishing..." : "Republish"}
    </button>
  )}

  {course.status === "published" && !course.needsRepublish && (
    <button
      disabled
      className="bg-gray-400 text-white py-2 px-6 text-sm rounded-md cursor-not-allowed"
    >
      Published
    </button>
  )}
</div>


      {modal.open && (
        <ContentModalWrapper
          type={modal.type}
          sectionId={modal.sectionId}
          courseId={course._id}
          onClose={() =>
            setModal({ open: false, type: null, sectionId: null })
          }
          onSubmit={(newContent) => {
            handleContentCreated(modal.sectionId, newContent);
            setModal({ open: false, type: null, sectionId: null });
          }}
        />
      )}
    </div>
  );
}
