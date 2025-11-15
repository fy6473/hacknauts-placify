// Temporary local authentication (in-memory) - for testing when MongoDB is unavailable
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// In-memory user storage
let users = [
  {
    _id: '1',
    email: 'test@example.com',
    password: '$2a$10$lLp8Z1IEbLK9P7K8Z8Z8ZOZ1234567890123456789012345678901', // test123
    name: 'Test User'
  },
  {
    _id: '2',
    email: 'demo@example.com',
    password: '$2a$10$lLp8Z1IEbLK9P7K8Z8Z8ZOZ1234567890123456789012345678901', // test123
    name: 'Demo User'
  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'placify_jwt_secret_key_2025_production';

export const tempRegisterUser = async (email, password, name) => {
  try {
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = {
      _id: String(users.length + 1),
      email,
      password: hashedPassword,
      name
    };

    users.push(newUser);
    console.log(`✅ Local user registered: ${email}`);

    return {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name
    };
  } catch (err) {
    throw err;
  }
};

export const tempLoginUser = async (email, password) => {
  try {
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ Local user logged in: ${email}`);

    return {
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name
      }
    };
  } catch (err) {
    throw err;
  }
};

export const tempGetUser = async (userId) => {
  try {
    const user = users.find(u => u._id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      _id: user._id,
      email: user.email,
      name: user.name
    };
  } catch (err) {
    throw err;
  }
};

export const tempGetAllUsers = () => {
  return users.map(u => ({
    _id: u._id,
    email: u.email,
    name: u.name
  }));
};
