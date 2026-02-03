import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

/**
 * IMPORTANT:
 * participants array hamesha 2 users ka hoga
 * order matter nahi karta
 */

export default mongoose.model("Conversation", conversationSchema);
