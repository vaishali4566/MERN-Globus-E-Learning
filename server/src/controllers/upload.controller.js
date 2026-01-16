import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import { getVideoDurationInSeconds } from "get-video-duration";

export const uploadLessonVideo = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Video file missing");
    }

    const { courseId, sectionId } = req.body;

    if (!courseId || !sectionId) {
      throw new Error("courseId & sectionId are required");
    }

    // 1️⃣ Get video duration (LOCAL FILE)
    const duration = await getVideoDurationInSeconds(req.file.path);

    // 2️⃣ Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: `courses/${courseId}/sections/${sectionId}/lessons`,
    });

    // 3️⃣ Delete local file
    fs.unlinkSync(req.file.path);

    // 4️⃣ Send data to frontend
    res.status(200).json({
      success: true,
      url: result.secure_url,
      duration: Math.round(duration),
      provider: "cloudinary",
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
