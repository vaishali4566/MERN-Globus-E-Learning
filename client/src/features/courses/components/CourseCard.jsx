import { FiCalendar, FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, user }) => {
  const navigate = useNavigate();

  const status = course?.status || "draft"; // safe default
  const isDraft = status === "draft";

  // 🔥 DEFAULT (student who hasn't bought)
  let buttonLabel = "Buy Now";
  let buttonAction = () => navigate(`/student/checkout/${course._id}`);
  let buttonClass = "bg-green-500 text-white cursor-pointer";

  if (isDraft) {
    buttonLabel = "Continue Editing";
    buttonAction = () => navigate(`/trainer/courses/${course._id}/builder`);
    buttonClass =
      "border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 cursor-pointer";
  } else if (user?.role === "trainer") {
    buttonLabel = "View Course";
    buttonAction = () => navigate(`/trainer/courses/${course._id}/builder`);
    buttonClass = "bg-blue-500 text-white cursor-pointer";
  } else if (user?.role === "student") {
    if (course?.isEnrolled === true || course?.isPurchased === true) {
      buttonLabel = "Go to Course";
      buttonAction = () => navigate(`/courses/${course._id}`);
      buttonClass = "bg-blue-500 text-white cursor-pointer";
    }
  }

  return (
    <div className="bg-white dark:bg-[#1f2337] rounded-xl p-3 shadow-sm">
      {/* Thumbnail */}
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <img
          src={course?.thumbnail || "/placeholder-course.jpg"}
          alt={course?.title || "Course"}
          className="w-full h-36 object-cover"
        />

        <span
          className={`absolute top-2 right-2 text-[10px] font-medium
          px-2 py-0.5 rounded-full
          ${isDraft ? "bg-yellow-500" : "bg-green-500"} text-white`}
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

      {/* 🔥 Dynamic Button */}
      <button
        onClick={buttonAction}
        className={`mt-3 w-full text-xs font-medium py-2 rounded-lg ${buttonClass}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default CourseCard;
