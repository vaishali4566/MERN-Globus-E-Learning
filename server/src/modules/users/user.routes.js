import express from "express";
import {
  getUsers,
  getMyProfileController,
  updateProfileController,
  updateBasicInfoController,
  updatePasswordController,
  updateSocialLinksController,
} from "./user.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// 🔹 Get all users (admin/trainer)
router.get("/", protect, getUsers);

// 🔹 Get my profile
router.get("/me", protect, getMyProfileController);

// 🔹 Update name & bio
router.put("/me", protect, updateProfileController);

// 🔹 Update basic info (phone, dob)
router.patch("/me/basic-info", protect, updateBasicInfoController);

// 🔹 Update password
router.patch("/me/password", protect, updatePasswordController);

// 🔹 Update social links
router.patch("/me/social-links", protect, updateSocialLinksController);

export default router;
