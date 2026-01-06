import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import StudentDashboard from "../pages/student/dashboard/StudentDashboard";
import MyCourses from "../pages/student/courses/MyCourses";
import Assignments from "../pages/student/assignments/page";
import Chat from "../pages/student/chat/Page";
import Profile from "../pages/student/Profile";

const StudentRoutes = () => {
  return (
   
      <Routes>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
 
  );
};

export default StudentRoutes;
