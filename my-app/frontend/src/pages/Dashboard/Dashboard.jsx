import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import StudentDashboard from './StudentDashboard'
import InstituteDashboard from './InstituteDashboard'
import AdminDashboard from './AdminDashboard'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()

  const renderDashboard = () => {
    switch (user.userType) {
      case 'student':
        return <StudentDashboard />
      case 'institute':
        return <InstituteDashboard />
      case 'admin':
        return <AdminDashboard />
      default:
        return <div>Invalid user type</div>
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user.name}!</p>
      </div>
      {renderDashboard()}
    </div>
  )
}

export default Dashboard