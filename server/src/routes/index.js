// Import module routes
import authRoutes from "../modules/auth/auth.routes.js";
import courseRoutes from "../modules/courses/course.routes.js";
import sectionRoutes from "../modules/sections/section.routes.js"
import lessonRoutes from "../modules/lessons/lesson.routes.js";
import assignmentRoutes from "../modules/assignments/assignment.routes.js"
import quizRoutes from "../modules/quizzes/quiz.routes.js"
import userRoutes from "../modules/users/user.routes.js"
import uploadRoutes from "./uploadRoutes.js"
import paymentRoutes from "../modules/payment/payment.routes.js";
import enrollmentRoutes from "../modules/enrollments/enrollment.routes.js"
import progressRoutes from "../modules/progress/progress.routes.js"
import friendRequestRoutes from "../modules/friendRequest/friendRequest.routes.js";

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
  app.use("/api/users", userRoutes);
  
  //Quiz routes
  app.use("/api/quizzes", quizRoutes);

  //Payment routes
  app.use("/api/payments", paymentRoutes);

  // Enrollment routes
  app.use("/api/enrollments", enrollmentRoutes);

  // Progress routes
  app.use("/api/progress", progressRoutes);

  // FriendRequest routes
  app.use("/api/friend-requests", friendRequestRoutes);

  app.use("/api/uploads", uploadRoutes);
};

export default loadRoutes;


// server/
// ├── src/
// │   ├── app.js
// │   ├── server.js
// │   ├── config/
// │   ├── middlewares/
// │   ├── controllers/
// │   ├── modules/
// │   │   └── users/
// │   ├── routes/
// │   │   └── index.js
// │   └── utils/



