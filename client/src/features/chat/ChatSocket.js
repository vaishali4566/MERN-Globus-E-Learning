import { io } from "socket.io-client";

let socket;

export const connectSocket = (token) => {
  // 🔌 Connect with backend
  socket = io("http://localhost:4000", { // backend URL
    auth: { token } // ye tumhare socketAuth middleware me chahiye
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

export const getSocket = () => socket;
