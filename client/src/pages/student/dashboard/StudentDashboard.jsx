import {
  FiPlay,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";

const StudentDashboard = () => {
  return (
    <div className="space-y-6">

      {/* ===== Greeting ===== */}
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
        Goodmorning, Arun..
      </h1>

      {/* ===== Main Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-8 space-y-6">

          {/* Sneakpeek Class */}
          <div className="bg-white dark:bg-[#1f2337] rounded-xl p-4 shadow flex gap-4">
            <div className="relative w-20 h-20 rounded-lg bg-green-200 flex items-center justify-center">
              <FiPlay className="text-green-700" size={24} />
            </div>

            <div className="flex-1">
              <p className="text-xs text-blue-600 font-medium">
                Physics · 30 mins
              </p>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Sneak peak session – welcome to Globus-E-Learning!
              </h3>
              <p className="text-xs text-gray-500">Kapil Sharma</p>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white dark:bg-[#1f2337] rounded-xl p-5 shadow">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Milestones</h3>
              <span className="text-xs text-blue-600">
                Reach level 7 – Get full course @ ₹75
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500">
              <Milestone label="Watch class" done />
              <Milestone label="Attend" done />
              <Milestone label="Skill Test" locked />
              <Milestone label="Level 2" active />
              <Milestone label="Locked" locked />
            </div>
          </div>

          {/* Upcoming Classes */}
          <div>
            <h3 className="font-semibold mb-3">Upcoming Classes</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#1f2337] rounded-xl p-4 shadow space-y-2"
                >
                  <p className="text-xs text-blue-600">
                    Maths · 40 mins
                  </p>
                  <h4 className="font-semibold text-sm">
                    Concave & convex mirrors
                  </h4>
                  <p className="text-xs text-gray-500">
                    Today · 12:30 pm | Kapil Sharma
                  </p>
                  <button className="text-xs text-red-500">
                    ⏰ Remind me
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Today’s Tasks (NEW) */}
          <div className="bg-white dark:bg-[#1f2337] rounded-xl p-5 shadow">
            <h3 className="font-semibold mb-3">Today’s Tasks</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                Complete Physics Quiz
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-gray-300" />
                Attend Maths Live Class
              </li>
            </ul>
          </div>

          {/* Continue Learning (NEW) */}
          <div className="bg-white dark:bg-[#1f2337] rounded-xl p-5 shadow">
            <h3 className="font-semibold mb-2">Continue Learning</h3>
            <p className="text-sm text-gray-500">
              Last watched: Electric Charges & Fields
            </p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
              Resume Class
            </button>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="lg:col-span-4 space-y-4">

          {/* Performance Card */}
          <div className="bg-blue-100 p-4 rounded-xl">
            <h3 className="font-semibold text-blue-700">
              Wow !!! You’re doing great.
            </h3>
            <p className="text-xs mt-2">
              You have more attendance than 30% of the batch.
            </p>
            <button className="mt-3 bg-orange-500 text-white px-3 py-1.5 rounded-md text-xs">
              Upcoming classes
            </button>
          </div>

          {/* Did You Know */}
          <div className="bg-purple-100 p-4 rounded-xl">
            <h3 className="font-semibold text-purple-700">
              Did you know?
            </h3>
            <p className="text-xs mt-2">
              15 min daily PYQs improves accuracy by 15%.
            </p>
            <button className="mt-3 bg-orange-500 text-white px-3 py-1.5 rounded-md text-xs">
              Previous year papers
            </button>
          </div>

          {/* Congratulations */}
          <div className="bg-green-100 p-4 rounded-xl">
            <h3 className="font-semibold text-green-700">
              Congratulations.
            </h3>
            <p className="text-xs mt-2">
              Free access activated for next 7 days.
            </p>
          </div>

          {/* Learning Streak (NEW) */}
          <div className="bg-white dark:bg-[#1f2337] rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-2">Learning Streak 🔥</h3>
            <p className="text-sm text-gray-500">
              7 days continuous learning
            </p>
          </div>

          {/* Weekly Goal (NEW) */}
          <div className="bg-white dark:bg-[#1f2337] rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-2">Weekly Goal</h3>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full w-[60%]" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              3 of 5 classes attended
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

/* ===== Milestone Component ===== */
const Milestone = ({ label, done, active, locked }) => (
  <div className="flex flex-col items-center gap-1">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs
        ${done && "bg-green-500 text-white"}
        ${active && "bg-gray-300"}
        ${locked && "bg-gray-100 text-gray-400"}
      `}
    >
      {active ? "2" : "✓"}
    </div>
    <span>{label}</span>
  </div>
);
