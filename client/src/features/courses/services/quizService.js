import api from "@/services/api";

export const createQuiz = async (quizData) => {
  try {
    const response = await api.post("/quizzes", quizData);
    console.log("Quiz created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating quiz:",
      error.response?.data || error.message
    );
    throw error;
  }
};