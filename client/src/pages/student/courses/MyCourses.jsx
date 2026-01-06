import DashboardLayout from "../../../components/layout/DashboardLayout";
import CourseCard from "./CourseCard";

const MyCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Complete MERN Stack Course",
      description: "Learn MERN stack from scratch with real-world projects.",
      thumbnail: "/assets/images/course/course1.webp",
      instructor: "Vaishali",
      enrolledDate: "12 Jan 2025",
    },
    {
      id: 2,
      title: "Advanced JavaScript Mastery",
      description: "Deep dive into closures, async JS, and performance.",
      thumbnail: "/assets/images/course/course2.webp",
      instructor: "Roberts",
      enrolledDate: "20 Feb 2025",
    },
    {
      id: 3,
      title: "React Performance Optimization",
      description: "Build fast and scalable React applications.",
      thumbnail: "/assets/images/course/course3.webp",
      instructor: "John Doe",
      enrolledDate: "05 Mar 2025",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* ===== Page Header ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Courses
            </h1>
            <nav className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              <ol className="flex items-center gap-2">
                <li>
                  <a
                    href="/student/dashboard"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Dashboard
                  </a>
                </li>
                <li>/</li>
                <li className="text-gray-700 dark:text-gray-300">
                  My Courses
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* ===== Courses Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* ===== Pagination ===== */}
        <div className="flex justify-center">
          <ul className="flex items-center gap-2 text-sm">
            <li>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-darkHover">
                «
              </button>
            </li>
            <li>
              <button className="px-3 py-1 border rounded-md bg-blue-600 text-white border-blue-600">
                1
              </button>
            </li>
            <li>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-darkHover">
                2
              </button>
            </li>
            <li>
              <button className="px-3 py-1 border rounded-md hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-darkHover">
                »
              </button>
            </li>
          </ul>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default MyCourses;
