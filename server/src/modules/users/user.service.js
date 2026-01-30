import User from "../auth/auth.model.js";

// Get all users or filter by role
export const getUsersService = async (role) => {
  const filter = role ? { role } : {};
  return await User.find(filter).select("-password"); // password hide
};