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
    <div className="space-y-4">

      {/* ===== Page Header ===== */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          My Courses
        </h1>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            Dashboard
          </span>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">My Courses</span>
        </div>
      </div>

      {/* ===== Courses Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* ===== Pagination ===== */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2 text-xs">
          <button className="px-3 py-1 rounded-md border
            border-gray-300 dark:border-[#515268]
            hover:bg-gray-100 dark:hover:bg-[#1f2337] transition">
            «
          </button>

          <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
            1
          </button>

          <button className="px-3 py-1 rounded-md border
            border-gray-300 dark:border-[#515268]
            hover:bg-gray-100 dark:hover:bg-[#1f2337] transition">
            2
          </button>

          <button className="px-3 py-1 rounded-md border
            border-gray-300 dark:border-[#515268]
            hover:bg-gray-100 dark:hover:bg-[#1f2337] transition">
            »
          </button>
        </div>
      </div>

    </div>
  );
};

export default MyCourses;
