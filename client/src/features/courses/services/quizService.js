import api from "@/services/api";

// 🔹 Create Quiz
export const createQuiz = async (quizData) => {
  try {
    const response = await api.post("/quizzes", quizData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 🔹 Create Question (QSN)
export const createQuestion = async (quizId, questionData) => {
  try {
    const response = await api.post(`/quizzes/${quizId}/questions`, questionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 🔹 Publish Course
export const publishCourse = async (courseId) => {
  try {
    const response = await api.patch(`/courses/${courseId}/publish`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
