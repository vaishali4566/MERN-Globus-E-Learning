import { FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, role }) => {
  const navigate = useNavigate();

  const status = course?.status || "draft";

  const isDraft = status === "draft";
  const isTrainer = role === "trainer";
  const isStudent = role === "student";

  const isEnrolled =
    course?.isEnrolled === true || course?.isPurchased === true;


  // ================= DEBUG LOGS =================
  console.group("🧪 CourseCard DEBUG");
  console.log("Course ID:", course?._id);
  console.log("Course status:", status);
  console.log("User role:", role);
  console.log("course.isEnrolled:", course?.isEnrolled);
  console.log("course.isPurchased:", course?.isPurchased);
  console.log("FINAL isEnrolled:", isEnrolled);
  console.log("isDraft:", isDraft);
  console.log("isTrainer:", isTrainer);
  console.log("isStudent:", isStudent);
  console.groupEnd();
  // =============================================

  // ===== DEFAULT BUTTON (STUDENT NOT ENROLLED) =====
  let buttonLabel = "Buy Now";
  let buttonAction = () => navigate(`/student/checkout/${course._id}`);
  let buttonClass = "bg-green-500 text-white";

  // ===== TRAINER FLOW =====
  if (isTrainer) {
    console.log("👨‍🏫 Trainer view detected");
    if (isDraft) {
      buttonLabel = "Continue Editing";
    } else {
      buttonLabel = "View Course";
    }
    buttonAction = () =>
      navigate(`/trainer/courses/${course._id}/builder`);
    buttonClass = "bg-blue-500 text-white";
  }

  // ===== STUDENT FLOW =====
  if (isStudent) {
    console.log("🎓 Student view detected");

    if (isEnrolled) {
      console.log("✅ Student is enrolled → Showing Go to Course");
      buttonLabel = "Go to Course";
      buttonAction = () => navigate(`/courses/${course._id}`);
      buttonClass = "bg-blue-500 text-white";
    } else {
      console.log("❌ Student NOT enrolled → Showing Buy Now");
    }
  }

  // ===== BLOCK STUDENT FROM DRAFT COURSES =====
  const disableButton = isStudent && isDraft;

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
          px-2 py-0.5 rounded-full text-white
          ${isDraft ? "bg-yellow-500" : "bg-green-500"}`}
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

        <span>
          {course?.price === 0 ? "Free" : `₹${course?.price}`}
        </span>
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={buttonAction}
        disabled={disableButton}
        className={`mt-3 w-full text-xs font-medium py-2 rounded-lg
        ${disableButton ? "opacity-50 cursor-not-allowed" : buttonClass}`}
      >
        {disableButton ? "Unavailable" : buttonLabel}
      </button>
    </div>
  );
};

export default CourseCard;
