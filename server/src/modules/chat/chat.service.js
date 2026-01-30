import Chat from "./Chat.js";

/**
 * Get all 1-to-1 messages between two users
 * @param {String} user1 - User ID 1
 * @param {String} user2 - User ID 2
 * @returns {Promise<Array>} - Array of messages
 */
export const getMessagesService = async (user1, user2) => {
  return await Chat.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  }).sort({ createdAt: 1 });
};

/**
 * Create & save a new chat message
 * @param {String} sender - Sender ID
 * @param {String} receiver - Receiver ID
 * @param {String} message - Message text
 * @returns {Promise<Object>} - Saved message
 */
export const sendMessageService = async (sender, receiver, message) => {
  return await Chat.create({ sender, receiver, message });
};
