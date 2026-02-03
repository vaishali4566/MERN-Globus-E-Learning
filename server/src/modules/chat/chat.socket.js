import socketAuth from "../../middlewares/socketAuth.js";
import Chat from "./chat.model.js"; 
import registerFriendRequestSocket from "../friendRequest/friendRequest.socket.js";

const onlineUsers = new Map(); // userId => socketId

const registerChatSocket = (io) => {
  // 🔐 Authenticate socket
  io.use(socketAuth);

  io.on("connection", (socket) => {
    const { userId } = socket.user;
    console.log("🟢 User connected:", userId);

    // ➕ Add online user
    onlineUsers.set(userId, socket.id);

    // 📡 Broadcast online users
    io.emit("online_users", Array.from(onlineUsers.keys()));

    /* ========================
       💬 CHAT EVENTS
       ======================== */

    socket.on("send_message", async ({ receiverId, message }) => {
      try {
        if (!receiverId || !message) return;

        const newMessage = await Chat.create({
          sender: userId,
          receiver: receiverId,
          message,
        });

        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", newMessage);
        }

        socket.emit("message_sent", newMessage);
      } catch (err) {
        console.error("Chat error:", err);
        socket.emit("chat_error", err.message);
      }
    });

    /* ========================
       🤝 FRIEND REQUEST EVENTS
       ======================== */
    registerFriendRequestSocket(socket, io, onlineUsers);

    /* ========================
       ❌ DISCONNECT
       ======================== */
    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      console.log("🔴 User disconnected:", userId);
      io.emit("online_users", Array.from(onlineUsers.keys()));
    });
  });
};

export default registerChatSocket;