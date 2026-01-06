
import { FiClock, FiVideo, FiEdit, FiFileText } from "react-icons/fi";

const scheduleData = [
  {
    id: 1,
    title: "React Live Class",
    time: "10:00 AM",
    type: "Live Class",
    icon: <FiVideo />,
  },
  {
    id: 2,
    title: "JavaScript Quiz",
    time: "02:00 PM",
    type: "Quiz",
    icon: <FiEdit />,
  },
  {
    id: 3,
    title: "Node Assignment Deadline",
    time: "11:59 PM",
    type: "Assignment",
    icon: <FiFileText />,
  },
];

const SchedulePage = () => {
  return (
      <div className="space-y-4">

        {/* Page Title */}
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Schedule
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Today’s learning activities
          </p>
        </div>

        {/* Schedule Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scheduleData.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#1f2337]
                rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Top */}
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg
                                bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  {item.icon}
                </div>

                <span className="text-xs px-2 py-1 rounded-full
                  bg-[#dbfce7] text-green-700 dark:bg-green-500/20 dark:text-green-400">
                  {item.type}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-sm leading-snug mb-3 text-gray-900 dark:text-white">
                {item.title}
              </h3>

              {/* Time */}
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <FiClock /> {item.time}
              </div>

              {/* Action */}
              <div className="mt-4 flex justify-end">
                <button className="text-xs font-medium px-3 py-1 rounded-lg
                  bg-blue-600 text-white hover:bg-blue-700 transition">
                  {item.type === "Live Class" ? "Join" : "View"}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
  );
};

export default SchedulePage;
