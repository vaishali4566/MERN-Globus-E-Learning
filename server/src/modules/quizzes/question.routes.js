import express from "express";
import { createQuestion } from "./question.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowedRoles } from "../../middlewares/role.middleware.js";

const router = express.Router({ mergeParams: true });

// POST /api/quizzes/:quizId/questions
router.post("/", protect, allowedRoles("trainer"), createQuestion);

export default router;
