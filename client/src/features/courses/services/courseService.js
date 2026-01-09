import api from "../../../services/api"

// ✅ Create a new course
export const createCourse = async (courseData) => {
  try {
    const response = await api.post("/courses", courseData);
    return response.data; // backend se jo JSON aayega
  } catch (error) {
    console.error("Error creating course:", error.response || error);
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
  // Agar backend me create draft aur update draft same endpoint se hota hai
  if (courseData._id) {
    return await updateCourse(courseData._id, courseData);
  } else {
    return await createCourse(courseData);
  }
};
