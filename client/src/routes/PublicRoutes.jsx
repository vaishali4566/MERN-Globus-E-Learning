import React from 'react'
import Login from '@/pages/auth/Login'
import Signup from '@/pages/auth/Signup'
import LandingPage from '@/pages/Landing/LandingPage'
import { Routes, Route } from "react-router-dom";

const PublicRoutes = () => {
  return (
    <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
    </Routes>
  )
}

export default PublicRoutes