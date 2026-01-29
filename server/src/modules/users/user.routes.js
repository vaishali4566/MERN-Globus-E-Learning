import express from "express";
import { getProfile ,editProfile} from "./user.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, editProfile);

export default router;
