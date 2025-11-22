import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
})


const authService = {
  async login(email, password, userType) {
    const response = await api.post('/auth/login', { email, password, userType })
    
    if (response.data.success) {
      // Store only user data, no token
      const userData = response.data.data.user;
      localStorage.setItem('user', JSON.stringify(userData));
      
      return {
        user: userData
      }
    } else {
      throw new Error(response.data.message || 'Login failed')
    }
  },

  async register(userData, userType) {
    const response = await api.post('/auth/register', { ...userData, userType })
    
    if (response.data.success) {
      return response.data
    } else {
      throw new Error(response.data.message || 'Registration failed')
    }
  },

  async getCurrentUser() {

    try {
      const response = await api.get('/auth/me')
      if (response.data.success) {
        return response.data.data.user
      } else {
        throw new Error('Failed to get current user')
      }
    } catch (error) {
      // Fallback to localStorage
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      return user;
    }
  },

  logout() {

    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Clean up any old tokens
  },

  getStoredUser() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user;
  }
}

export default authService