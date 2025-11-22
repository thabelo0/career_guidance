import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './AdminProfile.css'

const AdminProfile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1-555-0124',
    position: 'System Administrator',
    department: 'IT Department',
    employeeId: 'ADM001',
    joinDate: '2020-01-15'
  })

  const [systemStats, setSystemStats] = useState({
    totalInstitutes: 47,
    totalStudents: 12560,
    totalApplications: 34520,
    activeSessions: 234
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // API call to update admin profile
    console.log('Updating admin profile:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: '+1-555-0124',
      position: 'System Administrator',
      department: 'IT Department',
      employeeId: 'ADM001',
      joinDate: '2020-01-15'
    })
    setIsEditing(false)
  }

  return (
    <div className="admin-profile">
      <div className="profile-header">
        <div className="profile-info">
          <h2>{formData.name}</h2>
          <p className="admin-role">System Administrator</p>
          <p className="employee-id">Employee ID: {formData.employeeId}</p>
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button onClick={handleSubmit} className="btn btn-primary">
                Save Changes
              </button>
              <button onClick={handleCancel} className="btn btn-outline">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="admin-content">
        <div className="profile-section">
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Join Date</label>
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="system-overview">
          <h3>System Overview</h3>
          <div className="system-stats">
            <div className="system-stat">
              <div className="stat-icon">🏫</div>
              <div className="stat-info">
                <span className="stat-number">{systemStats.totalInstitutes}</span>
                <span className="stat-label">Institutes</span>
              </div>
            </div>
            <div className="system-stat">
              <div className="stat-icon">👨‍🎓</div>
              <div className="stat-info">
                <span className="stat-number">{systemStats.totalStudents}</span>
                <span className="stat-label">Students</span>
              </div>
            </div>
            <div className="system-stat">
              <div className="stat-icon">📄</div>
              <div className="stat-info">
                <span className="stat-number">{systemStats.totalApplications}</span>
                <span className="stat-label">Applications</span>
              </div>
            </div>
            <div className="system-stat">
              <div className="stat-icon">🔗</div>
              <div className="stat-info">
                <span className="stat-number">{systemStats.activeSessions}</span>
                <span className="stat-label">Active Sessions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-actions-panel">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn">
              <span className="action-icon">📊</span>
              <span className="action-text">View Reports</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">👥</span>
              <span className="action-text">Manage Users</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">⚙️</span>
              <span className="action-text">System Settings</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📋</span>
              <span className="action-text">Audit Logs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile