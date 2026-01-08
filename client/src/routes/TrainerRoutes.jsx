import React from 'react'
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './gaurds/ProtectedRoute'
import DashboardLayout from '@/components/layout/DashboardLayout'
import TrainerDashboard from '@/pages/trainer/dashboard/TrainerDashboard';

const TrainerRoutes = () => {
  return (
    <ProtectedRoute allowedRoles={["trainer"]}>
        <DashboardLayout>
            <Routes>
                <Route path='dashboard' element={<TrainerDashboard/>}></Route>
            </Routes>
        </DashboardLayout>
    </ProtectedRoute>
  )
}

export default TrainerRoutes