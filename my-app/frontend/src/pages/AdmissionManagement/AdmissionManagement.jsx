import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './AdmissionManagement.css'

const AdmissionManagement = () => {
  const { user } = useAuth()
  const [admissionPeriods, setAdmissionPeriods] = useState([])
  const [newPeriod, setNewPeriod] = useState({
    name: '',
    startDate: '',
    endDate: '',
    instituteId: ''
  })

  useEffect(() => {
    fetchAdmissionPeriods()
  }, [])

  const fetchAdmissionPeriods = () => {
    // Mock data
    setAdmissionPeriods([
      {
        id: 1,
        name: 'Fall 2024 Admissions',
        institute: 'University of Technology',
        startDate: '2024-03-01',
        endDate: '2024-06-30',
        status: 'active',
        totalApplications: 150
      },
      {
        id: 2,
        name: 'Spring 2024 Admissions',
        institute: 'Business College',
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        status: 'closed',
        totalApplications: 89
      }
    ])
  }

  const handlePublishAdmission = (periodId) => {
    if (window.confirm('Are you sure you want to publish this admission period?')) {
      // API call to publish admission
      console.log('Publishing admission:', periodId)
    }
  }

  const handleCloseAdmission = (periodId) => {
    if (window.confirm('Are you sure you want to close this admission period?')) {
      // API call to close admission
      console.log('Closing admission:', periodId)
    }
  }

  const handleCreatePeriod = (e) => {
    e.preventDefault()
    // API call to create admission period
    console.log('Creating admission period:', newPeriod)
    setNewPeriod({
      name: '',
      startDate: '',
      endDate: '',
      instituteId: ''
    })
  }

  return (
    <div className="admission-management">
      <h1>Admission Management</h1>

      {(user.userType === 'admin' || user.userType === 'institute') && (
        <form onSubmit={handleCreatePeriod} className="admission-form">
          <h3>Create Admission Period</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Admission Period Name</label>
              <input
                type="text"
                value={newPeriod.name}
                onChange={(e) => setNewPeriod({...newPeriod, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={newPeriod.startDate}
                onChange={(e) => setNewPeriod({...newPeriod, startDate: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={newPeriod.endDate}
                onChange={(e) => setNewPeriod({...newPeriod, endDate: e.target.value})}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Admission Period
          </button>
        </form>
      )}

      <div className="admission-periods">
        <h2>Admission Periods</h2>
        <div className="periods-grid">
          {admissionPeriods.map(period => (
            <div key={period.id} className="period-card">
              <div className="period-header">
                <h3>{period.name}</h3>
                <span className={`status ${period.status}`}>
                  {period.status.toUpperCase()}
                </span>
              </div>
              <div className="period-info">
                <p><strong>Institute:</strong> {period.institute}</p>
                <p><strong>Start Date:</strong> {new Date(period.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(period.endDate).toLocaleDateString()}</p>
                <p><strong>Applications:</strong> {period.totalApplications}</p>
              </div>
              <div className="period-actions">
                {period.status === 'active' ? (
                  <button
                    onClick={() => handleCloseAdmission(period.id)}
                    className="btn btn-warning"
                  >
                    Close Admissions
                  </button>
                ) : (
                  <button
                    onClick={() => handlePublishAdmission(period.id)}
                    className="btn btn-primary"
                  >
                    Publish Admissions
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdmissionManagement