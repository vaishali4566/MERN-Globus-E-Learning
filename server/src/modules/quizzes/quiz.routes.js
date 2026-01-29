import express from "express";
import { createQuiz, getQuizForStudent } from "./quiz.controller.js";
import questionRoutes from "./question.routes.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowedRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

// Quiz
router.post("/", protect, allowedRoles("trainer"), createQuiz);
router.get("/:quizId", protect, getQuizForStudent);


// 👇 Nested Questions route
router.use("/:quizId/questions",protect, questionRoutes);

export default router;
