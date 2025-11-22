import React, { useState } from 'react'
import './CourseForm.css'

const CourseForm = ({ faculties, onCreateCourse }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    faculty_id: '',
    duration: '4',
    duration_unit: 'years',
    description: '',
    requirements: {
      minGrade: 'C+',
      requiredSubjects: [],
      minGPA: 2.5,
      entranceExam: false
    },
    fees: {
      domestic: '',
      international: ''
    },
    intake_capacity: '',
    application_deadline: ''
  })

  const [newSubject, setNewSubject] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.startsWith('requirements.')) {
      const requirementField = name.split('.')[1]
      setFormData({
        ...formData,
        requirements: {
          ...formData.requirements,
          [requirementField]: type === 'checkbox' ? checked : value
        }
      })
    } else if (name.startsWith('fees.')) {
      const feeField = name.split('.')[1]
      setFormData({
        ...formData,
        fees: {
          ...formData.fees,
          [feeField]: value ? parseFloat(value) : ''
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleAddSubject = () => {
    if (newSubject.trim() && !formData.requirements.requiredSubjects.includes(newSubject.trim())) {
      setFormData({
        ...formData,
        requirements: {
          ...formData.requirements,
          requiredSubjects: [...formData.requirements.requiredSubjects, newSubject.trim()]
        }
      })
      setNewSubject('')
    }
  }

  const handleRemoveSubject = (subjectToRemove) => {
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        requiredSubjects: formData.requirements.requiredSubjects.filter(
          subject => subject !== subjectToRemove
        )
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.faculty_id) {
      alert('Please select a faculty')
      return
    }

    setLoading(true)

    try {
      // Prepare course data for API - match MySQL field names
      const courseData = {
        name: formData.name,
        code: formData.code,
        faculty_id: formData.faculty_id,
        duration: formData.duration,
        duration_unit: formData.duration_unit,
        description: formData.description,
        requirements: formData.requirements,
        fees: formData.fees,
        intake_capacity: formData.intake_capacity ? parseInt(formData.intake_capacity) : undefined,
        application_deadline: formData.application_deadline || undefined
      }

      const success = await onCreateCourse(courseData)
      if (success) {
        // Reset form on success
        setFormData({
          name: '',
          code: '',
          faculty_id: '',
          duration: '4',
          duration_unit: 'years',
          description: '',
          requirements: {
            minGrade: 'C+',
            requiredSubjects: [],
            minGPA: 2.5,
            entranceExam: false
          },
          fees: {
            domestic: '',
            international: ''
          },
          intake_capacity: '',
          application_deadline: ''
        })
        setNewSubject('')
        alert('Course added successfully!')
      }
    } catch (error) {
      alert('Failed to create course')
    } finally {
      setLoading(false)
    }
  }

  const gradeOptions = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D']

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <h3>Add New Course</h3>
      
      <div className="form-sections">
        <div className="form-section">
          <h4>Basic Information</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Course Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Computer Science Bachelor"
                required
              />
            </div>

            <div className="form-group">
              <label>Course Code *</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g., CS101"
                required
              />
            </div>

            <div className="form-group">
              <label>Faculty *</label>
              <select
                name="faculty_id"
                value={formData.faculty_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Faculty</option>
                {faculties.map(faculty => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name} - {faculty.institute_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Duration</label>
              <div className="duration-inputs">
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  max="10"
                />
                <select
                  name="duration_unit"
                  value={formData.duration_unit}
                  onChange={handleChange}
                >
                  <option value="years">Years</option>
                  <option value="semesters">Semesters</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Intake Capacity</label>
              <input
                type="number"
                name="intake_capacity"
                value={formData.intake_capacity}
                onChange={handleChange}
                placeholder="e.g., 100"
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Application Deadline</label>
              <input
                type="date"
                name="application_deadline"
                value={formData.application_deadline}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Course Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the course curriculum, objectives, and career prospects..."
            />
          </div>
        </div>

        <div className="form-section">
          <h4>Admission Requirements</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Minimum Grade Required</label>
              <select
                name="requirements.minGrade"
                value={formData.requirements.minGrade}
                onChange={handleChange}
              >
                {gradeOptions.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Minimum GPA</label>
              <input
                type="number"
                name="requirements.minGPA"
                value={formData.requirements.minGPA}
                onChange={handleChange}
                min="0"
                max="4"
                step="0.1"
              />
            </div>

            <div className="form-group full-width">
              <label>Entrance Exam Required</label>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  name="requirements.entranceExam"
                  checked={formData.requirements.entranceExam}
                  onChange={handleChange}
                />
                <span>Students must pass an entrance exam</span>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Required Subjects</label>
              <div className="subjects-input">
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g., Mathematics"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubject())}
                />
                <button 
                  type="button" 
                  onClick={handleAddSubject}
                  className="btn btn-outline btn-small"
                >
                  Add
                </button>
              </div>
              
              {formData.requirements.requiredSubjects.length > 0 && (
                <div className="subjects-list">
                  {formData.requirements.requiredSubjects.map((subject, index) => (
                    <span key={index} className="subject-tag">
                      {subject}
                      <button 
                        type="button"
                        onClick={() => handleRemoveSubject(subject)}
                        className="remove-subject"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h4>Fee Structure</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Domestic Fees ($)</label>
              <input
                type="number"
                name="fees.domestic"
                value={formData.fees.domestic}
                onChange={handleChange}
                placeholder="e.g., 5000"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>International Fees ($)</label>
              <input
                type="number"
                name="fees.international"
                value={formData.fees.international}
                onChange={handleChange}
                placeholder="e.g., 15000"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Add Course'}
        </button>
        <button 
          type="button" 
          className="btn btn-outline"
          onClick={() => setFormData({
            name: '',
            code: '',
            faculty_id: '',
            duration: '4',
            duration_unit: 'years',
            description: '',
            requirements: {
              minGrade: 'C+',
              requiredSubjects: [],
              minGPA: 2.5,
              entranceExam: false
            },
            fees: {
              domestic: '',
              international: ''
            },
            intake_capacity: '',
            application_deadline: ''
          })}
        >
          Clear Form
        </button>
      </div>
    </form>
  )
}

export default CourseForm