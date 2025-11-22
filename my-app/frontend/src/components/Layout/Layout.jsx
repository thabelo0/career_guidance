import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Layout.css'

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="layout">
      <header className="header">
        <div className="header-container">
          <a href="/" className="logo">
            🎓 CareerGuide
          </a>
          
          <nav className="nav">
            <a href="/" className="nav-link">Home</a>
            <a href="/institutes" className="nav-link">Institutes</a>
            
            {user ? (
              <>
                <a href="/dashboard" className="nav-link">Dashboard</a>
                
                {/* Show management links based on user type */}
                {(user.userType === 'admin' || user.userType === 'institute') && (
                  <>
                    <a href="/manage-institutes" className="nav-link">Manage Courses</a>
                    <a href="/manage-admissions" className="nav-link">Admissions</a>
                  </>
                )}
                
                <a href="/applications" className="nav-link">Applications</a>
                <a href="/profile" className="nav-link">Profile</a>
                <button onClick={handleLogout} className="btn btn-outline" style={{color: 'white', borderColor: 'white'}}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="nav-link">Login</a>
                <a href="/register" className="nav-link">Register</a>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 CareerGuide. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout