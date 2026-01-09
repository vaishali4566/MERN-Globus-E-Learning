import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./gaurds/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TrainerDashboard from "@/pages/trainer/dashboard/TrainerDashboard";
import CreateCourse from "@/pages/trainer/courses/CreateCourse";
import MyCourses from "@/features/courses/pages/MyCourses";
import CourseBuilderPage from "@/pages/trainer/courses/CourseBuilderPage";

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
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="courses/:courseId/builder" element={<CourseBuilderPage />} />
      </Route>
    </Routes>
  );
};

export default TrainerRoutes;
