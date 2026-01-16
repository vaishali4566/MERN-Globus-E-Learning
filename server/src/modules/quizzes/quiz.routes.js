import express from "express";
import { createQuiz } from "./quiz.controller.js";
import questionRoutes from "./question.routes.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowedRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

// Quiz
router.post("/", protect, allowedRoles("trainer"), createQuiz);

// 👇 Nested Questions route
router.use("/:quizId/questions", questionRoutes);

export default router;
