import { Routes, Route } from "react-router-dom";
import StudentRoutes from "./routes/StudentRoutes";
import TrainerRoutes from "./routes/TrainerRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import LandingPage from "./pages/Landing/LandingPage";

function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Student */}
      <Route path="/student/*" element={<StudentRoutes />} />

      {/* Trainer */}
      <Route path="/trainer/*" element={<TrainerRoutes />} />
    </Routes>
  );
}

export default App;
