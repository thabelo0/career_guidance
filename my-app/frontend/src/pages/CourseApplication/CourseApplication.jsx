import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './CourseApplication.css'

const CourseApplication = () => {
  const { courseId, instituteId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [institute, setInstitute] = useState(null)
  const [studentApplications, setStudentApplications] = useState([])
  const [isEligible, setIsEligible] = useState(false)
  const [eligibilityMessage, setEligibilityMessage] = useState('')
  const [applicationData, setApplicationData] = useState({
    preferredMajor: '',
    personalStatement: '',
    documents: []
  })

  useEffect(() => {
    fetchCourseData()
    fetchStudentApplications()
  }, [courseId, instituteId])

  const fetchCourseData = () => {
    // Mock data
    setCourse({
      id: courseId,
      name: 'Computer Science BSc',
      faculty: 'Computer Science',
      duration: '4 years',
      requirements: {
        minGrade: 'B+',
        requiredSubjects: ['Mathematics', 'Physics'],
        minGPA: 3.0
      },
      description: 'Comprehensive computer science program...'
    })
    setInstitute({
      id: instituteId,
      name: 'University of Technology'
    })
  }

  const fetchStudentApplications = () => {
    // Mock data - check if student already has applications
    setStudentApplications([
      { instituteId: '1', courses: ['CS101', 'CS102'] },
      { instituteId: '2', courses: ['BUS101'] }
    ])
  }

  const checkEligibility = () => {
    // Mock eligibility check
    const studentGrades = {
      'Mathematics': 'A',
      'Physics': 'B+',
      'Chemistry': 'A-'
    }

    const hasRequiredSubjects = course.requirements.requiredSubjects.every(
      subject => studentGrades[subject]
    )

    if (!hasRequiredSubjects) {
      setIsEligible(false)
      setEligibilityMessage('You are missing required subjects')
      return
    }

    // Check if already applied to 2 courses in this institute
    const instituteApps = studentApplications.find(app => app.instituteId === instituteId)
    if (instituteApps && instituteApps.courses.length >= 2) {
      setIsEligible(false)
      setEligibilityMessage('You can only apply to maximum 2 courses per institute')
      return
    }

    setIsEligible(true)
    setEligibilityMessage('You are eligible to apply for this course')
  }

  const handleSubmitApplication = (e) => {
    e.preventDefault()
    
    if (!isEligible) {
      alert('You are not eligible for this course')
      return
    }

    // Check if already enrolled in another institute
    const hasOtherInstituteAcceptance = studentApplications.some(app => 
      app.status === 'accepted' && app.instituteId !== instituteId
    )

    if (hasOtherInstituteAcceptance) {
      alert('You are already admitted to another institute. You cannot apply to multiple institutes.')
      return
    }

    // Submit application
    console.log('Submitting application:', applicationData)
    navigate('/applications')
  }

  if (!course || !institute) {
    return <div className="loading">Loading course information...</div>
  }

  return (
    <div className="course-application">
      <div className="application-header">
        <h1>Apply to {course.name}</h1>
        <p>at {institute.name}</p>
      </div>

      <div className="application-content">
        <div className="course-info">
          <h3>Course Information</h3>
          <p><strong>Faculty:</strong> {course.faculty}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Description:</strong> {course.description}</p>
          
          <div className="requirements">
            <h4>Entry Requirements:</h4>
            <ul>
              <li>Minimum Grade: {course.requirements.minGrade}</li>
              <li>Required Subjects: {course.requirements.requiredSubjects.join(', ')}</li>
              <li>Minimum GPA: {course.requirements.minGPA}</li>
            </ul>
          </div>

          <button onClick={checkEligibility} className="btn btn-primary">
            Check Eligibility
          </button>

          {eligibilityMessage && (
            <div className={`eligibility-message ${isEligible ? 'eligible' : 'not-eligible'}`}>
              {eligibilityMessage}
            </div>
          )}
        </div>

        {isEligible && (
          <form onSubmit={handleSubmitApplication} className="application-form">
            <h3>Application Form</h3>
            
            <div className="form-group">
              <label>Preferred Major/Concentration</label>
              <input
                type="text"
                value={applicationData.preferredMajor}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  preferredMajor: e.target.value
                })}
                required
              />
            </div>

            <div className="form-group">
              <label>Personal Statement</label>
              <textarea
                value={applicationData.personalStatement}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  personalStatement: e.target.value
                })}
                rows="6"
                required
                placeholder="Explain why you are interested in this course and why you would be a good fit..."
              />
            </div>

            <div className="form-group">
              <label>Upload Documents</label>
              <div className="documents-upload">
                <input type="file" multiple />
                <small>Upload transcripts, certificates, and other required documents</small>
              </div>
            </div>

            <div className="application-warnings">
              <div className="warning">
                <strong>Important:</strong> You can only apply to maximum 2 courses per institute
              </div>
              <div className="warning">
                <strong>Note:</strong> You cannot be admitted to multiple institutes simultaneously
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default CourseApplication