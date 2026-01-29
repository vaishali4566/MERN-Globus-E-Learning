export default function LessonInfo({ lesson }) {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-semibold mb-2">
        {lesson.title}
      </h2>

      <p className="text-gray-600">
        {/* future text lesson content */}
        Lesson description will appear here.
      </p>
    </div>
  );
}
