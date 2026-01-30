import api from "@/services/api";

/**
 * Get all courses progress
 */
export const getAllCoursesProgress = async () => {
  const res = await api.get("/progress");
  return res.data.data;
};

/**
 * Get specific course progress
 */
export const getCourseProgress = async (courseId) => {
  const res = await api.get(`/progress/${courseId}`);
  return res.data.data;
};

/**
 * Mark lesson as completed
 */
export const markLessonComplete = async (courseId, lessonId, watchedDuration = 0) => {
  const res = await api.post(`/progress/${courseId}/lesson/${lessonId}/complete`, {
    watchedDuration,
  });
  return res.data.data;
};

/**
 * Update quiz progress with result
 */
export const updateQuizProgress = async (courseId, quizId, score, totalMarks, passed) => {
  const res = await api.post(`/progress/${courseId}/quiz/${quizId}/result`, {
    score,
    totalMarks,
    passed,
  });
  return res.data.data;
};

/**
 * Mark assignment as completed
 */
export const markAssignmentComplete = async (courseId, assignmentId) => {
  const res = await api.post(
    `/progress/${courseId}/assignment/${assignmentId}/complete`,
    {}
  );
  return res.data.data;
};
