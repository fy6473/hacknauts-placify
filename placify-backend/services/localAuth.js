import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

// In-memory user store (for when MongoDB is unavailable)
const localUsers = {
  'test@example.com': {
    id: 'local_1',
    name: 'Test User',
    email: 'test@example.com',
    password: '$2a$10$K7yPd9qHSQOZZbHlFi5h..ZbUlbYNMzYpxQD.3YqJDL.WjYXkKfHC', // hashed: password123
    college: 'Test College'
  },
  'demo@example.com': {
    id: 'local_2',
    name: 'Demo User',
    email: 'demo@example.com',
    password: '$2a$10$K7yPd9qHSQOZZbHlFi5h..ZbUlbYNMzYpxQD.3YqJDL.WjYXkKfHC', // hashed: password123
    college: 'Demo College'
  }
};

export const registerLocalUser = async (name, email, password, college) => {
  // Check if user exists
  if (localUsers[email]) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcryptjs.hash(password, 10);

  // Create user
  const newUser = {
    id: `local_${Date.now()}`,
    name,
    email,
    password: hashedPassword,
    college
  };

  localUsers[email] = newUser;

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    college: newUser.college
  };
};

export const loginLocalUser = async (email, password) => {
  const user = localUsers[email];
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    college: user.college
  };
};

export const getLocalUser = (email) => {
  const user = localUsers[email];
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    college: user.college
  };
};

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'placify_jwt_secret_key_2025_production',
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'placify_jwt_secret_key_2025_production');
  } catch (err) {
    return null;
  }
};
