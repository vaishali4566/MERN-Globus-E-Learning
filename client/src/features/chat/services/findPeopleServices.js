import api from "@/services/api";

export const getUsers = async (params = {}) => {
  const response = await api.get("/users");
  console.log(response)
  return response.data; // { success, data }
};