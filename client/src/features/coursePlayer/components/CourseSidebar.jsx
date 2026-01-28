import CourseSection from "./CourseSection";
import CourseLesson from "./CourseLesson";

export default function CourseSidebar({
  sections,
  activeLessonId,
  onSelectLesson,
}) {
  return (
    <div className="w-[340px] bg-white border-l border-gray-200 overflow-y-auto">
      <h3 className="p-4 font-semibold text-lg border-b">
        Course Content
      </h3>

      {sections.map((section) => (
        <CourseSection key={section._id} title={section.title}>
          {section.lessons.map((lesson) => (
            <CourseLesson
              key={lesson._id}
              title={lesson.title}
              duration={lesson.duration}
              isLocked={lesson.isLocked}
              active={lesson._id === activeLessonId}
              onClick={() => onSelectLesson(lesson)}
            />
          ))}
        </CourseSection>
      ))}
    </div>
  );
}
