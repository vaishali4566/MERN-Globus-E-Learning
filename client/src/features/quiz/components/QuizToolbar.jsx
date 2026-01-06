import { FiSearch } from "react-icons/fi";

const QuizToolbar = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold">Active Quizzes</h2>

      <div className="flex gap-3">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
          <input
            placeholder="Search here"
            className="pl-9 pr-3 py-2 rounded-full text-sm
              bg-gray-100 dark:bg-[#1f2035]
              border border-gray-200 dark:border-white/10
              focus:outline-none"
          />
        </div>

        {/* Filter */}
        <select
          className="rounded-full px-4 py-2 text-sm
            bg-gray-100 dark:bg-[#1f2035]
            border border-gray-200 dark:border-white/10"
        >
          <option>All</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advance</option>
        </select>
      </div>
    </div>
  );
};

export default QuizToolbar;
