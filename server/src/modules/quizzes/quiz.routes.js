import express from "express";
import { createQuiz, getQuizForStudent, getQuizWithAnswers, getStudentQuizzes } from "./quiz.controller.js";
import questionRoutes from "./question.routes.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowedRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

// Get student's quizzes from enrolled courses
router.get("/my-quizzes", protect, allowedRoles("student"), getStudentQuizzes);

// Quiz
router.post("/", protect, allowedRoles("trainer"), createQuiz);
router.get("/:quizId", protect, getQuizForStudent);
router.get("/:quizId/results", protect, getQuizWithAnswers);


// 👇 Nested Questions route
router.use("/:quizId/questions",protect, questionRoutes);

export default router;
