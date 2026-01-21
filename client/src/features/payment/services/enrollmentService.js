import api from "../../../services/api";

// ✅ Enroll student in a course (fake payment)
export const enrollCourse = async (courseId) => {
  try {
    const response = await api.post(`/enrollments/${courseId}`);
    return response.data; // { success, message, data: enrollment }
  } catch (error) {
    console.error("Error enrolling course:", error.response || error);
    throw error;
  }
};

// ✅ Get student's enrollments
export const getMyEnrollments = async () => {
  try {
    const response = await api.get("/enrollments/my");
    return response.data; // { success, count, data: [enrollments] }
  } catch (error) {
    console.error("Error fetching enrollments:", error.response || error);
    throw error;
  }
};
