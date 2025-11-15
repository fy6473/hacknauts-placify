import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { registerLocalUser, loginLocalUser, getLocalUser, generateToken, verifyToken } from '../services/localAuth.js';

const router = express.Router();

// Middleware to check database connection
const checkDbConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database is not connected. Please try again in a moment.',
      error: 'DATABASE_UNAVAILABLE'
    });
  }
  next();
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, college } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    let token, user;
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      // Use MongoDB
      let dbUser = await User.findOne({ email });
      if (dbUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      dbUser = new User({ name, email, password, college });
      await dbUser.save();

      token = jwt.sign(
        { id: dbUser._id, email: dbUser.email, role: dbUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      user = {
        id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
      };
    } else {
      // Use local auth
      user = await registerLocalUser(name, email, password, college);
      token = generateToken(user);
    }

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user,
      usingLocalAuth: !isMongoConnected
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({
      message: error.message || 'An error occurred during registration',
      error: error.message
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    let token, user;
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      // Use MongoDB
      const dbUser = await User.findOne({ email }).select('+password');
      if (!dbUser) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordCorrect = await dbUser.comparePassword(password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      token = jwt.sign(
        { id: dbUser._id, email: dbUser.email, role: dbUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      user = {
        id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
      };
    } else {
      // Use local auth
      user = await loginLocalUser(email, password);
      token = generateToken(user);
    }

    res.status(200).json({
      message: 'Login successful',
      token,
      user,
      usingLocalAuth: !isMongoConnected
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(401).json({
      message: error.message || 'Invalid credentials',
      error: error.message
    });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const isMongoConnected = mongoose.connection.readyState === 1;
    let user;

    if (isMongoConnected) {
      user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    } else {
      user = getLocalUser(decoded.email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;