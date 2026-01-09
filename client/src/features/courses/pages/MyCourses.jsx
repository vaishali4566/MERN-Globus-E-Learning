import CourseCard from "../components/CourseCard";
import { getUserRole } from "@/utils/getUser";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const role = getUserRole();
  const navigate =  useNavigate();

  const courses = [
    {
      id: 1,
      title: "Complete MERN Stack Course",
      description: "Learn MERN stack from scratch with real-world projects.",
      thumbnail: "/assets/images/course/course1.webp",
      instructor: "Vaishali",
      enrolledDate: "12 Jan 2025",
      isEnrolled: true,
    },
    {
      id: 2,
      title: "Advanced JavaScript Mastery",
      description: "Deep dive into closures, async JS, and performance.",
      thumbnail: "/assets/images/course/course2.webp",
      instructor: "Roberts",
      enrolledDate: "20 Feb 2025",
      isEnrolled: true,
    },
    {
      id: 3,
      title: "React Performance Optimization",
      description: "Build fast and scalable React applications.",
      thumbnail: "/assets/images/course/course3.webp",
      instructor: "John Doe",
      enrolledDate: "05 Mar 2025",
      isEnrolled: true,
    },
  ];

  return (
    <div className="space-y-4">

      {/* ===== Page Header ===== */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            My Courses
          </h1>
          
        </div>

        {/* ===== Create Course Button for Trainers ===== */}
        {role === "trainer" && (
          <button onClick={()=> navigate("/trainer/courses/create")}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create Course
          </button>
        )}
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
          <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-[#515268] hover:bg-gray-100 dark:hover:bg-[#1f2337] transition">
            «
          </button>

          <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
            1
          </button>

          <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-[#515268] hover:bg-gray-100 dark:hover:bg-[#1f2337] transition">
            2
          </button>

          <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-[#515268] hover:bg-gray-100 dark:hover:bg-[#1f2337] transition">
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
