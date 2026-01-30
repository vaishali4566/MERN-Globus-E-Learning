import express from "express";
import { getMessages, sendMessage } from "../controllers/chatController.js";

const router = express.Router();

router.get("/chat/messages", getMessages);
router.post("/chat/send", sendMessage);

export default router;
