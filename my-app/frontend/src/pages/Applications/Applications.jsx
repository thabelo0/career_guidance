import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import StudentApplications from './StudentApplications'
import InstituteApplications from './InstituteApplications'
import './Applications.css'

const Applications = () => {
  const { user } = useAuth()

  const renderApplications = () => {
    switch (user.userType) {
      case 'student':
        return <StudentApplications />
      case 'institute':
        return <InstituteApplications />
      case 'admin':
        return <div className="admin-applications">
          <h2>Applications Overview</h2>
          <p>Admin can view all applications across the system</p>
          {/* Admin applications view can be added here */}
        </div>
      default:
        return <div>Invalid user type</div>
    }
  }

  return (
    <div className="applications-page">
      <div className="applications-header">
        <h1>Applications Management</h1>
        {user.userType === 'student' && (
          <p>Manage your course applications</p>
        )}
        {user.userType === 'institute' && (
          <p>Review and manage student applications</p>
        )}
        {user.userType === 'admin' && (
          <p>Overview of all applications in the system</p>
        )}
      </div>
      {renderApplications()}
    </div>
  )
}

export default Applications