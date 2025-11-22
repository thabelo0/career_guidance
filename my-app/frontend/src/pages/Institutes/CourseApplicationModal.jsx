import React, { useState } from 'react'
import './CourseApplicationModal.css'

const CourseApplicationModal = ({ 
  institute, 
  courses, 
  selectedCourse, 
  onCourseSelect, 
  onApply, 
  onClose,
  applying 
}) => {
  const [personalStatement, setPersonalStatement] = useState('')
  const [preferredMajor, setPreferredMajor] = useState('')

  const handleSubmit = () => {
    if (!selectedCourse) {
      alert('Please select a course first')
      return
    }

    if (!personalStatement.trim() || personalStatement.length < 50) {
      alert('Please provide a personal statement with at least 50 characters')
      return
    }

    onApply({
      courseId: selectedCourse.id,
      preferredMajor: preferredMajor.trim(),
      personalStatement: personalStatement.trim(),
      documents: []
    })
  }

  const isFormValid = selectedCourse && personalStatement.length >= 50

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Apply to {institute.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {/* Course Selection */}
          {!selectedCourse && (
            <div className="course-selection">
              <h3>Select a Course</h3>
              <div className="courses-list">
                {courses.map(course => (
                  <div 
                    key={course.id} 
                    className="course-option"
                    onClick={() => onCourseSelect(course)}
                  >
                    <div className="course-info">
                      <strong>{course.name}</strong>
                      <span className="course-code">{course.code}</span>
                    </div>
                    <div className="course-details">
                      <span>Duration: {course.duration}</span>
                      <span>Fees: {course.fees}</span>
                    </div>
                    <div className="select-indicator">→</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Application Form */}
          {selectedCourse && (
            <div className="application-form">
              <div className="selected-course">
                <h4>Selected Course:</h4>
                <div className="course-card">
                  <strong>{selectedCourse.name}</strong>
                  <span className="course-code">{selectedCourse.code}</span>
                  <button 
                    className="change-course-btn"
                    onClick={() => onCourseSelect(null)}
                  >
                    Change Course
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="preferredMajor">Preferred Major/Specialization (Optional)</label>
                <input
                  id="preferredMajor"
                  type="text"
                  value={preferredMajor}
                  onChange={(e) => setPreferredMajor(e.target.value)}
                  placeholder="e.g., Software Engineering, Data Science, AI"
                />
              </div>

              <div className="form-group">
                <label htmlFor="personalStatement">
                  Personal Statement *
                  <span className="char-count">
                    {personalStatement.length}/50 characters minimum
                  </span>
                </label>
                <textarea
                  id="personalStatement"
                  value={personalStatement}
                  onChange={(e) => setPersonalStatement(e.target.value)}
                  placeholder="Explain why you're interested in this course, your background, career goals, and why you'd be a good fit for this program..."
                  rows="6"
                  required
                />
                {personalStatement.length > 0 && personalStatement.length < 50 && (
                  <div className="validation-error">
                    Please write at least {50 - personalStatement.length} more characters
                  </div>
                )}
              </div>

              <div className="application-notes">
                <h4>Important Notes:</h4>
                <ul>
                  <li>You can only apply to 2 courses per institute</li>
                  <li>Applications are reviewed within 5-7 business days</li>
                  <li>You'll receive email notifications about your application status</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          
          {selectedCourse && (
            <button 
              className={`btn btn-primary ${applying ? 'loading' : ''}`}
              onClick={handleSubmit}
              disabled={!isFormValid || applying}
            >
              {applying ? (
                <>
                  <span className="spinner"></span>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseApplicationModal