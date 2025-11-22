import axios from 'axios'

const API_URL = '/api'

const api = axios.create({
  baseURL: API_URL,
})

// Add user ID to requests instead of token
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  console.log('🟡 Institute Service - Current user:', user?.id, user?.name);
  
  if (user && user.id) {
    config.headers['X-User-Id'] = user.id;
    console.log('🟡 Institute Service - Set X-User-Id header:', user.id);
  } else {
    console.warn('⚠️ Institute Service - No user ID found in localStorage');
  }
  return config;
});

// Enhanced response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('🔴 Institute Service API Error:')
    console.error('URL:', error.config?.url)
    console.error('Method:', error.config?.method)
    console.error('Response:', error.response?.data)
    console.error('Status:', error.response?.status)
    throw error
  }
)

const instituteService = {
  // Institute management
  async getInstitutes() {
    const response = await api.get('/institutes')
    return response.data
  },

  async getInstituteById(instituteId) {
    const response = await api.get(`/institutes/${instituteId}`)
    return response.data
  },

  async createInstitute(instituteData) {
    const response = await api.post('/institutes', instituteData)
    return response.data
  },

  async deleteInstitute(instituteId) {
    const response = await api.delete(`/institutes/${instituteId}`)
    return response.data
  },

  // Faculty management
  async getFaculties() {
    const response = await api.get('/institutes/faculties/all')
    return response.data
  },

  async getInstituteFaculties(instituteId) {
    const response = await api.get(`/institutes/${instituteId}/faculties`)
    return response.data
  },

  async createFaculty(facultyData) {
    const response = await api.post('/institutes/faculties', facultyData)
    return response.data
  },

  async updateFaculty(facultyId, facultyData) {
    const response = await api.put(`/institutes/faculties/${facultyId}`, facultyData)
    return response.data
  },

  async deleteFaculty(facultyId) {
    const response = await api.delete(`/institutes/faculties/${facultyId}`)
    return response.data
  },

  // Course management
  async getCourses() {
    const response = await api.get('/institutes/courses/all')
    return response.data
  },

  async getInstituteCourses(instituteId) {
    const response = await api.get(`/institutes/${instituteId}/courses`)
    return response.data
  },

  async getCourseById(courseId) {
    const response = await api.get(`/courses/${courseId}`)
    return response.data
  },

  async createCourse(courseData) {
    const response = await api.post('/institutes/courses', courseData)
    return response.data
  },

  async updateCourse(courseId, courseData) {
    const response = await api.put(`/institutes/courses/${courseId}`, courseData)
    return response.data
  },

  async deleteCourse(courseId) {
    const response = await api.delete(`/institutes/courses/${courseId}`)
    return response.data
  },

  // Institute applications
  async getInstituteApplications(filters = {}) {
    const params = new URLSearchParams()
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key])
    })
    
    const response = await api.get(`/applications/institute?${params.toString()}`)
    return response.data
  },

  async updateApplicationStatus(applicationId, statusData) {
    const response = await api.put(`/applications/${applicationId}/status`, statusData)
    return response.data
  },

  // Admission periods management
  async getAdmissionPeriods() {
    const response = await api.get('/institutes/admission/periods')
    return response.data
  },

  async createAdmissionPeriod(periodData) {
    const response = await api.post('/institutes/admission/periods', periodData)
    return response.data
  },

  async updateAdmissionPeriod(periodId, periodData) {
    const response = await api.put(`/institutes/admission/periods/${periodId}`, periodData)
    return response.data
  },

  async publishAdmissions(periodId) {
    const response = await api.put(`/institutes/admission/periods/${periodId}/publish`)
    return response.data
  },

  // Institute profile management
  async updateInstituteProfile(profileData) {
    const response = await api.put('/institutes/profile', profileData)
    return response.data
  },

  async getInstituteStats() {
    const response = await api.get('/institutes/stats')
    return response.data
  },

  // Student eligibility check
  async checkCourseEligibility(courseId) {
    const response = await api.get(`/students/courses/${courseId}/eligibility`)
    return response.data
  }
}

export default instituteService