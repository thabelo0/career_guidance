import React, { createContext, useState, useContext, useEffect } from 'react'
import authService from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user was previously logged in (without token)
    const checkAuth = async () => {
      try {
        // Since we're not using tokens, we'll just check if user exists in localStorage
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('user')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // In AuthContext.jsx - Update the login function to use the new system
const login = async (email, password, userType) => {
  try {
    console.log('AuthContext: Attempting login...');
    
    const response = await authService.login(email, password, userType);
    
    if (response.user) {
      console.log('AuthContext: Login successful, user:', response.user);
      
      // Store user in localStorage (NO TOKEN)
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
      setLoading(false);
      
      return { success: true, user: response.user };
    } else {
      throw new Error('Login failed - no user data received');
    }
  } catch (error) {
    console.error('AuthContext: Login error:', error);
    
    // Clear any existing user data
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove token if it exists
    
    setUser(null);
    setLoading(false);
    
    return { 
      success: false, 
      message: error.response?.data?.message || error.message || 'Login failed' 
    };
  }
};

  const register = async (userData, userType) => {
    try {
      console.log('AuthContext: Attempting registration...')
      const response = await authService.register(userData, userType)
      console.log('AuthContext: Registration response:', response)
      return response
    } catch (error) {
      console.error('AuthContext: Registration error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}