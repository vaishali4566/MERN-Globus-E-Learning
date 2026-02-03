import { getSocket } from "./socket";

export const sendMessage = ({ receiverId, message }) => {
  const socket = getSocket();
  socket?.emit("send_message", { receiverId, message });
};
