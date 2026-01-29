import api from "@/services/api";

export const createAssignment = async (assignmentData) => {
  try {
    const response = await api.post("/assignments", assignmentData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating assignment:",
      error.response?.data || error.message
    );
    throw error;
  }
};
