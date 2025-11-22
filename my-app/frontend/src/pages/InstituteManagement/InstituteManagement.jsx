import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import instituteService from '../../services/instituteService'
import InstituteForm from './InstituteForm'
import FacultyForm from './FacultyForm'
import CourseForm from './CourseForm'
import './InstituteManagement.css'

const InstituteManagement = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('institutes')
  const [institutes, setInstitutes] = useState([])
  const [faculties, setFaculties] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const [institutesRes, facultiesRes, coursesRes] = await Promise.all([
        instituteService.getInstitutes(),
        instituteService.getFaculties(),
        instituteService.getCourses()
      ])
      
      // FIX: Extract data from response
      console.log('API Responses:', { institutesRes, facultiesRes, coursesRes })
      
      setInstitutes(institutesRes.data || [])
      setFaculties(facultiesRes.data || [])
      setCourses(coursesRes.data || [])
      
    } catch (err) {
      setError('Failed to fetch data. Please check your connection.')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateInstitute = async (instituteData) => {
    try {
      const response = await instituteService.createInstitute(instituteData)
      if (response.success) {
        await fetchData() // Refresh all data
        return true
      }
    } catch (err) {
      setError('Failed to create institute')
      console.error('Create institute error:', err)
    }
    return false
  }

  const handleCreateFaculty = async (facultyData) => {
    try {
      const response = await instituteService.createFaculty(facultyData)
      if (response.success) {
        await fetchData() // Refresh all data
        return true
      }
    } catch (err) {
      setError('Failed to create faculty')
      console.error('Create faculty error:', err)
    }
    return false
  }

  const handleCreateCourse = async (courseData) => {
    try {
      const response = await instituteService.createCourse(courseData)
      if (response.success) {
        await fetchData() // Refresh all data
        return true
      }
    } catch (err) {
      setError('Failed to create course')
      console.error('Create course error:', err)
    }
    return false
  }

  const deleteInstitute = async (id) => {
    if (window.confirm('Are you sure you want to delete this institute? This will also remove all associated faculties and courses.')) {
      try {
        await instituteService.deleteInstitute(id)
        setInstitutes(prev => prev.filter(inst => inst.id !== id))
        // Also remove associated faculties and courses from state
        setFaculties(prev => prev.filter(faculty => faculty.institute_id !== id))
        setCourses(prev => prev.filter(course => {
          const courseFaculty = faculties.find(f => f.id === course.faculty_id)
          return courseFaculty?.institute_id !== id
        }))
      } catch (err) {
        setError('Failed to delete institute')
        console.error('Delete institute error:', err)
      }
    }
  }

  const deleteFaculty = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty? This will also remove all associated courses.')) {
      try {
        await instituteService.deleteFaculty(id)
        setFaculties(prev => prev.filter(faculty => faculty.id !== id))
        setCourses(prev => prev.filter(course => course.faculty_id !== id))
      } catch (err) {
        setError('Failed to delete faculty')
        console.error('Delete faculty error:', err)
      }
    }
  }

  const deleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await instituteService.deleteCourse(id)
        setCourses(prev => prev.filter(course => course.id !== id))
      } catch (err) {
        setError('Failed to delete course')
        console.error('Delete course error:', err)
      }
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // FIXED: Check if user exists before accessing properties
  const canManageInstitutes = user && user.userType === 'admin'
  const canManageCourses = user && (user.userType === 'admin' || user.userType === 'institute')

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="institute-management">
      <div className="header-section">
        <h1>Institute Management</h1>
        <div className="user-controls">
          {user && (
            <div className="user-info">
              <span>Welcome, {user.name} ({user.userType})</span>
            </div>
          )}
          <button 
            onClick={handleLogout}
            className="btn btn-logout"
          >
            Logout
          </button>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="management-tabs">
        <button 
          className={`tab ${activeTab === 'institutes' ? 'active' : ''}`}
          onClick={() => setActiveTab('institutes')}
        >
          Institutes
        </button>
        <button 
          className={`tab ${activeTab === 'faculties' ? 'active' : ''}`}
          onClick={() => setActiveTab('faculties')}
        >
          Faculties
        </button>
        <button 
          className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'institutes' && (
          <div className="tab-panel">
            {canManageInstitutes && (
              <InstituteForm onCreateInstitute={handleCreateInstitute} />
            )}
            
            <div className="items-list">
              <h3>All Institutes ({institutes.length})</h3>
              {institutes.length === 0 ? (
                <div className="no-items">
                  <p>No institutes found.</p>
                </div>
              ) : (
                institutes.map(institute => (
                  <div key={institute.id} className="item-card">
                    <div className="item-info">
                      <h4>{institute.name}</h4>
                      <p><strong>Location:</strong> {institute.location || 'Not specified'}</p>
                      <p><strong>Contact:</strong> {institute.contact_email || 'Not specified'}</p>
                      <p><strong>Phone:</strong> {institute.contact_phone || 'Not specified'}</p>
                      <p><strong>Website:</strong> {institute.website ? (
                        <a href={institute.website} target="_blank" rel="noopener noreferrer">
                          {institute.website}
                        </a>
                      ) : 'Not specified'}</p>
                      <p><strong>Established:</strong> {institute.established_year || 'Not specified'}</p>
                      {institute.description && (
                        <p><strong>Description:</strong> {institute.description}</p>
                      )}
                      <div className="item-stats">
                        <span className="stat">
                          📚 Faculties: {faculties.filter(f => f.institute_id === institute.id).length}
                        </span>
                        <span className="stat">
                          🎓 Courses: {courses.filter(c => {
                            const courseFaculty = faculties.find(f => f.id === c.faculty_id)
                            return courseFaculty?.institute_id === institute.id
                          }).length}
                        </span>
                        <span className="stat">
                          👥 Students: {institute.total_students || 0}
                        </span>
                      </div>
                    </div>
                    {canManageInstitutes && (
                      <div className="item-actions">
                        <button 
                          onClick={() => deleteInstitute(institute.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'faculties' && (
          <div className="tab-panel">
            {canManageCourses && (
              <FacultyForm 
                institutes={institutes} 
                onCreateFaculty={handleCreateFaculty} 
              />
            )}
            
            <div className="items-list">
              <h3>All Faculties ({faculties.length})</h3>
              {faculties.length === 0 ? (
                <div className="no-items">
                  <p>No faculties found.</p>
                </div>
              ) : (
                faculties.map(faculty => (
                  <div key={faculty.id} className="item-card">
                    <div className="item-info">
                      <h4>{faculty.name}</h4>
                      <p><strong>Institute:</strong> {faculty.institute_name}</p>
                      <p><strong>Dean:</strong> {faculty.dean_name || 'Not specified'}</p>
                      <p><strong>Contact Email:</strong> {faculty.contact_email || 'Not specified'}</p>
                      <p><strong>Contact Phone:</strong> {faculty.contact_phone || 'Not specified'}</p>
                      <p><strong>Established:</strong> {faculty.established_year || 'Not specified'}</p>
                      {faculty.description && (
                        <p><strong>Description:</strong> {faculty.description}</p>
                      )}
                      <div className="item-stats">
                        <span className="stat">
                          📖 Courses: {courses.filter(c => c.faculty_id === faculty.id).length}
                        </span>
                      </div>
                    </div>
                    {canManageCourses && (
                      <div className="item-actions">
                        <button 
                          onClick={() => deleteFaculty(faculty.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="tab-panel">
            {canManageCourses && (
              <CourseForm 
                faculties={faculties} 
                onCreateCourse={handleCreateCourse} 
              />
            )}
            
            <div className="items-list">
              <h3>All Courses ({courses.length})</h3>
              {courses.length === 0 ? (
                <div className="no-items">
                  <p>No courses found.</p>
                </div>
              ) : (
                courses.map(course => (
                  <div key={course.id} className="item-card">
                    <div className="item-info">
                      <h4>{course.name}</h4>
                      <p><strong>Code:</strong> {course.code}</p>
                      <p><strong>Faculty:</strong> {course.faculty_name}</p>
                      <p><strong>Institute:</strong> {course.institute_name}</p>
                      <p><strong>Duration:</strong> {course.duration} {course.duration_unit}</p>
                      <p><strong>Capacity:</strong> {course.intake_capacity || 'Not set'} students</p>
                      <p><strong>Deadline:</strong> {course.application_deadline ? 
                        new Date(course.application_deadline).toLocaleDateString() : 'Not set'
                      }</p>
                      {course.description && (
                        <p><strong>Description:</strong> {course.description}</p>
                      )}
                      <div className="item-stats">
                        <span className="stat">
                          💰 Domestic: ${course.fees ? JSON.parse(course.fees).domestic || 'N/A' : 'N/A'}
                        </span>
                        <span className="stat">
                          🌍 International: ${course.fees ? JSON.parse(course.fees).international || 'N/A' : 'N/A'}
                        </span>
                      </div>
                    </div>
                    {canManageCourses && (
                      <div className="item-actions">
                        <button 
                          onClick={() => deleteCourse(course.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InstituteManagement