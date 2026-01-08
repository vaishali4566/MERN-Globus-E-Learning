import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../pages/student/dashboard/StudentDashboard";
import MyCourses from "../pages/student/courses/MyCourses";
import Assignments from "../pages/student/assignments/Page";
import Chat from "../pages/student/chat/Page";
import Profile from "../pages/student/Profile";
import Quiz from "../pages/student/quiz/Page"
import DashboardLayout from "@/components/layout/DashboardLayout";
import SchedulePage from "@/pages/student/schedule/Page";
import LiveClasses from "@/pages/student/liveclass/Page";
import Progress from "@/pages/student/progress/Page"
import ProtectedRoute from "@/routes/gaurds/ProtectedRoute";

const StudentRoutes = () => {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <DashboardLayout>
        <Routes>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="quizzes" element={<Quiz />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="live-classes" element={<LiveClasses />} />
          <Route path="progress" element={<Progress />} />
        </Routes>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default StudentRoutes;
