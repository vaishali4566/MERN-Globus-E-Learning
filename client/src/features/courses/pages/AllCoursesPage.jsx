import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard"; // path to your CourseCard
import { getAllCourses } from "../services/courseService"; // ✅ use the service

export default function AllCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await getAllCourses(); // ✅ use service
        if (!isMounted) return;
        setCourses(res.data || []); // service returns { success, data: [...] }
      } catch (err) {
        if (!isMounted) return;
        setError(err.response?.data?.message || "Failed to load courses");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p className="text-center mt-10">Loading courses...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!courses.length)
    return <p className="text-center mt-10 text-gray-500">No courses available</p>;

  return (
    <div >
      <h2 className="text-2xl font-semibold mb-6">All Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}
