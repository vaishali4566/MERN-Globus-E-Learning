import { FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/common/ProgressBar";

const CourseCard = ({ course, role = "student" }) => {
  const navigate = useNavigate();

  const status = course?.status || "draft";

  const isDraft = status === "draft";
  const isTrainer = role === "trainer";
  const isStudent = role === "student";

  // ✅ Student enrollment / purchase check
  const isEnrolled = course?.isEnrolled === true || course?.isPurchased === true;

  // ===== DEFAULT BUTTON (STUDENT NOT ENROLLED) =====
  let buttonLabel = "Buy Now";
  let buttonAction = () => navigate(`/student/checkout/${course._id}`);
  let buttonClass = "bg-green-500 text-white";

  // ===== TRAINER FLOW =====
  if (isTrainer) {
    if (isDraft) {
      buttonLabel = "Continue Editing";
    } else {
      buttonLabel = "View Course";
    }
    buttonAction = () => navigate(`/trainer/courses/${course._id}/builder`);
    buttonClass = "bg-blue-500 text-white";
  }

  // ===== STUDENT FLOW =====
  if (isStudent) {
    if (isEnrolled) {
      buttonLabel = "Go to Course";
      buttonAction = () => navigate(`/student/courses/${course._id}`);
      buttonClass = "bg-blue-500 text-white";
    } else {
      buttonLabel = "Buy Now";
      buttonAction = () => navigate(`/student/checkout/${course._id}`);
      buttonClass = "bg-green-500 text-white";
    }
  }

  // ===== BLOCK STUDENT FROM DRAFT COURSES =====
  const disableButton = isStudent && isDraft;

  return (
    <div className="bg-white dark:bg-[#1f2337] rounded-xl p-3 shadow-sm">
      {/* Thumbnail */}
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <img
          src={`http://localhost:4000${course.thumbnail}` || "/placeholder-course.jpg"}
          alt={course?.title || "Course"}
          className="w-full h-36 object-cover"
        />
        <span
          className={`absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full text-white ${
            isDraft ? "bg-yellow-500" : "bg-green-500"
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        {course?.title || "Untitled Course"}
      </h3>

      <p className="text-xs text-gray-500 line-clamp-2 mt-1">
        {course?.description || "No description"}
      </p>

      {/* Progress bar for enrolled courses */}
      {isStudent && isEnrolled && (
        <div className="mt-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Progress
            </span>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {course?.progressPercentage || 0}%
            </span>
          </div>
          <ProgressBar percentage={course?.progressPercentage || 0} size="sm" showLabel={false} />
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400 mt-3">
        <div className="flex items-center gap-1">
          <FiCalendar />
          <span>
            {course?.createdAt
              ? new Date(course.createdAt).toLocaleDateString()
              : "—"}
          </span>
        </div>
        <span>{course?.price === 0 ? "Free" : `₹${course?.price}`}</span>
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={buttonAction}
        disabled={disableButton}
        className={`mt-3 w-full text-xs font-medium py-2 rounded-lg ${
          disableButton ? "opacity-50 cursor-not-allowed" : buttonClass
        }`}
      >
        {disableButton ? "Unavailable" : buttonLabel}
      </button>
    </div>
  );
};

export default CourseCard;
