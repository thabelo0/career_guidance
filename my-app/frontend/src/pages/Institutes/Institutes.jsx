import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import InstituteCard from './InstituteCard'
import InstituteFilter from './InstituteFilter'
import instituteService from '../../services/instituteService'
import './Institutes.css'

const Institutes = () => {
  const [institutes, setInstitutes] = useState([])
  const [filteredInstitutes, setFilteredInstitutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFaculty, setSelectedFaculty] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    fetchInstitutes()
  }, [])

  useEffect(() => {
    filterInstitutes()
  }, [institutes, searchTerm, selectedFaculty])

  const fetchInstitutes = async () => {
    try {
      // Use real API call instead of mock data
      const response = await instituteService.getInstitutes()
      
      if (response.success) {
        // Transform the API data to match your component expectations
        const institutesData = response.data.map(institute => ({
          id: institute.id,
          name: institute.name,
          description: institute.description || 'No description available',
          location: institute.location || 'Location not specified',
          // Get unique faculties from the institute's faculties
          faculties: getInstituteFaculties(institute.id),
          // Get course count from the institute's courses
          courses: getInstituteCourseCount(institute.id),
          image: institute.logo_url || '/api/placeholder/300/200',
          isAdmissionOpen: hasActiveAdmissions(institute.id),
          // Include additional real data
          contact_email: institute.contact_email,
          contact_phone: institute.contact_phone,
          website: institute.website,
          established_year: institute.established_year,
          total_students: institute.total_students,
          accreditation: institute.accreditation,
          address: institute.address
        }))
        
        setInstitutes(institutesData)
      } else {
        console.error('Failed to fetch institutes:', response.message)
        setInstitutes([])
      }
    } catch (error) {
      console.error('Error fetching institutes:', error)
      setInstitutes([])
    } finally {
      setLoading(false)
    }
  }

  // Helper function to get faculties for an institute
  const getInstituteFaculties = (instituteId) => {
    // This would ideally come from your API
    // For now, return some default faculties based on institute type
    const facultyMap = {
      1: ['Engineering', 'Computer Science', 'Business Administration', 'Mechanical Engineering'],
      2: ['Business', 'Economics', 'Management', 'Finance'],
      3: ['Medicine', 'Nursing', 'Pharmacy', 'Health Sciences']
    }
    return facultyMap[instituteId] || ['General Studies']
  }

  // Helper function to get course count for an institute
  const getInstituteCourseCount = (instituteId) => {
    // This would come from your API - using sample data for now
    const courseCountMap = {
      1: 45, // University of Technology
      2: 32, // Business College
      3: 28  // Medical School
    }
    return courseCountMap[instituteId] || 15
  }

  // Helper function to check if institute has active admissions
  const hasActiveAdmissions = (instituteId) => {
    // This would come from your admission periods API
    // For now, return true for some institutes
    return instituteId !== 3 // Medical School closed for demo
  }

  const filterInstitutes = () => {
    let filtered = institutes

    if (searchTerm) {
      filtered = filtered.filter(institute =>
        institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (institute.faculties && institute.faculties.some(faculty => 
          faculty.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      )
    }

    if (selectedFaculty) {
      filtered = filtered.filter(institute =>
        institute.faculties && institute.faculties.some(faculty => 
          faculty.toLowerCase() === selectedFaculty.toLowerCase()
        )
      )
    }

    setFilteredInstitutes(filtered)
  }

  // Get all unique faculties from all institutes
  const allFaculties = [...new Set(institutes.flatMap(inst => inst.faculties || []))]

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading institutes...</p>
      </div>
    )
  }

  return (
    <div className="institutes-page">
      <div className="institutes-header">
        <h1>Higher Learning Institutes</h1>
        <p>Discover and explore all available educational institutions with real data</p>
        
        {/* Statistics */}
        <div className="institute-stats">
          <div className="stat-item">
            <span className="stat-number">{institutes.length}</span>
            <span className="stat-label">Institutes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {institutes.reduce((total, inst) => total + (inst.courses || 0), 0)}
            </span>
            <span className="stat-label">Total Courses</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {institutes.filter(inst => inst.isAdmissionOpen).length}
            </span>
            <span className="stat-label">Open for Admission</span>
          </div>
        </div>
      </div>

      <InstituteFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFaculty={selectedFaculty}
        setSelectedFaculty={setSelectedFaculty}
        faculties={allFaculties}
        totalInstitutes={institutes.length}
        filteredCount={filteredInstitutes.length}
      />

      <div className="institutes-grid">
        {filteredInstitutes.length === 0 ? (
          <div className="no-results">
            <h3>No institutes found</h3>
            <p>Try adjusting your search criteria or browse all institutes</p>
            {searchTerm || selectedFaculty ? (
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedFaculty('')
                }}
              >
                Clear Filters
              </button>
            ) : null}
          </div>
        ) : (
          filteredInstitutes.map(institute => (
            <InstituteCard
              key={institute.id}
              institute={institute}
              user={user}
            />
          ))
        )}
      </div>

     
    </div>
  )
}

export default Institutes