import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  FiBookOpen,
  FiCheckCircle,
  FiCalendar,
  FiBell,
  FiPlayCircle,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Mock Data
const courses = [
  { id: 1, title: "React for Beginners", instructor: "Jane Doe", progress: 75 },
  {
    id: 2,
    title: "Advanced JavaScript",
    instructor: "John Smith",
    progress: 40,
  },
  { id: 3, title: "Node.js & Express", instructor: "Mary Lee", progress: 20 },
];

const assignments = [
  { id: 1, title: "React Project Submission", due: "2026-01-10" },
  { id: 2, title: "JavaScript Quiz", due: "2026-01-08" },
];

const events = [
  {
    id: 1,
    title: "React Live Class",
    time: "10:00 AM",
    instructor: "Jane Doe",
  },
  {
    id: 2,
    title: "JavaScript Quiz",
    time: "2:00 PM",
    instructor: "John Smith",
  },
];

const notifications = [
  { id: 1, message: "Your assignment has been graded." },
  { id: 2, message: "New course available: TypeScript Mastery." },
];

const recentActivities = [
  { id: 1, activity: "Completed React Component Task", time: "1h ago" },
  { id: 2, activity: "Joined Live JS Class", time: "3h ago" },
];

const recommendedCourses = [
  { id: 1, title: "TypeScript for Beginners", instructor: "Alice Cooper" },
  { id: 2, title: "Fullstack MERN Bootcamp", instructor: "Bob Marley" },
];

const leaderboard = [
  { id: 1, name: "Jane Doe", progress: 95 },
  { id: 2, name: "Robert Brown", progress: 80 },
  { id: 3, name: "John Smith", progress: 70 },
];
const StudentDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ===== Dashboard Header ===== */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Good Morning, Robert!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Here's your learning progress today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-[#1f2337] rounded-lg p-4 shadow flex items-center gap-3">
              <FiBookOpen className="text-blue-600 dark:text-blue-400 w-6 h-6" />
              <div>
                <p className="text-gray-900 dark:text-white font-semibold">3</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Courses Enrolled
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1f2337] rounded-lg p-4 shadow flex items-center gap-3">
              <FiCheckCircle className="text-green-500 w-6 h-6" />
              <div>
                <p className="text-gray-900 dark:text-white font-semibold">
                  12
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Tasks Completed
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1f2337] rounded-lg p-4 shadow flex items-center gap-3">
              <FiAward className="text-yellow-500 w-6 h-6" />
              <div>
                <p className="text-gray-900 dark:text-white font-semibold">5</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Certificates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Quick Actions ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Start New Course", icon: <FiPlayCircle />, bg: "blue" },
            { label: "Join Live Class", icon: <FiCalendar />, bg: "green" },
            { label: "Check Notifications", icon: <FiBell />, bg: "yellow" },
            { label: "View Certificates", icon: <FiAward />, bg: "purple" },
          ].map((action, idx) => (
            <div
              key={idx}
              className={`bg-white dark:bg-[#1f2337] rounded-lg shadow p-4 flex items-center gap-3 hover:shadow-lg transition cursor-pointer`}
            >
              <span
                className={`text-${action.bg}-600 dark:text-${action.bg}-400 w-6 h-6`}
              >
                {action.icon}
              </span>
              <p className="text-gray-900 dark:text-white font-medium">
                {action.label}
              </p>
            </div>
          ))}
        </div>

        {/* ===== Courses Section ===== */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Your Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-[#1f2337] p-4 rounded-lg shadow hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-gray-900 dark:text-white font-semibold">
                    {course.title}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {course.instructor}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16">
                    <CircularProgressbar
                      value={course.progress}
                      text={`${course.progress}%`}
                      styles={buildStyles({
                        textSize: "28px",
                        pathColor: `#316AFF`,
                        textColor: "#000",
                        trailColor: "#d6d6d6",
                      })}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Progress
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-[#1f2337] h-2 rounded-full mt-1">
                      <div
                        className="bg-blue-600 dark:bg-[#1f2337] h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Upcoming + Notifications + Activities ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="bg-white dark:bg-[#1f2337] rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Upcoming Events
            </h2>
            <ul className="space-y-3">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#272941] transition"
                >
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {event.title}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {event.time} - {event.instructor}
                    </p>
                  </div>
                  <FiCalendar className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                </li>
              ))}
            </ul>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-[#1f2337] rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Notifications
            </h2>
            <ul className="space-y-3">
              {notifications.map((note) => (
                <li
                  key={note.id}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#272941] transition"
                >
                  <FiBell className="text-yellow-500 w-5 h-5" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {note.message}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-[#1f2337] rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activities
            </h2>
            <ul className="space-y-2">
              {recentActivities.map((act) => (
                <li
                  key={act.id}
                  className="text-gray-700 dark:text-gray-300 text-sm hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
                >
                  {act.activity}{" "}
                  <span className="text-gray-400 dark:text-gray-500 text-xs">
                    ({act.time})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== Recommended Courses ===== */}
        <div>
          <h2 className="text-lg font-semibold  text-gray-900 dark:text-white mb-4">
            Recommended Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-[#1f2337] p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              >
                <h3 className="text-gray-900 dark:text-white font-medium">
                  {course.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {course.instructor}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* ===== Learning Streak ===== */}
        <div className="bg-white dark:bg-[#1f2337] rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Learning Streak
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
            You've been learning 7 days in a row!
          </p>
          <div className="w-full h-3 bg-gray-200 dark:bg-[#1f2337] rounded-full">
            <div className="h-3 bg-blue-600 dark:bg-[#1f2337] rounded-full w-[70%]"></div>
          </div>
        </div>

        {/* ===== Leaderboard / Peer Comparison ===== */}
        <div className="bg-white dark:bg-[#1f2337] rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Leaderboard
          </h2>
          <ul className="space-y-2">
            {leaderboard.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#272941] transition"
              >
                <p className="text-gray-900 dark:text-white font-medium">
                  {user.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {user.progress}%
                  </span>
                  <FiTrendingUp className="text-green-500 w-5 h-5" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Assignments / Deadlines ===== */}
        <div className="bg-white dark:bg-[#1f2337] rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Assignments / Deadlines
          </h2>
          <ul className="space-y-2">
            {assignments.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#272941] transition"
              >
                <p className="text-gray-900 dark:text-white font-medium">
                  {task.title}
                </p>
                <span className="text-gray-500 dark:text-gray-400 dsrk text-sm">
                  {task.due}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Footer / Help Links ===== */}
        <div className="bg-white dark:bg-[#1f2337] rounded-lg shadow p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          Need help?{" "}
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Contact Support
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;


// Node.js Complete Course
//  └── Section 1: Node.js Fundamentals
//       └── Lesson 1: Introduction to Node.js
//            ├── 🎥 Video: What is Node.js?
//            ├── 📄 PDF: Node.js Overview Notes
//            ├── 🧪 Quiz: Node.js Basics Quiz
//            ├── 📝 Assignment: Install Node & Run First Script

//       └── Lesson 2: Node.js Architecture
//            ├── 🎥 Video: Event Loop & Non-Blocking I/O
//            ├── 📄 PDF: Event Loop Explained
//            ├── 🧪 Quiz: Event Loop MCQs
//            ├── 📝 Assignment: Explain Event Loop (Text)

//  └── Section 2: Core Node.js Modules
//       └── Lesson 3: fs Module
//            ├── 🎥 Video: File System Module
//            ├── 📄 PDF: fs Module Methods
//            ├── 🧪 Quiz: fs MCQs
//            ├── 📝 Assignment: Build File CRUD App

//       └── Lesson 4: Path & OS Modules
//            ├── 🎥 Video: path & os Modules
//            ├── 📄 PDF: Path & OS Cheatsheet
//            ├── 🧪 Quiz: Core Modules Quiz
//            ├── 📝 Assignment: System Info Script

//  └── Section 3: Node.js with npm
//       └── Lesson 5: npm & Packages
//            ├── 🎥 Video: npm & package.json
//            ├── 📄 PDF: npm Commands Guide
//            ├── 🧪 Quiz: npm Basics
//            ├── 📝 Assignment: Create & Publish Package

//  └── Section 4: Express.js Framework
//       └── Lesson 6: Express Basics
//            ├── 🎥 Video: Express Setup & Routing
//            ├── 📄 PDF: Express Routing Notes
//            ├── 🧪 Quiz: Routing Quiz
//            ├── 📝 Assignment: REST API (Users)

//       └── Lesson 7: Middleware
//            ├── 🎥 Video: Middleware Explained
//            ├── 📄 PDF: Types of Middleware
//            ├── 🧪 Quiz: Middleware MCQs
//            ├── 📝 Assignment: Auth Middleware

//  └── Section 5: Database Integration
//       └── Lesson 8: MongoDB with Mongoose
//            ├── 🎥 Video: Mongoose Models
//            ├── 📄 PDF: Schema Design Guide
//            ├── 🧪 Quiz: MongoDB Basics
//            ├── 📝 Assignment: CRUD API with MongoDB

//  └── Section 6: Authentication & Security
//       └── Lesson 9: JWT Authentication
//            ├── 🎥 Video: JWT Flow
//            ├── 📄 PDF: Auth Best Practices
//            ├── 🧪 Quiz: Auth Quiz
//            ├── 📝 Assignment: Login / Signup API

//  └── Section 7: Advanced Concepts
//       └── Lesson 10: Error Handling
//            ├── 🎥 Video: Central Error Handling
//            ├── 📄 PDF: Error Patterns
//            ├── 🧪 Quiz: Error Handling MCQs
//            ├── 📝 Assignment: Global Error Middleware

//  └── Section 8: Performance & Production
//       └── Lesson 11: Logging & Monitoring
//            ├── 🎥 Video: Winston & Morgan
//            ├── 📄 PDF: Logging Setup Guide
//            ├── 🧪 Quiz: Production Readiness
//            ├── 📝 Assignment: Add Logging System

//  └── Section 9: Deployment
//       └── Lesson 12: Deploy Node App
//            ├── 🎥 Video: Deploy on VPS / Render
//            ├── 📄 PDF: Deployment Checklist
//            ├── 🧪 Quiz: Deployment Quiz
//            ├── 📝 Assignment: Deploy Live API
