import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './InstituteProfile.css'

const InstituteProfile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1-555-0123',
    address: '123 Education Avenue, City, State 12345',
    website: 'www.institute.edu',
    establishedYear: '1990',
    description: 'A leading educational institution dedicated to excellence in higher education.',
    contactPerson: 'Dr. John Smith',
    contactPersonPosition: 'Admissions Director',
    totalStudents: '5000',
    totalFaculties: '8',
    accreditation: 'National Education Board'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // API call to update institute profile
    console.log('Updating institute profile:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: user.name,
      email: user.email,
      phone: '+1-555-0123',
      address: '123 Education Avenue, City, State 12345',
      website: 'www.institute.edu',
      establishedYear: '1990',
      description: 'A leading educational institution dedicated to excellence in higher education.',
      contactPerson: 'Dr. John Smith',
      contactPersonPosition: 'Admissions Director',
      totalStudents: '5000',
      totalFaculties: '8',
      accreditation: 'National Education Board'
    })
    setIsEditing(false)
  }

  return (
    <div className="institute-profile">
      <div className="profile-header">
        <div className="profile-info">
          <h2>{formData.name}</h2>
          <p className="institute-type">Higher Education Institute</p>
          <p className="established">Established: {formData.establishedYear}</p>
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

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Institute Name</label>
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
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group full-width">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Institute Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Established Year</label>
              <input
                type="number"
                name="establishedYear"
                value={formData.establishedYear}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Total Students</label>
              <input
                type="number"
                name="totalStudents"
                value={formData.totalStudents}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Total Faculties</label>
              <input
                type="number"
                name="totalFaculties"
                value={formData.totalFaculties}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Accreditation</label>
              <input
                type="text"
                name="accreditation"
                value={formData.accreditation}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Contact Person Position</label>
              <input
                type="text"
                name="contactPersonPosition"
                value={formData.contactPersonPosition}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Institute Description</h3>
          <div className="form-group full-width">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditing}
              rows="6"
              placeholder="Describe your institute, mission, vision, and key features..."
            />
          </div>
        </div>

        {!isEditing && (
          <div className="institute-stats">
            <h3>Quick Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{formData.totalStudents}+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{formData.totalFaculties}</span>
                <span className="stat-label">Faculties</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">25+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default InstituteProfile