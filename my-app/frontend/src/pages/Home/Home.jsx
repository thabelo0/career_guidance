import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Home.css'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Career Path</h1>
          <p>Discover higher learning institutions, explore courses, and apply online with ease.</p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary">Get Started</Link>
              <Link to="/institutes" className="btn btn-secondary">Browse Institutes</Link>
            </div>
        
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <h3>For Students</h3>
            <p>Discover courses, check eligibility, and apply to multiple institutes seamlessly.</p>
          </div>
          <div className="feature-card">
            <h3>For Institutes</h3>
            <p>Showcase your programs and manage applications efficiently.</p>
          </div>
          <div className="feature-card">
            <h3>Smart Matching</h3>
            <p>Find courses that match your qualifications and interests.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home