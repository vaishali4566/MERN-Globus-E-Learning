import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../pages/student/dashboard/StudentDashboard";
import MyCoursesPage from "@/pages/student/courses/MyCoursesPage";
import Assignments from "../pages/student/assignments/page";
import Chat from "../features/chat/pages/ChatPage";
import Profile from "../pages/student/Profile";
import Quiz from "../pages/student/quiz/Page";
import SchedulePage from "@/pages/student/schedule/Page";
import LiveClasses from "@/pages/student/liveclass/Page";
import Progress from "@/pages/student/progress/Page";
import Certificates from "@/pages/student/certificates/Page";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/routes/gaurds/ProtectedRoute";
import AllCoursesPage from "@/features/courses/pages/AllCoursesPage";
import CheckoutPage from "@/features/payment/pages/CheckoutPage";
import { CoursePlayerPage } from "@/features/coursePlayer";
import { CourseProgressDetail } from "@/features/progress";
import FindPeople from "@/features/findPeople/pages/FindPeople";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="courses/:courseId" element={<CoursePlayerPage />} />
      <Route path="courses/:courseId/progress" element={<CourseProgressDetail />} />
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
        <Route path="find-people" element={<FindPeople />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile" element={<Profile />} />
        <Route path="quizzes" element={<Quiz />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="live-classes" element={<LiveClasses />} />
        <Route path="progress" element={<Progress />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="checkout/:courseId" element={<CheckoutPage />} />
        
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
