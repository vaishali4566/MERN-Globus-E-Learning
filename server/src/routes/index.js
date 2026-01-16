// Import module routes
import authRoutes from "../modules/auth/auth.routes.js";
import courseRoutes from "../modules/courses/course.routes.js";
import sectionRoutes from "../modules/sections/section.routes.js"
import lessonRoutes from "../modules/lessons/lesson.routes.js";
import assignmentRoutes from "../modules/assignments/assignment.routes.js"
import quizRoutes from "../modules/quizzes/quiz.routes.js"
import userRoutes from "../modules/users/user.routes.js"
import uploadRoutes from "./uploadRoutes.js"

// Function to load routes
const loadRoutes = (app) => {
  // Auth routes
  app.use("/api/auth", authRoutes);

  // Course routes
  app.use("/api/courses", courseRoutes);

  // Section routes
  app.use("/api/sections", sectionRoutes);

  // Lesson routes
  app.use("/api/lessons", lessonRoutes);

  // Assignment routes
  app.use("/api/assignments", assignmentRoutes);
    // User routes
  app.use("/api/user", userRoutes);
  //Quiz routes
  app.use("/api/quizzes", quizRoutes);

  app.use("/api/uploads", uploadRoutes);
};

export default loadRoutes;


