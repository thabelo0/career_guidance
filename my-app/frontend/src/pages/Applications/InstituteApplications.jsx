import React, { useState, useEffect } from 'react'
import './InstituteApplications.css'

const InstituteApplications = () => {
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState(null)

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockApplications = [
      {
        id: 1,
        studentName: 'John Doe',
        studentEmail: 'john.doe@email.com',
        course: 'Computer Science',
        appliedDate: '2024-01-15',
        status: 'pending',
        applicationId: 'APP-001',
        studentGrades: {
          'Mathematics': 'A',
          'Physics': 'B+',
          'Chemistry': 'A-'
        },
        personalStatement: 'I am passionate about computer science and have been programming since high school...',
        documents: ['transcript.pdf', 'recommendation.pdf']
      },
      {
        id: 2,
        studentName: 'Jane Smith',
        studentEmail: 'jane.smith@email.com',
        course: 'Electrical Engineering',
        appliedDate: '2024-01-14',
        status: 'pending',
        applicationId: 'APP-002',
        studentGrades: {
          'Mathematics': 'A',
          'Physics': 'A',
          'Chemistry': 'B+'
        },
        personalStatement: 'My interest in electrical engineering began when I started building circuits...',
        documents: ['transcript.pdf', 'certificates.pdf']
      },
      {
        id: 3,
        studentName: 'Mike Johnson',
        studentEmail: 'mike.johnson@email.com',
        course: 'Computer Science',
        appliedDate: '2024-01-10',
        status: 'accepted',
        applicationId: 'APP-003',
        studentGrades: {
          'Mathematics': 'A-',
          'Physics': 'B+',
          'Chemistry': 'B'
        },
        personalStatement: 'I have completed several programming projects and internships...',
        documents: ['transcript.pdf']
      }
    ]
    setApplications(mockApplications)
  }, [])

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true
    return app.status === filter
  })

  const handleStatusUpdate = (applicationId, newStatus) => {
    if (window.confirm(`Are you sure you want to ${newStatus} this application?`)) {
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ))
      setSelectedApplication(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12'
      case 'accepted': return '#27ae60'
      case 'rejected': return '#e74c3c'
      default: return '#7f8c8d'
    }
  }

  return (
    <div className="institute-applications">
      <div className="applications-header">
        <h1>Student Applications</h1>
        <p>Review and manage student applications for your courses</p>
      </div>

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
          Pending Review
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

      <div className="applications-content">
        <div className="applications-list">
          <h3>Applications ({filteredApplications.length})</h3>
          {filteredApplications.length === 0 ? (
            <div className="no-applications">
              <p>No applications found for the selected filter.</p>
            </div>
          ) : (
            filteredApplications.map(application => (
              <div 
                key={application.id} 
                className={`application-item ${selectedApplication?.id === application.id ? 'selected' : ''}`}
                onClick={() => setSelectedApplication(application)}
              >
                <div className="application-preview">
                  <h4>{application.studentName}</h4>
                  <p className="course-name">{application.course}</p>
                  <p className="application-date">
                    Applied: {new Date(application.appliedDate).toLocaleDateString()}
                  </p>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(application.status) }}
                  >
                    {application.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="application-detail">
          {selectedApplication ? (
            <div className="detail-card">
              <div className="detail-header">
                <h2>{selectedApplication.studentName}</h2>
                <span 
                  className="status-badge large"
                  style={{ backgroundColor: getStatusColor(selectedApplication.status) }}
                >
                  {selectedApplication.status.toUpperCase()}
                </span>
              </div>

              <div className="detail-section">
                <h4>Application Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Application ID:</label>
                    <span>{selectedApplication.applicationId}</span>
                  </div>
                  <div className="info-item">
                    <label>Course:</label>
                    <span>{selectedApplication.course}</span>
                  </div>
                  <div className="info-item">
                    <label>Applied Date:</label>
                    <span>{new Date(selectedApplication.appliedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <span>{selectedApplication.studentEmail}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Academic Grades</h4>
                <div className="grades-grid">
                  {Object.entries(selectedApplication.studentGrades).map(([subject, grade]) => (
                    <div key={subject} className="grade-item">
                      <span className="subject">{subject}</span>
                      <span className="grade">{grade}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>Personal Statement</h4>
                <div className="personal-statement">
                  {selectedApplication.personalStatement}
                </div>
              </div>

              <div className="detail-section">
                <h4>Documents</h4>
                <div className="documents-list">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="document-item">
                      <span className="document-name">{doc}</span>
                      <button className="btn btn-outline btn-small">Download</button>
                    </div>
                  ))}
                </div>
              </div>

              {selectedApplication.status === 'pending' && (
                <div className="application-actions">
                  <button 
                    onClick={() => handleStatusUpdate(selectedApplication.id, 'accepted')}
                    className="btn btn-success"
                  >
                    Accept Application
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(selectedApplication.id, 'rejected')}
                    className="btn btn-danger"
                  >
                    Reject Application
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="no-selection">
              <p>Select an application to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InstituteApplications