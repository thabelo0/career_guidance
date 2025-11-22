import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
//import Layout from './components/Layout/Layout'

// Auth Pages
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

// Main Pages
import Home from './pages/Home/Home'
import Institutes from './pages/Institutes/Institutes'

// Dashboard Pages
import Dashboard from './pages/Dashboard/Dashboard'

// Management Pages
import InstituteManagement from './pages/InstituteManagement/InstituteManagement'
import AdmissionManagement from './pages/AdmissionManagement/AdmissionManagement'

// Application Pages
import Applications from './pages/Applications/Applications'
import CourseApplication from './pages/CourseApplication/CourseApplication'

// Profile Pages
import Profile from './pages/Profile/Profile'

// Components
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
      {/* <Layout> */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/institutes" element={<Institutes />} />

            {/* Protected Routes - All Users */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/applications" element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* Protected Routes - Course Application */}
            <Route path="/apply/:instituteId/:courseId" element={
              <ProtectedRoute>
                <CourseApplication />
              </ProtectedRoute>
            } />

            {/* Protected Routes - Admin & Institute Management */}
            <Route path="/manage-institutes" element={
              <ProtectedRoute>
                <InstituteManagement />
              </ProtectedRoute>
            } />
            <Route path="/manage-admissions" element={
              <ProtectedRoute>
                <AdmissionManagement />
              </ProtectedRoute>
            } />

            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        {/* </Layout> */}
      </Router>
    </AuthProvider>
  )
}

export default App