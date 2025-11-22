import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import applicationService from '../../services/applicationService'
import CourseApplicationModal from './CourseApplicationModal'
import './InstituteCard.css'

const InstituteCard = ({ institute, user }) => {
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [applying, setApplying] = useState(false)
  const [applicationStatus, setApplicationStatus] = useState(null)
  const { user: currentUser } = useAuth()

  // Mock courses data - you can replace this with real API call
  const instituteCourses = [
    { id: 1, name: 'Computer Science Bachelor', code: 'CS101', duration: '4 years', fees: '$5,000' },
    { id: 2, name: 'Electrical Engineering', code: 'EE201', duration: '4 years', fees: '$5,500' },
    { id: 3, name: 'Business Administration', code: 'BA301', duration: '3 years', fees: '$4,500' }
  ]

  const handleApplyClick = () => {
    if (!currentUser || currentUser.userType !== 'student') {
      alert('Please log in as a student to apply to courses')
      return
    }
    
    // If institute has only one course, apply directly
    if (instituteCourses.length === 1) {
      setSelectedCourse(instituteCourses[0])
      setShowApplicationModal(true)
    } else {
      // Show course selection
      setShowApplicationModal(true)
    }
  }

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
  }

const handleApplicationSubmit = async (applicationData) => {
  console.log('🟡 Starting application submission...');
  console.log('🟡 Application data:', applicationData);
  
  setApplying(true);
  setApplicationStatus(null);

  try {
    const response = await applicationService.applyToCourse(applicationData);
    
    console.log('🟢 Application response:', response);
    
    if (response.success) {
      setApplicationStatus({
        type: 'success',
        message: `Application submitted successfully! ${response.message || 'You will be notified when there are updates.'}`
      });
      setShowApplicationModal(false);
    } else {
      setApplicationStatus({
        type: 'error', 
        message: response.message || 'Failed to submit application. Please try again.'
      });
    }
  } catch (error) {
    console.error('🔴 FULL Application Error:', error);
    console.error('🔴 Error Response Data:', error.response?.data);
    console.error('🔴 Backend Error Message:', error.response?.data?.message);
    
    // Show the actual backend error message to the user
    const backendMessage = error.response?.data?.message || error.message;
    
    setApplicationStatus({
      type: 'error',
      message: backendMessage || 'Failed to submit application. Please try again.'
    });
  } finally {
    setApplying(false);
  }
};

  const closeModal = () => {
    setShowApplicationModal(false)
    setSelectedCourse(null)
  }

  return (
    <>
      <div className="institute-card">
        <div className="institute-image">
          <img src={institute.image} alt={institute.name} />
          {!institute.isAdmissionOpen && (
            <div className="admission-closed-badge">Admissions Closed</div>
          )}
        </div>
        
        <div className="institute-content">
          <h3>{institute.name}</h3>
          <p className="institute-location">
            📍 {institute.location || 'Location not specified'}
          </p>
          <p className="institute-description">
            {institute.description || 'No description available'}
          </p>
          
          <div className="institute-faculties">
            <strong>Available Faculties:</strong>
            <div className="faculties-list">
              {institute.faculties && institute.faculties.slice(0, 3).map((faculty, index) => (
                <span key={index} className="faculty-tag">{faculty}</span>
              ))}
              {institute.faculties && institute.faculties.length > 3 && (
                <span className="faculty-tag more">
                  +{institute.faculties.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <div className="institute-stats">
            <div className="stat-item">
              <span className="stat-icon">📚</span>
              <span>{institute.courses || instituteCourses.length} Courses</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">👥</span>
              <span>{institute.total_students || 'N/A'} Students</span>
            </div>
            <div className={`status ${institute.isAdmissionOpen ? 'open' : 'closed'}`}>
              {institute.isAdmissionOpen ? '✅ Admissions Open' : '❌ Admissions Closed'}
            </div>
          </div>

          {/* Application Status Message */}
          {applicationStatus && (
            <div className={`application-status ${applicationStatus.type}`}>
              {applicationStatus.message}
            </div>
          )}

          <div className="institute-actions">
            <Link to={`/institutes/${institute.id}`} className="btn btn-outline">
              View Details
            </Link>
            
            {currentUser && currentUser.userType === 'student' && institute.isAdmissionOpen && (
              <button 
                className={`btn btn-primary ${applying ? 'loading' : ''}`}
                onClick={handleApplyClick}
                disabled={applying}
              >
                {applying ? (
                  <>
                    <span className="spinner"></span>
                    Applying...
                  </>
                ) : (
                  'Apply Now'
                )}
              </button>
            )}
            
            {(!currentUser || currentUser.userType !== 'student') && institute.isAdmissionOpen && (
              <button 
                className="btn btn-primary"
                onClick={() => alert('Please log in as a student to apply')}
              >
                Apply Now
              </button>
            )}
          </div>

          {/* Contact Info */}
          <div className="institute-contact">
            {institute.contact_email && (
              <span className="contact-item">📧 {institute.contact_email}</span>
            )}
            {institute.website && (
              <span className="contact-item">🌐 {institute.website}</span>
            )}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <CourseApplicationModal
          institute={institute}
          courses={instituteCourses}
          selectedCourse={selectedCourse}
          onCourseSelect={handleCourseSelect}
          onApply={handleApplicationSubmit}
          onClose={closeModal}
          applying={applying}
        />
      )}
    </>
  )
}

export default InstituteCard