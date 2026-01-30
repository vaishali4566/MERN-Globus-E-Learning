import socketAuth from "../../middlewares/socketAuth.js";
import Chat from "./chat.model.js"; // Chat model
import FriendRequest from "../friendRequest/FriendRequest.model.js"; 

const onlineUsers = new Map(); // userId => socketId

const registerChatSocket = (io) => {
  // 1️⃣ Authenticate socket
  io.use(socketAuth);

  io.on("connection", (socket) => {
    const { userId } = socket.user;
    console.log("🟢 User connected:", userId);

    // 2️⃣ Add to online users
    onlineUsers.set(userId, socket.id);

    // 3️⃣ Broadcast online users
    io.emit("online_users", Array.from(onlineUsers.keys()));

    // ========================
    // 4️⃣ Real-time Chat
    // ========================
    socket.on("send_message", async ({ receiverId, message }) => {
      try {
        if (!receiverId || !message) return;

        // Save message in DB
        const newMessage = await Chat.create({ sender: userId, receiver: receiverId, message });

        // Send to receiver if online
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) io.to(receiverSocketId).emit("receive_message", newMessage);

        // Acknowledge sender
        socket.emit("message_sent", newMessage);
      } catch (err) {
        console.error("Chat error:", err);
        socket.emit("chat_error", err.message);
      }
    });

    // ========================
    // 5️⃣ Real-time Friend Requests
    // ========================
    // Send friend request
    socket.on("send_friend_request", async ({ receiverId }) => {
      try {
        if (!receiverId) return;

        // Check if already exists
        const exist = await FriendRequest.findOne({ sender: userId, receiver: receiverId });
        if (exist) return socket.emit("friend_request_error", "Request already sent");

        // Create friend request
        const request = await FriendRequest.create({ sender: userId, receiver: receiverId });

        // Notify receiver if online
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) io.to(receiverSocketId).emit("friend_request_received", request);

        // Notify sender
        socket.emit("friend_request_sent", request);
      } catch (err) {
        console.error("Friend request error:", err);
        socket.emit("friend_request_error", err.message);
      }
    });

    // Accept / Reject friend request
    socket.on("update_friend_request", async ({ requestId, status }) => {
      try {
        if (!["accepted", "rejected"].includes(status)) return;

        const request = await FriendRequest.findById(requestId);
        if (!request) return socket.emit("friend_request_error", "Request not found");

        request.status = status;
        await request.save();

        // Notify sender of update
        const senderSocketId = onlineUsers.get(request.sender.toString());
        if (senderSocketId) io.to(senderSocketId).emit("friend_request_updated", request);

        // Notify receiver (current user)
        socket.emit("friend_request_action_done", request);
      } catch (err) {
        console.error("Friend request update error:", err);
        socket.emit("friend_request_error", err.message);
      }
    });

    // ========================
    // 6️⃣ Disconnect
    // ========================
    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      console.log("🔴 User disconnected:", userId);
      io.emit("online_users", Array.from(onlineUsers.keys()));
    });
  });
};

export default registerChatSocket;
