import express from "express";
import {
  createCourse,
  getCourseById,
  getMyCourses,
  publishCourse,
  getAllCourses,
  getCoursePlayerData,
} from "./course.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowedRoles } from "../../middlewares/role.middleware.js";
import { uploadThumbnail } from "../../middlewares/uploadThumbnail.middleware.js";

const router = express.Router();

// ========== GET Routes ==========
router.get("/", protect, getAllCourses);
router.get("/my-courses", protect, allowedRoles("trainer"), getMyCourses);
router.get("/:courseId/player", protect, getCoursePlayerData);
router.get("/:courseId", protect, getCourseById);

// ========== POST Route (with file upload) ==========
router.post(
  "/",
  protect,
  allowedRoles("trainer"),
  uploadThumbnail.single("thumbnail"), // multer must run before controller
  createCourse
);

// ========== PATCH Route ==========
router.patch(
  "/:courseId/publish",
  protect,
  allowedRoles("trainer"),
  publishCourse
);

export default router;
