import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './StudentProfile.css'

const StudentProfile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1234567890',
    address: '123 Main St, City, State',
    dateOfBirth: '2000-01-01',
    highSchool: 'City High School',
    graduationYear: '2024',
    grades: [
      { subject: 'Mathematics', grade: 'A' },
      { subject: 'Physics', grade: 'B+' },
      { subject: 'Chemistry', grade: 'A-' }
    ]
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // API call to update profile
    console.log('Updating profile:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: '+1234567890',
      address: '123 Main St, City, State',
      dateOfBirth: '2000-01-01',
      highSchool: 'City High School',
      graduationYear: '2024',
      grades: [
        { subject: 'Mathematics', grade: 'A' },
        { subject: 'Physics', grade: 'B+' },
        { subject: 'Chemistry', grade: 'A-' }
      ]
    })
    setIsEditing(false)
  }

  return (
    <div className="student-profile">
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
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Education Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>High School</label>
              <input
                type="text"
                name="highSchool"
                value={formData.highSchool}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Graduation Year</label>
              <input
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Academic Grades</h3>
          <div className="grades-list">
            {formData.grades.map((grade, index) => (
              <div key={index} className="grade-item">
                <span className="subject">{grade.subject}</span>
                <span className="grade">{grade.grade}</span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}

export default StudentProfile