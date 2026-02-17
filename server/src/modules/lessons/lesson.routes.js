import express from "express";
import { createLesson } from "./lesson.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { allowedRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Course lesson management APIs
 */

/**
 * @swagger
 * /api/lessons:
 *   post:
 *     summary: Create a new lesson
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - sectionId
 *               - title
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: 65f2abc12345
 *               sectionId:
 *                 type: string
 *                 example: 65f2def67890
 *               title:
 *                 type: string
 *                 example: Introduction to JavaScript
 *               description:
 *                 type: string
 *                 example: Basics of JS
 *               videoUrl:
 *                 type: string
 *                 example: https://video-url.com/video.mp4
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *       403:
 *         description: Only trainer can create lessons
 */
router.post("/", protect, allowedRoles("trainer"), createLesson);

export default router;