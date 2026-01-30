import { sendFriendRequestService, updateFriendRequestService } from "./friendRequest.service.js";

const registerFriendRequestSocket = (io, onlineUsers) => {
  io.on("connection", (socket) => {
    const { userId } = socket.user;

    // 1️⃣ Send friend request
    socket.on("send_friend_request", async ({ receiverId }) => {
      try {
        const request = await sendFriendRequestService(userId, receiverId);

        // Notify receiver in real-time
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("friend_request_received", request);
        }

        // Optional: notify sender
        socket.emit("friend_request_sent", request);

      } catch (err) {
        socket.emit("friend_request_error", err.message);
      }
    });

    // 2️⃣ Accept / Reject friend request
    socket.on("update_friend_request", async ({ requestId, status }) => {
      try {
        const updated = await updateFriendRequestService(requestId, status);

        // Notify sender of request
        const senderSocketId = onlineUsers.get(updated.sender.toString());
        if (senderSocketId) {
          io.to(senderSocketId).emit("friend_request_updated", updated);
        }

        // Optional: notify receiver (who did the action)
        socket.emit("friend_request_action_done", updated);

      } catch (err) {
        socket.emit("friend_request_error", err.message);
      }
    });
  });
};

export default registerFriendRequestSocket;
