// frontend/src/components/student/ApplicationForm.jsx
import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/api';

const ApplicationForm = ({ instituteId, onSuccess }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
    loadQualifications();
  }, [instituteId]);

  const loadCourses = async () => {
    try {
      const response = await studentService.getCourses(instituteId);
      setCourses(response.data);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const loadQualifications = async () => {
    // Load student qualifications
    // This would come from student profile
  };

  const handleCourseSelect = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else if (selectedCourses.length < 2) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await studentService.apply({
        instituteId,
        courseIds: selectedCourses,
        qualifications
      });
      onSuccess();
    } catch (error) {
      console.error('Application failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Select Courses (Max 2)</h3>
        <div className="space-y-2">
          {courses.map(course => (
            <label key={course.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedCourses.includes(course.id)}
                onChange={() => handleCourseSelect(course.id)}
                disabled={selectedCourses.length >= 2 && !selectedCourses.includes(course.id)}
                className="rounded border-gray-300"
              />
              <span>{course.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={selectedCourses.length === 0 || loading}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Applying...' : 'Apply'}
      </button>
    </form>
  );
};

export default ApplicationForm;