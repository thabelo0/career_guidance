import React, { useState } from 'react'

const InstituteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    contactEmail: '',
    contactPhone: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Adding institute:', formData)
    // API call to add institute
    setFormData({
      name: '',
      location: '',
      description: '',
      contactEmail: '',
      contactPhone: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="management-form">
      <h3>Add New Institute</h3>
      <div className="form-grid">
       
        
      </div>
      
    </form>
  )
}

export default InstituteForm