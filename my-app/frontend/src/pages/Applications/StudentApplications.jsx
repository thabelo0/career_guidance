import React, { useState, useEffect } from 'react'
import './StudentApplications.css'

const StudentApplications = () => {
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockApplications = [
      {
        id: 1,
        institute: 'University of Technology',
        course: 'Computer Science',
        appliedDate: '2024-01-15',
        status: 'pending',
        applicationId: 'APP-001',
        requirements: {
          minGrade: 'B+',
          subjects: ['Math', 'Physics']
        }
      },
      {
        id: 2,
        institute: 'Business College',
        course: 'Business Administration',
        appliedDate: '2024-01-10',
        status: 'accepted',
        applicationId: 'APP-002',
        requirements: {
          minGrade: 'B',
          subjects: ['Math', 'English']
        }
      },
      {
        id: 3,
        institute: 'Medical School',
        course: 'Medicine',
        appliedDate: '2024-01-05',
        status: 'rejected',
        applicationId: 'APP-003',
        requirements: {
          minGrade: 'A',
          subjects: ['Biology', 'Chemistry']
        }
      }
    ]
    setApplications(mockApplications)
  }, [])

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true
    return app.status === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12'
      case 'accepted': return '#27ae60'
      case 'rejected': return '#e74c3c'
      default: return '#7f8c8d'
    }
  }

  const withdrawApplication = (applicationId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      // API call to withdraw application
      console.log('Withdraw application:', applicationId)
    }
  }

  return (
    <div className="student-applications">
      <div className="applications-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Applications
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filter === 'accepted' ? 'active' : ''}`}
          onClick={() => setFilter('accepted')}
        >
          Accepted
        </button>
        <button
          className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected
        </button>
      </div>

      <div className="applications-list">
        {filteredApplications.length === 0 ? (
          <div className="no-applications">
            <h3>No applications found</h3>
            <p>You haven't submitted any applications yet.</p>
          </div>
        ) : (
          filteredApplications.map(application => (
            <div key={application.id} className="application-card">
              <div className="application-header">
                <div className="application-basic-info">
                  <h3>{application.course}</h3>
                  <p className="institute-name">{application.institute}</p>
                  <span className="application-id">ID: {application.applicationId}</span>
                </div>
                <div className="application-status">
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(application.status) }}
                  >
                    {application.status.toUpperCase()}
                  </span>
                  <p className="applied-date">
                    Applied: {new Date(application.appliedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="application-details">
                <div className="requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    <li>Minimum Grade: {application.requirements.minGrade}</li>
                    <li>Required Subjects: {application.requirements.subjects.join(', ')}</li>
                  </ul>
                </div>
              </div>

              {application.status === 'pending' && (
                <div className="application-actions">
                  <button
                    onClick={() => withdrawApplication(application.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Withdraw Application
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default StudentApplications