import { FiTrendingUp, FiCheckCircle, FiClock, FiBook } from "react-icons/fi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const LearningProgress = () => {
  const progressSummary = {
    overall: 68,
    completed: 18,
    inProgress: 6,
    hoursSpent: 42,
  };

  const courseProgress = [
    {
      id: 1,
      title: "Complete MERN Stack Course",
      progress: 75,
    },
    {
      id: 2,
      title: "Advanced JavaScript Mastery",
      progress: 48,
    },
    {
      id: 3,
      title: "React Performance Optimization",
      progress: 30,
    },
  ];

  return (
    <div className="space-y-6">

      {/* ===== Page Header ===== */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Learning Progress
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Track your learning activity and course completion
        </p>
      </div>

      {/* ===== Summary Cards ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <SummaryCard
          icon={<FiTrendingUp />}
          label="Overall Progress"
          value={`${progressSummary.overall}%`}
        />

        <SummaryCard
          icon={<FiCheckCircle />}
          label="Completed Lessons"
          value={progressSummary.completed}
        />

        <SummaryCard
          icon={<FiBook />}
          label="In Progress"
          value={progressSummary.inProgress}
        />

        <SummaryCard
          icon={<FiClock />}
          label="Hours Spent"
          value={`${progressSummary.hoursSpent}h`}
        />
      </div>

      {/* ===== Overall Progress ===== */}
      <div className="bg-white dark:bg-[#1f2337] rounded-xl shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Overall Completion
        </h2>

        <div className="flex items-center gap-6">
          <div className="w-28 h-28">
            <CircularProgressbar
              value={progressSummary.overall}
              text={`${progressSummary.overall}%`}
              styles={buildStyles({
                textSize: "18px",
                pathColor: "#2563eb",
                textColor: "#3b82f6",
                trailColor: "#e5e7eb",
              })}
            />
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            You’ve completed {progressSummary.completed} lessons so far.
            Keep going to reach your learning goals.
          </p>
        </div>
      </div>

      {/* ===== Course Progress ===== */}
      <div className="bg-white dark:bg-[#1f2337] rounded-xl shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Course-wise Progress
        </h2>

        <div className="space-y-4">
          {courseProgress.map((course) => (
            <div key={course.id} className="space-y-1">

              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  {course.title}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {course.progress}%
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 dark:bg-[#515268] rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LearningProgress;

/* ===== Summary Card Component ===== */
const SummaryCard = ({ icon, label, value }) => {
  return (
    <div
      className="bg-white dark:bg-[#1f2337]
      rounded-xl shadow-sm p-4 flex items-center gap-3"
    >
      <div className="text-blue-600 dark:text-blue-400 text-lg">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="text-base font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
};
