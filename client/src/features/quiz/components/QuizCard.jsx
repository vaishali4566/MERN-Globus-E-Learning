import { FiClock, FiPlay, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const statusBadge = {
  passed: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
};

const QuizCard = ({
  id,
  title,
  category,
  time,
  questions,
  completed,
  score = 0,
  passMarks = 0,
  totalMarks = 0,
}) => {
  const navigate = useNavigate();

  const isPassed = score >= passMarks;
  const percentage =
    totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;

  return (
    <div className="bg-white dark:bg-[#1f2337] rounded-xl p-5 shadow-sm hover:shadow-md transition">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h4>
        <span className="text-xs text-gray-400">
          {category}
        </span>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <FiClock size={14} />
          {time || "N/A"} min
        </div>
        <div>
          Marks • {totalMarks || questions}
        </div>
      </div>

      

      {/* Footer */}
      <div className="flex justify-between items-center">
        {completed ? (
          <div className="flex items-center gap-1 text-xs font-medium">
            {isPassed ? (
              <span className="flex items-center gap-1 text-green-600">
                <FiCheckCircle size={14} />
                {score}/{totalMarks} ({percentage}%)
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-600">
                <FiAlertCircle size={14} />
                {score}/{totalMarks} ({percentage}%)
              </span>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate(`/student/courses/quiz/${id}`)}
            className="
              px-6 py-2 text-sm font-medium rounded-md
              bg-blue-500 cursor-pointer hover:scale-102
              text-white shadow-sm transition
            "
          >
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
