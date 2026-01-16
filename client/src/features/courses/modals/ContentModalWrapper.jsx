import LessonModal from "./LessonModal";
import QuizModal from "./QuizModal";
import AssignmentModal from "./AssignmentModal";

export default function ContentModalWrapper({
  type,
  sectionId,
  courseId,
  onClose,
  onSubmit,
}) {
  // 👇 yahan modal.open bilkul use nahi karna

  console.log("[DEBUG: ContentModalWrapper] Rendering for type:", type);
  console.log("[DEBUG: ContentModalWrapper] sectionId:", sectionId);
  console.log("[DEBUG: ContentModalWrapper] courseId:", courseId);

  switch (type) {
    case "lesson":
      return (
        <LessonModal
        sectionId={sectionId}
        courseId={courseId} 
          onClose={onClose}
          onSubmit={(newContent) => {
            console.log("[DEBUG: ContentModalWrapper] Lesson onSubmit called with:", newContent);
            onSubmit(newContent);
          }}
        />
      );

    case "quiz":
      return (
        <QuizModal
          onClose={onClose}
          onSubmit={onSubmit}
        />
      );

    case "assignment":
      return (
        <AssignmentModal
          onClose={onClose}
          onSubmit={onSubmit}
        />
      );

    default:
      return null;
  }
}