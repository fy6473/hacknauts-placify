import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.js';
import questionRoutes from './routes/questions.js';
import blogRoutes from './routes/blogs.js';
import contactRoutes from './routes/contact.js';
import compilerRoutes from './routes/compiler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/placify')
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log(`   Database: placify`);
    console.log(`   URI: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/placify'}`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('   Please ensure MongoDB is running on your system');
    console.error('   Check MONGODB_SETUP.md for installation instructions');
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/compiler', compilerRoutes);

console.log('📡 Routes registered:');
console.log('   POST   /api/auth/register');
console.log('   POST   /api/auth/login');
console.log('   GET    /api/auth/me');
console.log('   GET    /api/questions');
console.log('   GET    /api/blogs');
console.log('   POST   /api/contact');
console.log('   POST   /api/compiler/execute');
console.log('   GET    /api/health');

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n🚀 Placify Backend Server Started');
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`📍 API Base: http://localhost:${PORT}/api`);
  console.log(`📋 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});
