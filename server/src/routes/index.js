// Import module routes
import authRoutes from "../modules/auth/auth.routes.js";
import courseRoutes from "../modules/courses/course.routes.js";
import sectionRoutes from "../modules/sections/section.routes.js"
import lessonRoutes from "../modules/lessons/lesson.routes.js";
import assignmentRoutes from "../modules/assignments/assignment.routes.js"
import quizRoutes from "../modules/quizzes/quiz.routes.js"
import uploadRoutes from "./uploadRoutes.js"
import paymentRoutes from "../modules/payment/payment.route.js";

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

  //Quiz routes
  app.use("/api/quizzes", quizRoutes);

  //Payment routes
  app.use("/api/payment", paymentRoutes);

  app.use("/api/uploads", uploadRoutes);
};

export default loadRoutes;


