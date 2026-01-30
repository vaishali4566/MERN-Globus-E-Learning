import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { Server } from "socket.io";
import registerChatSocket from "./modules/chat/chat.socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1️⃣ Connect to Database
    await connectDB();
    console.log("✅ Database connected");

    // 2️⃣ Create HTTP server from Express app
    const server = http.createServer(app);

    // 3️⃣ Create Socket.io server
    const io = new Server(server, {
      cors: {
        origin: "*", // later replace with frontend URL
        methods: ["GET", "POST"],
      },
    });

    // 4️⃣ Register chat socket logic
    registerChatSocket(io);

    // 5️⃣ Start listening
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start", error);
    process.exit(1);
  }
};

startServer();
