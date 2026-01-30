import { FiTrendingUp, FiCheckCircle, FiClock, FiBook } from "react-icons/fi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import { getAllCoursesProgress } from "@/features/progress/services/progressService";

const LearningProgress = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getAllCoursesProgress();
        setCourses(data || []);
      } catch (err) {
        setError(err?.message || "Failed to load progress");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Aggregate summary from courses
  const summary = {
    overall: 0,
    completed: 0,
    inProgress: 0,
    hoursSpent: 0,
  };

  if (courses.length > 0) {
    const totalOverall = courses.reduce((acc, p) => acc + (p.stats?.overallProgress || 0), 0);
    summary.overall = Math.round(totalOverall / courses.length);
    summary.completed = courses.reduce((acc, p) => acc + (p.stats?.completedLessons || 0), 0);
    const totalLessons = courses.reduce((acc, p) => acc + (p.stats?.totalLessons || 0), 0);
    summary.inProgress = totalLessons - summary.completed;
    // server returns totalDuration in minutes
    const totalMinutes = courses.reduce((acc, p) => acc + (p.stats?.totalDuration || 0), 0);
    summary.hoursSpent = Math.round(totalMinutes / 60);
  }

  const courseProgress = courses.map((p) => ({
    id: p.course?._id || p.course,
    title: p.course?.title || "Untitled Course",
    progress: p.stats?.overallProgress || 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Learning Progress
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Track your learning activity and course completion
        </p>
      </div>

      {loading && (
        <div className="text-sm text-gray-500 dark:text-gray-400">Loading progress…</div>
      )}

      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              icon={<FiTrendingUp />}
              label="Overall Progress"
              value={`${summary.overall}%`}
            />

            <SummaryCard
              icon={<FiCheckCircle />}
              label="Completed Lessons"
              value={summary.completed}
            />

            <SummaryCard
              icon={<FiBook />}
              label="In Progress"
              value={summary.inProgress}
            />

            <SummaryCard
              icon={<FiClock />}
              label="Hours Spent"
              value={`${summary.hoursSpent}h`}
            />
          </div>

          <div className="bg-white dark:bg-[#1f2337] rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Overall Completion
            </h2>

            <div className="flex items-center gap-6">
              <div className="w-28 h-28">
                <CircularProgressbar
                  value={summary.overall}
                  text={`${summary.overall}%`}
                  styles={buildStyles({
                    textSize: "18px",
                    pathColor: "#2563eb",
                    textColor: "#3b82f6",
                    trailColor: "#e5e7eb",
                  })}
                />
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                You’ve completed {summary.completed} lessons so far. Keep going to reach your learning goals.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1f2337] rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Course-wise Progress
            </h2>

            <div className="space-y-4">
              {courseProgress.map((course) => (
                <div key={course.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{course.title}</span>
                    <span className="text-gray-500 dark:text-gray-400">{course.progress}%</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 dark:bg-[#515268] rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

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
      <div className="text-blue-500 dark:text-blue-400 text-lg">
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
