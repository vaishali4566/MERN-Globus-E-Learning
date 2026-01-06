import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/student/dashboard/StudentDashboard";
import Profile from "./pages/student/Profile";
import MyCourses from "./pages/student/courses/MyCourses";
import Chat from "./pages/student/chat/Page"
import Assignment from "./pages/student/assignments/page";
import LandingPage from "./pages/Landing/LandingPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses" element={<Profile />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
