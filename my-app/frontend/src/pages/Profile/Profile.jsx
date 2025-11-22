import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import StudentProfile from './StudentProfile'
import InstituteProfile from './InstituteProfile'
import AdminProfile from './AdminProfile'
import './Profile.css'

const Profile = () => {
  const { user } = useAuth()

  const renderProfile = () => {
    switch (user.userType) {
      case 'student':
        return <StudentProfile />
      case 'institute':
        return <InstituteProfile />
      case 'admin':
        return <AdminProfile />
      default:
        return <div>Invalid user type</div>
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile Management</h1>
        <p>Manage your account information and preferences</p>
      </div>
      {renderProfile()}
    </div>
  )
}

export default Profile