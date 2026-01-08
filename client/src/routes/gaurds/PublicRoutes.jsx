import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // already logged in → dashboard pe bhej do
  if (user?.role === "student") {
    return <Navigate to="/student/dashboard" replace />;
  }

  if (user?.role === "trainer") {
    return <Navigate to="/trainer/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
