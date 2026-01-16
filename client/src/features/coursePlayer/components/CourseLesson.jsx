export default function CourseLesson({ title, duration, active }) {
  return (
    <div
      className={`flex items-center justify-between p-2 rounded cursor-pointer mb-1 ${
        active
          ? "bg-blue-100 text-blue-500"
          : "hover:bg-gray-100"
      }`}
    >
      <span className="text-sm">{title}</span>
      <span className="text-xs text-gray-500">{duration}</span>
    </div>
  );
}
