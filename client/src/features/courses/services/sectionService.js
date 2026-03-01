import api from "@/services/api";

export const createSection = async (courseId, sectionData) => {
  try {
    const response = await api.post("/sections", {
      courseId,
      ...sectionData,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating section:", error.response || error);
    throw error;
  }
};
