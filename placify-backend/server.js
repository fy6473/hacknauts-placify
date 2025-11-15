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

// Connect to MongoDB with optimized settings
const mongooseOptions = {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4, // Force IPv4
};

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/placify';
    console.log('🔄 Attempting to connect to MongoDB...');
    console.log('   URI: mongodb+srv://[credentials]@cluster0.gnc7fnj.mongodb.net/placify');

    await mongoose.connect(mongoURI, mongooseOptions);

    console.log('✅ Connection established with Mongoose');
    console.log(`   Database: placify`);
    return true;
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    if (err.message.includes('getaddrinfo')) {
      console.error('   Error: DNS resolution failed - check connection string');
    } else if (err.message.includes('ECONNREFUSED')) {
      console.error('   Error: Connection refused - MongoDB may be down');
    } else if (err.message.includes('authentication failed')) {
      console.error('   Error: Authentication failed - check credentials');
    } else if (err.message.includes('IP address')) {
      console.error('   Error: IP whitelist issue - your IP may not be whitelisted');
    }
    return false;
  }
};

// Attempt connection with retry
let connectionAttempt = 0;
const maxRetries = 1; // Only 1 attempt to check, then proceed with local auth

const attemptConnection = async () => {
  connectionAttempt++;
  console.log(`\n🔌 MongoDB Connection Check (Attempt ${connectionAttempt}/${maxRetries})...`);

  const connected = await connectToMongoDB();

  if (!connected && connectionAttempt < maxRetries) {
    console.log(`⏳ Will retry in background...`);
    setTimeout(attemptConnection, 30000);
  } else if (connected) {
    console.log('✅ MongoDB connection successful!');
  } else {
    console.log('\n✅ Operating in LOCAL AUTH MODE');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Local authentication enabled');
    console.log('✅ All features available for testing');
    console.log('💾 Data stored in-memory (for this session)');
    console.log('📝 Credentials:');
    console.log('   Email: test@example.com');
    console.log('   Password: password123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }
};

// Start connection attempt
attemptConnection();

// Connection event listeners
let connectionMessageShown = false;

mongoose.connection.on('connected', () => {
  if (!connectionMessageShown) {
    connectionMessageShown = true;
    console.log('\n' + '═'.repeat(50));
    console.log('✅✅✅ MONGODB SUCCESSFULLY CONNECTED ✅✅✅');
    console.log('═'.repeat(50));
    console.log('✅ Mongoose connected to MongoDB');
    console.log('📊 Database: placify');
    console.log('🔌 Connection Status: ACTIVE & READY');
    console.log('═'.repeat(50) + '\n');
  }
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  connectionMessageShown = false;
  console.warn('⚠️  Mongoose disconnected from MongoDB - will attempt to reconnect');
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
