import DashboardLayout from "@/components/layout/DashboardLayout";
import ChatPage from "@/features/chat/pages/ChatPage";
import { CoursePlayerPage } from "@/features/coursePlayer";
import MyCourses from "@/features/courses/pages/MyCourses";
import FindPeople from "@/features/findPeople/pages/FindPeople";
import Profile from "@/features/profile/pages/Profile";
import CourseBuilderPage from "@/pages/trainer/courses/CourseBuilderPage";
import CreateCourse from "@/pages/trainer/courses/CreateCourse";
import TrainerDashboard from "@/pages/trainer/dashboard/TrainerDashboard";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./gaurds/ProtectedRoute";

const TrainerRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={["trainer"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<TrainerDashboard />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="find-people" element={<FindPeople />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="courses/:courseId/builder"
          element={<CourseBuilderPage />}
        />
      </Route>
      <Route path="/courses/courseId" element={<CoursePlayerPage />} />
    </Routes>
  );
};

export default TrainerRoutes;
