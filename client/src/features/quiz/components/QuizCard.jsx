import { FiClock, FiBarChart2 } from "react-icons/fi";

const QuizCard = ({ icon, category, title, time, questions, level, completed }) => {
  return (
    <div
      className="bg-white dark:bg-[#1f2337]
        rounded-xl p-4 shadow-sm hover:shadow-md transition"
    >
      {/* Top */}
      <div className="flex items-center justify-between mb-3">
        <img src={icon} alt="" className="w-10 h-10" />

        <span className="text-xs text-green-700 px-2 py-1 rounded-full
          bg-[#dbfce7] ">
          {category}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-sm leading-snug mb-3">
        {title}
      </h3>

      {/* Meta */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <FiClock /> {time} min
        </span>

        <span className="flex items-center gap-1">
          <FiBarChart2 /> {questions}
        </span>

        <span>{level}</span>
      </div>

      {/* Completed Badge */}
      {completed && (
        <div className="flex justify-end mt-2">
          <span className="text-green-500 text-xs font-medium">✔ Completed</span>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
