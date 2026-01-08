import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentRoutes from "./routes/StudentRoutes";
import PublicRoutes from "./routes/gaurds/PublicRoutes";
import LandingPage from "./pages/Landing/LandingPage";
import TrainerRoutes from "./routes/TrainerRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<PublicRoutes />} />

        {/* Student Dashboard */}
        <Route path="/student/*" element={<StudentRoutes />} />

        {/* Trainer Dashboard */}
        <Route path="/trainer/*" element={<TrainerRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
