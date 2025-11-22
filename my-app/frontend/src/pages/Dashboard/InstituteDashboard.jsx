import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import instituteService from '../../services/instituteService'
import applicationService from '../../services/applicationService'
import './InstituteDashboard.css'

const InstituteDashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    coursesOffered: 0,
    faculties: 0
  })
  const [recentApplications, setRecentApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      console.log('🟡 Fetching institute dashboard data...')

      // Fetch real data from your APIs
      const [applicationsResponse, coursesResponse, facultiesResponse] = await Promise.all([
        instituteService.getInstituteApplications({ status: 'pending' }),
        instituteService.getCourses(),
        instituteService.getFaculties()
      ])

      console.log('🟢 Dashboard data fetched:', {
        applications: applicationsResponse.data,
        courses: coursesResponse.data,
        faculties: facultiesResponse.data
      })

      // Calculate stats from real data
      const pendingApps = applicationsResponse.data?.applications || []
      const allCourses = coursesResponse.data || []
      const allFaculties = facultiesResponse.data || []

  
      const allApplicationsResponse = await instituteService.getInstituteApplications({})
      const totalApps = allApplicationsResponse.data?.applications || []

      setStats({
        totalApplications: totalApps.length,
        pendingApplications: pendingApps.length,
        coursesOffered: allCourses.length,
        faculties: allFaculties.length
      })

    
      const recentPendingApps = pendingApps.slice(0, 5).map(app => ({
        id: app.id,
        studentName: app.student_name,
        course: app.course_name,
        appliedDate: new Date(app.application_date).toLocaleDateString(),
        status: app.status,
        studentEmail: app.student_email,
        courseCode: app.course_code
      }))

      setRecentApplications(recentPendingApps)

    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error)
    
      setStats({
        totalApplications: 0,
        pendingApplications: 0,
        coursesOffered: 0,
        faculties: 0
      })
      setRecentApplications([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: 'Pending' },
      under_review: { class: 'status-review', text: 'Under Review' },
      accepted: { class: 'status-accepted', text: 'Accepted' },
      rejected: { class: 'status-rejected', text: 'Rejected' },
      withdrawn: { class: 'status-withdrawn', text: 'Withdrawn' }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return <span className={`status ${config.class}`}>{config.text}</span>
  }

  if (loading) {
    return (
      <div className="institute-dashboard loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    )
  }

  return (
    <div className="institute-dashboard">
      <div className="dashboard-header">
        <h1>Institute Dashboard</h1>
        <p>Welcome back, {user?.profile?.name || user?.name}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <h3>Total Applications</h3>
          <p className="stat-number">{stats.totalApplications}</p>
          <p className="stat-description">All time applications</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <h3>Pending Review</h3>
          <p className="stat-number">{stats.pendingApplications}</p>
          <p className="stat-description">Awaiting your decision</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <h3>Courses Offered</h3>
          <p className="stat-number">{stats.coursesOffered}</p>
          <p className="stat-description">Active courses</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏛️</div>
          <h3>Faculties</h3>
          <p className="stat-number">{stats.faculties}</p>
          <p className="stat-description">Academic departments</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="./InstituteManagement/InstituteManagement.jsx">
          <div className="action-icon">➕</div>
          <div className="action-content">
            <h3>Manage Courses</h3>
            <p>Add and edit courses and faculties</p>
          </div>
          <span className="action-arrow">→</span>
        </Link>
        
        <Link to="/institutes/admission-periods" className="action-card">
          <div className="action-icon">📢</div>
          <div className="action-content">
            <h3>Admission Periods</h3>
            <p>Open/close admission periods</p>
          </div>
          <span className="action-arrow">→</span>
        </Link>
        
        <Link to="/institutes/applications" className="action-card">
          <div className="action-icon">👥</div>
          <div className="action-content">
            <h3>View Applications</h3>
            <p>Review student applications</p>
          </div>
          <span className="action-arrow">→</span>
        </Link>
        
        <Link to="/Profile/Profile.jsx" className="action-card">
          <div className="action-icon">🏫</div>
          <div className="action-content">
            <h3>Institute Profile</h3>
            <p>Update institute information</p>
          </div>
          <span className="action-arrow">→</span>
        </Link>
      </div>

      <div className="recent-applications">
        <div className="section-header">
          <h2>Applications Needing Review</h2>
          {recentApplications.length > 0 && (
            <Link to="/institutes/applications" className="view-all-link">
              View All →
            </Link>
          )}
        </div>
        
        {recentApplications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No pending applications</h3>
            <p>All applications have been reviewed or no applications received yet.</p>
          </div>
        ) : (
          <div className="applications-list">
            {recentApplications.map(application => (
              <div key={application.id} className="application-item">
                <div className="application-info">
                  <div className="student-details">
                    <h4>{application.studentName}</h4>
                    <p className="student-email">{application.studentEmail}</p>
                  </div>
                  <div className="course-details">
                    <p className="course-name">{application.course}</p>
                    <p className="course-code">{application.courseCode}</p>
                  </div>
                  <div className="application-meta">
                    <span className="applied-date">Applied: {application.appliedDate}</span>
                    {getStatusBadge(application.status)}
                  </div>
                </div>
                <div className="application-actions">
                  <Link 
                    to={`/institutes/applications/${application.id}`}
                    className="btn btn-primary btn-small"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      <div className="quick-stats">
        <h3>Quick Overview</h3>
        <div className="stats-summary">
          <div className="summary-item">
            <span className="summary-label">Acceptance Rate:</span>
            <span className="summary-value">
              {stats.totalApplications > 0 
                ? Math.round((stats.totalApplications - stats.pendingApplications) / stats.totalApplications * 100) 
                : 0}%
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Active Courses:</span>
            <span className="summary-value">{stats.coursesOffered}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Pending Decisions:</span>
            <span className="summary-value">{stats.pendingApplications}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstituteDashboard