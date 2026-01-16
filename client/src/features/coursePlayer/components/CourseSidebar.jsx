import CourseSection from "./CourseSection";

export default function CourseSidebar() {
  return (
    <div className="w-[340px] bg-white border-l border-gray-200 overflow-y-auto">
      <h3 className="p-4 font-semibold text-lg border-b">
        Course Content
      </h3>

      <CourseSection title="Section 1: Basics">
        <CourseSection.Lesson
          active
          title="Introduction"
          duration="5:20"
        />
        <CourseSection.Lesson title="What is MERN?" duration="8:10" />
        <CourseSection.Lesson title="Project Overview" duration="6:45" />
      </CourseSection>

      <CourseSection title="Section 2: React">
        <CourseSection.Lesson title="React Setup" duration="7:30" />
        <CourseSection.Lesson title="Components & Props" duration="12:00" />
      </CourseSection>
    </div>
  );
}
