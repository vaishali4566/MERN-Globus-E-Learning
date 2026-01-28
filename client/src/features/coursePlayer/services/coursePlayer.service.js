import api from "../../../services/api"

/**
 * Get full course player data
 */
export const getCoursePlayerData = async (courseId) => {
  const res = await api.get(`/courses/${courseId}/player`);
  console.log(res)
  return res.data.data;
};

/**
 * (future) get single lesson detail
 */
export const getLessonById = async (lessonId) => {
  const res = await api.get(`/lessons/${lessonId}`);
  return res.data.data;
};
