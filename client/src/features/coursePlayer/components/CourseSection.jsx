import { ChevronDown } from "lucide-react";
import CourseLesson from "./CourseLesson";

export default function CourseSection({ title, children }) {
  return (
    <div className="border-b">
      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100">
        <span className="font-medium">📂 {title}</span>
        <ChevronDown size={18} />
      </div>
      <div className="pl-6 pb-2">{children}</div>
    </div>
  );
}

CourseSection.Lesson = CourseLesson;
