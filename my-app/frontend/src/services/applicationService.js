import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
})

// Use the same interceptor as instituteService
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  console.log('🟡 Application Service - Current user:', user?.id, user?.name);
  
  if (user && user.id) {
    config.headers['X-User-Id'] = user.id;
    console.log('🟡 Application Service - Set X-User-Id header:', user.id);
  } else {
    console.warn('⚠️ Application Service - No user ID found in localStorage');
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('🔴 API Error Details:');
    console.error('URL:', error.config?.url);
    console.error('Method:', error.config?.method);
    console.error('Data:', error.config?.data);
    console.error('Full Error Response:', error.response); // ← ADD THIS
    console.error('Response Data:', error.response?.data); // ← AND THIS
    console.error('Response Message:', error.response?.data?.message); // ← AND THIS
    console.error('Status:', error.response?.status);
    return Promise.reject(error);
  }
)

const applicationService = {
  async getStudentApplications() {
    const response = await api.get('/applications/student')
    return response.data
  },

  async applyToCourse(applicationData) {
    const response = await api.post('/applications/apply', applicationData)
    return response.data
  },

  async withdrawApplication(applicationId) {
    const response = await api.delete(`/applications/${applicationId}/withdraw`)
    return response.data
  },

  async getApplicationStatus(applicationId) {
    const response = await api.get(`/applications/${applicationId}`)
    return response.data
  },

  async checkEligibility(courseId) {
    const response = await api.get(`/students/courses/${courseId}/eligibility`)
    return response.data
  }
}

export default applicationService