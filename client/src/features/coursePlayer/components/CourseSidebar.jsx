import CourseSection from "./CourseSection";
import CourseLesson from "./CourseLesson";
import { useTheme } from "../../../hooks/useTheme";

export default function CourseSidebar({
  sections,
  activeItemId, // renamed to generic "item"
  onSelectItem,
}) {
  const { theme } = useTheme();

  return (
    <div className={`w-[340px] bg-white dark:bg-[#1f2337] border-l border-gray-300 dark:border-gray-700 overflow-y-auto ${theme === "dark" ? "dark" : ""}`}>
      <h3 className="p-4 font-semibold text-lg border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">Course Content</h3>

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
