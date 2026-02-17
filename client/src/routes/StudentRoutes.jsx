import DashboardLayout from "@/components/layout/DashboardLayout";
import AnnouncementsPage from "@/features/announcements/pages/AnnouncementsPage";
import { CoursePlayerPage } from "@/features/coursePlayer";
import AllCoursesPage from "@/features/courses/pages/AllCoursesPage";
import FindPeople from "@/features/findPeople/pages/FindPeople";
import CheckoutPage from "@/features/payment/pages/CheckoutPage";
import { CourseProgressDetail } from "@/features/progress";
import Certificates from "@/pages/student/certificates/Page";
import MyCoursesPage from "@/pages/student/courses/MyCoursesPage";
import LiveClasses from "@/pages/student/liveclass/Page";
import Progress from "@/pages/student/progress/Page";
import SchedulePage from "@/pages/student/schedule/Page";
import ProtectedRoute from "@/routes/gaurds/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import Chat from "../features/chat/pages/ChatPage";
import Profile from "../features/profile/pages/Profile";
import Assignments from "../pages/student/assignments/page";
import StudentDashboard from "../pages/student/dashboard/StudentDashboard";
import Quiz from "../pages/student/quiz/Page";

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
        <Route path="announcements" element={<AnnouncementsPage />} />
        <Route path="checkout/:courseId" element={<CheckoutPage />} />
        
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
