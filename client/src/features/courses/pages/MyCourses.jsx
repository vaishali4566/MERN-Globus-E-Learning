import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseCard from "../components/CourseCard";
import {
  getTrainerCourses,
  getStudentCourses,
} from "@/features/courses/services/courseService";

const MyCourses = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "student";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        let res;

        if (role === "trainer") {
          res = await getTrainerCourses();
          setCourses(res?.data || []);
        } else {
          res = await getStudentCourses();

          const enrolledCourses =
            res?.data?.map((enrollment) => {

              return {
                ...enrollment.course, // real course data
                isEnrolled: true,
                progressPercentage: enrollment.progressPercentage,
                status: "active", 
              };
            }) || [];

          setCourses(enrolledCourses);
        }
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [role]);

  return (
    <div className="space-y-4">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-start">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          My Courses
        </h1>

        {role === "trainer" && (
          <button
            onClick={() => navigate("/trainer/courses/create")}
            className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Course
          </button>
        )}
      </div>

      {loading && <p className="text-sm text-gray-500">Loading courses...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && courses.length === 0 && (
        <p className="text-sm text-gray-500">
          {role === "trainer"
            ? "You haven't created any courses yet."
            : "You are not enrolled in any courses yet."}
        </p>
      )}

      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} role={role} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
