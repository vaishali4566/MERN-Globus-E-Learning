import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseCard from "../components/CourseCard";
import { getMyCourses } from "@/features/courses/services/courseService";
import { getUserRole } from "@/utils/getUser";

const MyCourses = () => {
  const role = getUserRole();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        const res = await getMyCourses(); // ✅ API call
        setCourses(res?.data || []);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="space-y-4">
      {/* ===== Page Header ===== */}
      <div className="flex justify-between items-start">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          My Courses
        </h1>

        {/* Create Course – Trainer only */}
        {role === "trainer" && (
          <button
            onClick={() => navigate("/trainer/courses/create")}
            className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition"
          >
            Create Course
          </button>
        )}
      </div>

      {/* ===== Loading ===== */}
      {loading && (
        <p className="text-sm text-gray-500">Loading courses...</p>
      )}

      {/* ===== Error ===== */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* ===== Empty State ===== */}
      {!loading && courses.length === 0 && (
        <div className="text-sm text-gray-500 mt-6">
          No courses found.
        </div>
      )}

      {/* ===== Courses Grid ===== */}
      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}

      {/* ===== Pagination (future ready) ===== */}
      {/* Backend pagination lagane ke baad yahan wire karenge */}
    </div>
  );
};

export default MyCourses;
