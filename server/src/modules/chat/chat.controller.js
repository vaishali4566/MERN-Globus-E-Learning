import { getMessagesService, sendMessageService } from "../modules/chat/chat.service.js";

// 📥 Get 1-to-1 messages
export const getMessages = async (req, res) => {
  const { user1, user2 } = req.query;

  if (!user1 || !user2)
    return res.status(400).json({ error: "Both user IDs required" });

  try {
    const messages = await getMessagesService(user1, user2);
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// 📤 Send a new message
export const sendMessage = async (req, res) => {
  const { sender, receiver, message } = req.body;

  if (!sender || !receiver || !message)
    return res.status(400).json({ error: "All fields required" });

  try {
    const newMessage = await sendMessageService(sender, receiver, message);
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
