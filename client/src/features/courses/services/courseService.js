import api from "../../../services/api"

// ✅ Create a new course
export const createCourse = async (courseData) => {
  const formData = new FormData();

  Object.entries(courseData).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      formData.append(key, value);
    }
  });

  const response = await api.post("/courses", formData);
  return response.data;
};


// ✅ Get course by ID (Builder / Edit)
export const getCourseById = async (courseId) => {
  try {
    const response = await api.get(`/courses/${courseId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course:", error.response || error);
    throw error;
  }
};

// ✅ Update existing course
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await api.put(`/courses/${courseId}`, courseData);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error.response || error);
    throw error;
  }
};

// ✅ Publish course
export const publishCourse = async (courseId) => {
  try {
    const response = await api.patch(`/courses/${courseId}/publish`);
    return response.data;
  } catch (error) {
    console.error("Error publishing course:", error.response || error);
    throw error;
  }
};

// ✅ Save draft
export const saveDraft = async (courseData) => {
  if (courseData._id) {
    return await updateCourse(courseData._id, courseData);
  } else {
    return await createCourse(courseData);
  }
};

// ✅ Get logged-in trainer's courses
export const getMyCourses = async () => {
  try {
    const response = await api.get("/courses/my-courses");
    return response.data; 
  } catch (error) {
    console.error("Error fetching my courses:", error.response || error);
    throw error;
  }
};

// ✅ Get all published courses (public / student)
export const getAllCourses = async () => {
  try {
    const response = await api.get("/courses");
    return response.data; // { success, count, data: [courses] }
  } catch (error) {
    console.error("Error fetching all courses:", error.response || error);
    throw error;
  }
};