import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentRoutes from "./routes/StudentRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import LandingPage from "./pages/Landing/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<PublicRoutes />} />

        {/* Student Dashboard */}
        <Route path="/student/*" element={<StudentRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
