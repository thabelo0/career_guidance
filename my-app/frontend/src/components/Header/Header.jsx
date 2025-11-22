import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Header.css'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const renderManagementLinks = () => {
    if (user?.userType === 'admin') {
      return (
        <>
          <Link to="/manage-institutes" className="nav-link">Manage Institutes</Link>
          <Link to="/manage-admissions" className="nav-link">Admissions</Link>
        </>
      )
    }
    
    if (user?.userType === 'institute') {
      return (
        <>
          <Link to="/manage-institutes" className="nav-link">Manage Courses</Link>
          <Link to="/manage-admissions" className="nav-link">Admissions</Link>
        </>
      )
    }
    
    return null
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          CareerGuide
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/institutes" className="nav-link">Institutes</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              {renderManagementLinks()}
              <Link to="/applications" className="nav-link">Applications</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header