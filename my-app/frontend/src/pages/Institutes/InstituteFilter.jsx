import React from 'react'
import './InstituteFilter.css'

const InstituteFilter = ({
  searchTerm,
  setSearchTerm,
  selectedFaculty,
  setSelectedFaculty,
  faculties
}) => {
  return (
    <div className="institute-filter">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search institutes, courses, or faculties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="filter-group">
        <select
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
          className="faculty-select"
        >
          <option value="">All Faculties</option>
          {faculties.map((faculty, index) => (
            <option key={index} value={faculty}>
              {faculty}
            </option>
          ))}
        </select>
      </div>
      
      <button
        onClick={() => {
          setSearchTerm('')
          setSelectedFaculty('')
        }}
        className="btn btn-outline"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default InstituteFilter