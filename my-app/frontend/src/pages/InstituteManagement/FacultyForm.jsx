import React, { useState } from 'react'
import './FacultyForm.css'

const FacultyForm = ({ institutes, onCreateFaculty }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    institute_id: '',
    dean_name: '',
    contact_email: '',
    contact_phone: '',
    established_year: new Date().getFullYear().toString()
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.institute_id) {
      alert('Please select an institute')
      return
    }

    setLoading(true)

    try {
      const success = await onCreateFaculty(formData)
      if (success) {
        // Reset form on success
        setFormData({
          name: '',
          description: '',
          institute_id: '',
          dean_name: '',
          contact_email: '',
          contact_phone: '',
          established_year: new Date().getFullYear().toString()
        })
        alert('Faculty created successfully!')
      }
    } catch (error) {
      alert('Failed to create faculty')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="faculty-form">
      <h3>Add New Faculty</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Faculty Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Faculty of Engineering"
            required
          />
        </div>

        <div className="form-group">
          <label>Institute *</label>
          <select
            name="institute_id"
            value={formData.institute_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Institute</option>
            {institutes.map(institute => (
              <option key={institute.id} value={institute.id}>
                {institute.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Dean Name</label>
          <input
            type="text"
            name="dean_name"
            value={formData.dean_name}
            onChange={handleChange}
            placeholder="e.g., Dr. John Smith"
          />
        </div>

        <div className="form-group">
          <label>Contact Email</label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            placeholder="faculty@institute.edu"
          />
        </div>

        <div className="form-group">
          <label>Contact Phone</label>
          <input
            type="tel"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            placeholder="+1-555-0123"
          />
        </div>

        <div className="form-group">
          <label>Established Year</label>
          <input
            type="number"
            name="established_year"
            value={formData.established_year}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the faculty, its programs, and key features..."
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Add Faculty'}
        </button>
        <button 
          type="button" 
          className="btn btn-outline"
          onClick={() => setFormData({
            name: '',
            description: '',
            institute_id: '',
            dean_name: '',
            contact_email: '',
            contact_phone: '',
            established_year: new Date().getFullYear().toString()
          })}
        >
          Clear Form
        </button>
      </div>
    </form>
  )
}

export default FacultyForm