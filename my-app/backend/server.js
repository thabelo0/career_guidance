import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
config();

import { testConnection } from './config/database.js';

import authRoutes from './routes/auth.js';
import instituteRoutes from './routes/institutes.js';
import studentRoutes from './routes/students.js';
import applicationRoutes from './routes/applications.js';
import adminRoutes from './routes/admin.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({origin: [
    'http://localhost:3000',
    'http://localhost:5174', 
    'http://localhost:5173', 
    'http://127.0.0.1:5174',  
    'http://127.0.0.1:5173'   
  ],
  credentials: true
}));

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

testConnection();

app.use('/api/auth', authRoutes);
app.use('/api/institutes', instituteRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Career Guidance API is running',
    timestamp: new Date().toISOString()
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'All routes are working!',
    data: { 
      version: '1.0.0',
      routes: ['auth', 'institutes', 'students', 'applications', 'admin']
    }
  });
});

// 404 errot handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      message: 'Duplicate entry found'
    });
  }
  
  // MySQL connection errors
  if (error.code === 'ECONNREFUSED' || error.code === 'PROTOCOL_CONNECTION_LOST') {
    return res.status(503).json({
      success: false,
      message: 'Database connection error'
    });
  }

  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Career Guidance Platform API`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(` Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(' Available Routes:');
  console.log('   POST   /api/auth/register');
  console.log('   POST   /api/auth/login');
  console.log('   GET    /api/auth/me');
  console.log('   GET    /api/institutes');
  console.log('   GET    /api/institutes/:id');
  console.log('   GET    /api/students/profile');
  console.log('   POST   /api/applications/apply');
  console.log('   GET    /api/admin/stats');
  console.log(' Test the server:');
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Test: http://localhost:${PORT}/api/test`);
});
