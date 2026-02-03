import express from "express";
import { syncFriendData } from "./friendRequest.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, syncFriendData);

export default router;