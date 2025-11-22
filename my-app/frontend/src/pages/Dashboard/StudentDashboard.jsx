import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import applicationService from '../../services/applicationService'
import './StudentDashboard.css'

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0
  })
  const [recentApplications, setRecentApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      setStats({
        totalApplications: 5,
        pendingApplications: 2,
        acceptedApplications: 1,
        rejectedApplications: 2
      })
      setRecentApplications([
        {
          id: 1,
          institute: 'University of Technology',
          course: 'Computer Science',
          status: 'pending',
          appliedDate: '2024-01-15'
        },
        {
          id: 2,
          institute: 'Business College',
          course: 'Business Administration',
          status: 'accepted',
          appliedDate: '2024-01-10'
        }
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="student-dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p className="stat-number">{stats.totalApplications}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number">{stats.pendingApplications}</p>
        </div>
        <div className="stat-card">
          <h3>Accepted</h3>
          <p className="stat-number">{stats.acceptedApplications}</p>
        </div>
        <div className="stat-card">
          <h3>Rejected</h3>
          <p className="stat-number">{stats.rejectedApplications}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/institutes" className="action-card">
          <h3>Browse Institutes</h3>
          <p>Discover and apply to courses</p>
          <span className="action-arrow">→</span>
        </Link>
        <Link to="/applications" className="action-card">
          <h3>My Applications</h3>
          <p>View and manage your applications</p>
          <span className="action-arrow">→</span>
        </Link>
        <Link to="/profile" className="action-card">
          <h3>Update Profile</h3>
          <p>Keep your information current</p>
          <span className="action-arrow">→</span>
        </Link>
      </div>

      <div className="recent-applications">
        <h2>Recent Applications</h2>
        {recentApplications.length === 0 ? (
          <p>No applications yet. <Link to="/institutes">Start applying!</Link></p>
        ) : (
          <div className="applications-list">
            {recentApplications.map(application => (
              <div key={application.id} className="application-item">
                <div className="application-info">
                  <h4>{application.course}</h4>
                  <p>{application.institute}</p>
                  <span className={`status status-${application.status}`}>
                    {application.status}
                  </span>
                </div>
                <div className="application-date">
                  Applied: {new Date(application.appliedDate).toLocaleDateString()}
                </div>
                <div className="application-actions">
                  <Link 
                    to={`/applications`}
                    className="btn btn-outline btn-small"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="quick-links">
        <h3>Quick Links</h3>
        <div className="links-grid">
          <Link to="/institutes?filter=engineering" className="quick-link">
            Engineering Courses
          </Link>
          <Link to="/institutes?filter=business" className="quick-link">
            Business Programs
          </Link>
          <Link to="/institutes?filter=medicine" className="quick-link">
            Medical Schools
          </Link>
          <Link to="/institutes?filter=computers" className="quick-link">
            Computer Science
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard