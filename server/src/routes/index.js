// Import module routes
import authRoutes from "../modules/auth/auth.routes.js";
// import courseRoutes from "../modules/course/course.routes.js";
// import lessonRoutes from "../modules/lesson/lesson.routes.js";

// Function to load routes
const loadRoutes = (app) => {
  // Auth routes
  app.use("/api/auth", authRoutes);

  // Course routes
  // app.use("/api/courses", courseRoutes);

  // Lesson routes
  // app.use("/api/lessons", lessonRoutes);
};

export default loadRoutes;


