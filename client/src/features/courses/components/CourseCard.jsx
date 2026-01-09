import { FiCalendar, FiUser } from "react-icons/fi";

const CourseCard = ({ course }) => {
  const isEnrolled = course.isEnrolled;

  return (
    <div
      className="bg-white dark:bg-[#1f2337]
      rounded-xl p-3 shadow-sm hover:shadow-md transition"
    >
      {/* Thumbnail */}
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-36 object-cover"
        />

        {isEnrolled && (
          <span
            className="absolute top-2 right-2 text-[10px] font-medium
            bg-green-500 text-white px-2 py-0.5 rounded-full"
          >
            Enrolled
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
        {course.title}
      </h3>

      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
        {course.description}
      </p>

      {/* Meta */}
      <div
        className="flex items-center justify-between text-xs
        text-gray-400 dark:text-gray-500 mt-3"
      >
        <div className="flex items-center gap-1">
          <FiUser className="text-blue-600 dark:text-blue-400" />
          <span>{course.instructor}</span>
        </div>

        {course.enrolledDate && (
          <div className="flex items-center gap-1">
            <FiCalendar className="text-blue-600 dark:text-blue-400" />
            <span>{course.enrolledDate}</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        className={`mt-3 w-full text-xs font-medium py-2 rounded-lg transition
          ${
            isEnrolled
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          }`}
      >
        {isEnrolled ? "Continue Learning" : "Explore Course"}
      </button>
    </div>
  );
};

export default CourseCard;
