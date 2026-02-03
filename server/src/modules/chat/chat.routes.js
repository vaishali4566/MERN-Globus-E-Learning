import express from "express";
import {
  fetchChatsController,
  getOrCreateConversationController,
  getMessageFriendListController,
} from "./chat.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Friend list
router.get("/conversations", protect, getMessageFriendListController);

// Get or create conversation with a friend
router.get(
  "/conversations/:friendId",
  protect,
  getOrCreateConversationController,
);

// Fetch chats for a conversation
router.get("/:conversationId", protect, fetchChatsController);

export default router;

// 1️⃣ Conversation Model + API
// 2️⃣ Message Model
// 3️⃣ Get / Create Conversation API
// 4️⃣ Load Messages API
// 5️⃣ Send Message Socket
// 6️⃣ Receive Message UI
// 7️⃣ Seen / unread (last)
