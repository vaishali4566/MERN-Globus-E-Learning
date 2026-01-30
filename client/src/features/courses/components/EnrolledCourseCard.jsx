import { FiBook, FiCheckCircle, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/common/ProgressBar";

const EnrolledCourseCard = ({ course }) => {
  const navigate = useNavigate();

  const progressPercent = course?.progressPercentage || 0;
  const isCompleted = progressPercent === 100;

  return (
    <div className="bg-white dark:bg-[#1f2337] rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-32 bg-gray-200 dark:bg-gray-700">
        <img
          src={`http://localhost:4000${course.thumbnail}` || "/placeholder-course.jpg"}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {isCompleted && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              ✓ Completed
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
          {course.title}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
          {course.description}
        </p>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Progress
            </span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {progressPercent}%
            </span>
          </div>
          <ProgressBar percentage={progressPercent} size="sm" showLabel={false} />
        </div>

        {/* Stats */}
        <div className="flex gap-2 mt-3 text-xs text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <FiBook size={14} /> Learning
          </span>
          <span className="flex items-center gap-1">
            <FiClock size={14} /> {course.level}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate(`/student/courses/${course._id}`)}
          className={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition ${
            isCompleted
              ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
          }`}
        >
          {isCompleted ? "Review Course" : "Continue Learning"}
        </button>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
