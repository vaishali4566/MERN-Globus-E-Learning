import React, { useEffect, useState } from "react";
import FriendList from "@/features/chat/components/FriendList";
import ChatUI from "@/features/chat/components/ChatUI";
import { connectSocket, getSocket } from "@/features/chat/ChatSocket";
import { getUserAvatar } from "@/utils/getUserAvatar";

// ⚠️ abhi mock friends
const mockFriends = [
  { id: "u1", name: "Alice Johnson", avatar: getUserAvatar() },
  { id: "u2", name: "Bob Smith", avatar: getUserAvatar() },
];

const ChatLayout = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState(mockFriends);

  // 🔌 SOCKET CONNECTION + LISTENERS
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const socket = connectSocket(token);

    // 📩 Receive message
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          text: msg.message,
          fromMe: false,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    // 📤 Sender ack
    socket.on("message_sent", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          text: msg.message,
          fromMe: true,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    return () => socket.disconnect();
  }, []);

  // 🧑‍🤝‍🧑 Select chat friend
  const handleSelect = (friend) => {
    setSelectedFriend(friend);
    setMessages([]); // baad me yahan history API
  };

  // 📤 Send message
  const handleSend = (text) => {
    if (!selectedFriend) return;

    const socket = getSocket();

    socket.emit("send_message", {
      receiverId: selectedFriend.id,
      message: text,
    });
  };

  return (
    <div className="h-screen dark:bg-[#26283e] flex">
      {/* LEFT */}
      <aside className="w-96 border-r border-gray-100 dark:border-[#222436] overflow-y-auto">
        <div className="space-y-6">
          <FriendList friends={friends} onSelect={handleSelect} />
        </div>
      </aside>

      {/* RIGHT */}
      <main className="flex-1 overflow-y-auto px-6">
        <div className="bg-gray-100 dark:bg-[#1f2337] rounded-xl shadow-sm p-6 h-[calc(100vh-96px)]">
          <ChatUI
            selectedFriend={selectedFriend}
            messages={messages}
            onSend={handleSend}
          />
        </div>
      </main>
    </div>
  );
};

export default ChatLayout;
