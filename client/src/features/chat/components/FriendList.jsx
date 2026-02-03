import React from "react";
import { getUserAvatar } from "@/utils/getUserAvatar";

const FriendList = ({ friends = [], onSelect }) => {
  return (
    <div className="bg-gray-100 h-210 dark:bg-[#1f2337] rounded-xl shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        Friends
      </h3>

      <div className="space-y-3 overflow-auto" style={{ maxHeight: "60vh" }}>
        {friends.length === 0 && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            No friends yet
          </div>
        )}

        {friends.map((f) => (
          <button
            key={f._id}
            onClick={() => onSelect?.(f)}
            className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1f2337] transition"
          >
            <img
              src={getUserAvatar(f.profilePhoto)}
              alt={f.name}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {f.name}
                </div>

                {f.unreadCount > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {f.unreadCount}
                  </span>
                )}
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-300 truncate">
                {f.lastMessage || "Say hi!"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FriendList;







// 📩 Frontend Message Send Flow (End-to-End)
// 1️⃣ User selects a friend

// User clicks a friend in FriendList

// Frontend calls
// 👉 getOrCreateConversation(friendId)

// Backend returns conversationId

// Frontend stores:

// activeConversationId

// selectedFriend

// 👉 Ab chat context ready hai

// 2️⃣ Load old messages

// As soon as activeConversationId set hota hai:

// Call API
// 👉 GET /api/chats/:conversationId

// Backend returns messages array

// Frontend:

// setMessages(messages)

// Chat screen renders history

// 3️⃣ User types a message

// User types in input box

// Frontend keeps it in state
// 👉 messageText

// (No API yet)

// 4️⃣ User clicks Send

// On Send button click:

// Frontend does 3 things at once 👇
// 5️⃣ Emit socket event (main step)

// Frontend emits socket:

// socket.emit("send_message", {
//   conversationId,
//   receiverId,
//   message: messageText,
// });


// 👉 Socket is primary, not REST API

// 6️⃣ Optimistic UI update

// Immediately show message in UI:

// setMessages((prev) => [
//   ...prev,
//   {
//     _id: tempId,
//     sender: myUserId,
//     message: messageText,
//     createdAt: new Date(),
//   },
// ]);


// 👉 User feels instant response (WhatsApp style)

// 7️⃣ Backend processes message

// (Socket side)

// Save message in DB

// Update:

// lastMessage

// unreadCount (receiver side)

// Emit to receiver socket only

// 8️⃣ Receiver gets message

// Receiver frontend listens:

// socket.on("receive_message", (msg) => {
//   setMessages((prev) => [...prev, msg]);
// });


// 👉 Message appears instantly on receiver side

// 9️⃣ Sender gets confirm (optional)

// Backend may send:

// saved message _id

// exact createdAt

// Frontend:

// Replaces temp message (optional but clean)

// 🧠 One-line Summary