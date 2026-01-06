import { FiCalendar, FiUser } from "react-icons/fi";

const CourseCard = ({ course }) => {
  const isEnrolled = course.isEnrolled;

  return (
    <div className="bg-white dark:bg-darkSecondary rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      {/* ===== Thumbnail ===== */}
      <div className="relative m-2 overflow-hidden rounded-lg">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover rounded-lg"
        />

        {/* Status Badge */}
        {isEnrolled && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            Enrolled
          </span>
        )}
      </div>

      {/* ===== Body ===== */}
      <div className="px-4 py-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
          {course.description}
        </p>
      </div>

      {/* ===== Footer ===== */}
      <div className="px-4 pb-4 pt-3 space-y-3">

        {/* Instructor + Date */}
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <FiUser className="text-blue-600 dark:text-blue-400" />
            <span>{course.instructor}</span>
          </div>

          {course.enrolledDate && (
            <div className="flex items-center gap-2">
              <FiCalendar className="text-blue-600 dark:text-blue-400" />
              <span>{course.enrolledDate}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          className={`w-full text-sm font-medium py-2 rounded-lg transition ${
            isEnrolled
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          }`}
        >
          {isEnrolled ? "Continue Learning" : "Explore Course"}
        </button>
      </div>

    </div>
  );
};

export default CourseCard;
