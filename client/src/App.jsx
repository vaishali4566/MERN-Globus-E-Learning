import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthRoutes from "./routes/AuthRoutes";
import StudentRoutes from "./routes/StudentRoutes";
// import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        {/* <Route path="/*" element={<PublicRoutes />} /> */}

        {/* Auth */}
        {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

        {/* Student Dashboard */}
        <Route path="/student/*" element={<StudentRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
