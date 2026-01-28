import { Lock } from "lucide-react";

export default function CourseLesson({
  title,
  duration,
  active,
  isLocked,
  onClick,
}) {
  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={`flex items-center justify-between p-2 rounded mb-1 text-sm
        ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}
      `}
    >
      <span className="flex items-center gap-2">
        {isLocked && <Lock size={14} />}
        {title}
      </span>

      <span className="text-xs text-gray-500">{duration}</span>
    </div>
  );
}
