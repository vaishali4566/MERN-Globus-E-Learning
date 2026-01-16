import express from "express";
import { uploadVideo } from "../middlewares/videoUpload.js";
import { uploadLessonVideo } from "../controllers/upload.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/video",
  protect,
  uploadVideo.single("video"),
  uploadLessonVideo
);

export default router;
