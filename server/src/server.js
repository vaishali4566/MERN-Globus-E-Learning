import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { Server } from "socket.io";
import registerChatSocket from "./modules/chat/chat.socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const ENABLE_SOCKET = process.env.ENABLE_SOCKET === "true";

const startServer = async () => {
  try {
    // 1️⃣ Connect to Database
    await connectDB();
    console.log("✅ Database connected");

    // 2️⃣ Create HTTP server from Express app
    const server = http.createServer(app);

    // 3️⃣ Conditionally start socket.io (DEV only)
    if (ENABLE_SOCKET) {
      console.log("🟢 Socket.io enabled (dev mode)");

      const io = new Server(server, {
        cors: {
          origin: "*", // replace later with frontend URL
          methods: ["GET", "POST"],
        },
      });

      // 4️⃣ Register chat socket logic
      registerChatSocket(io);
    } else {
      console.log("🟡 Socket.io disabled (prod / Vercel)");
    }

    // 5️⃣ Start server ONLY in non-Vercel environment
    if (process.env.NODE_ENV !== "production") {
      server.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    }

  } catch (error) {
    console.error("❌ Server failed to start", error);
    process.exit(1);
  }
};

startServer();
