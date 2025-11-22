import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalInstitutes: 0,
    totalStudents: 0,
    totalApplications: 0,
    activeAdmissions: 0
  })

  useEffect(() => {

    setStats({
      totalInstitutes: 47,
      totalStudents: 12560,
      totalApplications: 34520,
      activeAdmissions: 12
    })
  }, [])

  return (
    <div className="admin-dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Institutes</h3>
          <p className="stat-number">{stats.totalInstitutes}</p>
        </div>
        <div className="stat-card">
          <h3>Registered Students</h3>
          <p className="stat-number">{stats.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p className="stat-number">{stats.totalApplications}</p>
        </div>
        <div className="stat-card">
          <h3>Active Admissions</h3>
          <p className="stat-number">{stats.activeAdmissions}</p>
        </div>
      </div>

      <div className="admin-actions">
        <Link to="/manage-institutes" className="admin-action-card">
          <h3>Manage Institutes</h3>
          <p>Add, edit, or remove institutions</p>
          <span className="action-arrow">→</span>
        </Link>
        <Link to="/manage-admissions" className="admin-action-card">
          <h3>Manage Admissions</h3>
          <p>Publish and manage admission periods</p>
          <span className="action-arrow">→</span>
        </Link>
        <div className="admin-action-card">
          <h3>System Overview</h3>
          <p>View system statistics and reports</p>
          <span className="action-arrow">→</span>
        </div>
        <div className="admin-action-card">
          <h3>User Management</h3>
          <p>Manage all users and permissions</p>
          <span className="action-arrow">→</span>
        </div>
      </div>

      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <div className="activities-list">
          <div className="activity-item">
            <div className="activity-info">
              <h4>New Institute Registered</h4>
              <p>Medical University just joined the platform</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-info">
              <h4>Admission Period Closed</h4>
              <p>Spring 2024 admissions for Business College</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard