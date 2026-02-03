import User from "../auth/auth.model.js";
import  FriendRequest  from "../friendRequest/FriendRequest.model.js"; 

// Get all users or filter by role
export const getUsersService = async (role, currentUserId) => {
  // 👇 filter by role if provided
  const filter = role ? { role } : {};

  // 👇 fetch all users except current user
  const users = await User.find(filter)
    .select("-password") // hide password
    .lean();

  // 👇 remove current user
  return users.filter(user => user._id.toString() !== currentUserId);
};