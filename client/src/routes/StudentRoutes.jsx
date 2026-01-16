import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../pages/student/dashboard/StudentDashboard";
import MyCoursesPage from "@/pages/student/courses/MyCoursesPage";
import Assignments from "../pages/student/assignments/Page";
import Chat from "../pages/student/chat/Page";
import Profile from "../pages/student/Profile";
import Quiz from "../pages/student/quiz/Page";
import SchedulePage from "@/pages/student/schedule/Page";
import LiveClasses from "@/pages/student/liveclass/Page";
import Progress from "@/pages/student/progress/Page";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/routes/gaurds/ProtectedRoute";
import AllCoursesPage from "@/features/courses/pages/AllCoursesPage";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <DashboardLayout  />
          </ProtectedRoute>
        }
      >
        {/* default: /student */}
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="explore-courses" element={<AllCoursesPage />} />

        {/* /student/my-courses */}
        <Route path="my-courses" element={<MyCoursesPage />} />

        <Route path="assignments" element={<Assignments />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile" element={<Profile />} />
        <Route path="quizzes" element={<Quiz />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="live-classes" element={<LiveClasses />} />
        <Route path="progress" element={<Progress />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
