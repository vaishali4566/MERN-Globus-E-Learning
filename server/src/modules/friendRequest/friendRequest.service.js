import FriendRequest from "./FriendRequest.model.js";

/**
 * Send friend request
 */
export const sendFriendRequestService = async (senderId, receiverId) => {
  // Already request exist check
  const exist = await FriendRequest.findOne({ sender: senderId, receiver: receiverId });
  if (exist) throw new Error("Request already sent");

  const request = await FriendRequest.create({ sender: senderId, receiver: receiverId });
  return request;
};

/**
 * Update friend request
 */
export const updateFriendRequestService = async (requestId, status) => {
  if (!["accepted", "rejected"].includes(status)) throw new Error("Invalid status");
  const request = await FriendRequest.findById(requestId);
  if (!request) throw new Error("Request not found");
  request.status = status;
  await request.save();
  return request;
};

/**
 * Get all requests for a user
 */
export const getFriendRequestsService = async (userId) => {
  return await FriendRequest.find({
    $or: [{ sender: userId }, { receiver: userId }]
  }).populate("sender", "name role").populate("receiver", "name role").sort({ createdAt: -1 });
};