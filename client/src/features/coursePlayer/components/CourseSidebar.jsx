import CourseSection from "./CourseSection";
import CourseLesson from "./CourseLesson";

export default function CourseSidebar({
  sections,
  activeItemId, // renamed to generic "item"
  onSelectItem,
}) {
  return (
    <div className="w-[340px] bg-white border-l border-[#757575] overflow-y-auto">
      <h3 className="p-4 font-semibold text-lg border-b">Course Content</h3>

      {sections.map((section) => (
        <CourseSection key={section._id} title={section.title}>
          {/* Combine lessons, assignments, quizzes */}
          {[
            ...(section.lessons || []),
            ...(section.assignments || []),
            ...(section.quizzes || []),
          ]
            .sort((a, b) => (a.order || 0) - (b.order || 0)) // optional: sort by order
            .map((item) => (
              <CourseLesson
                key={item._id}
                title={item.title}
                duration={item.duration || item.timeLimit || ""}
                isLocked={item.isLocked}
                active={item._id === activeItemId}
                onClick={() =>
                  onSelectItem({
                    ...item,
                    itemType: section.lessons?.some((l) => l._id === item._id)
                      ? "lesson"
                      : section.assignments?.some((a) => a._id === item._id)
                        ? "assignment"
                        : "quiz",
                  })
                }
                type={
                  section.lessons?.some((l) => l._id === item._id)
                    ? "lesson"
                    : section.assignments?.some((a) => a._id === item._id)
                      ? "assignment"
                      : "quiz"
                }
              />
            ))}
        </CourseSection>
      ))}
    </div>
  );
}
