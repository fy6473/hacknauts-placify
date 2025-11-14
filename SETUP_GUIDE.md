# Placify - Complete Setup Guide 🚀

## Overview
Placify is a comprehensive platform for placement preparation with:
- ✅ Professional Authentication (Login/Signup)
- ✅ Role-based Access Control
- ✅ Real Questions (Aptitude, Technical, Communication)
- ✅ Code Compiler with Judge0 API
- ✅ Blog & Contact Features
- ✅ Backend API with MongoDB

---

## Project Structure

```
placify/                          # Frontend (React)
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page
│   │   ├── BlogPage.jsx         # Blog listing
│   │   ├── BlogDetailPage.jsx   # Individual blog
│   │   ├── ContactPage.jsx      # Contact form
│   │   ├── AptitudeTestPage.jsx
│   │   ├── TechnicalTestPage.jsx (with Compiler)
│   │   ├── ReadingTestPage.jsx
│   │   ├── ResultPage.jsx
│   │   └── Auth/
│   │       ├── LoginPage.jsx
│   │       └── SignupPage.jsx
│   ├── components/
│   │   ├── CodeCompiler.jsx     # NEW: Code execution
│   │   └── Home/
│   │       ├── Header.jsx       (Updated with Auth)
│   │       ├── HeroSection.jsx
│   │       ├── FeaturedCompanies.jsx
│   │       └── ...
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication context
│   └── ...
│
placify-backend/                  # Backend (Node.js/Express)
├── models/
│   ├── User.js                  # User model with password hashing
│   ├── Question.js              # Questions model
│   ├── Blog.js                  # Blog model
│   └── Contact.js               # Contact model
├── routes/
│   ├── auth.js                  # Login/Signup/Auth
│   ├── questions.js             # Questions API
│   ├── blogs.js                 # Blogs API
│   ├── contact.js               # Contact API
│   └── compiler.js              # Code compiler API
├── middleware/
│   └── auth.js                  # JWT verification
├── data/
│   ├── questions.js             # Real question data
│   └── blogs.js                 # Real blog data
├── server.js                    # Express server
├── package.json
└── .env
```

---

## Setup Instructions

### 1. Backend Setup

#### Prerequisites
- Node.js installed
- MongoDB running locally or connection string ready

#### Steps

1. **Navigate to backend directory**
   ```bash
   cd placify-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (`.env`)
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/placify
   JWT_SECRET=your_super_secret_key_here
   NODE_ENV=development
   JUDGE0_API_KEY=your_judge0_key_here
   JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
   ```

4. **Start the backend**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   ✅ Backend should be running on `http://localhost:5000`

---

### 2. Frontend Setup

#### Prerequisites
- Node.js installed

#### Steps

1. **Navigate to frontend directory**
   ```bash
   cd placify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   ✅ Frontend should be running on `http://localhost:5173`

---

## Features & Functionality

### 🔐 Authentication
- **Sign Up**: Register with name, email, password, college
- **Login**: Email & password authentication with JWT
- **Protected Routes**: Only logged-in users can take tests
- **Role-based Access**: Support for admin and user roles

### 📝 Tests
- **Aptitude Round**: Real questions from companies
- **Technical Round**: Coding problems with compiler
- **Communication Round**: Reading comprehension

### 💻 Code Compiler
- Supports: Python, JavaScript, Java, C++, C
- Real-time code execution using Judge0 API
- Input/Output testing
- Error reporting

### 📚 Blog Section
- Read placement tips and guides
- Search functionality
- View count tracking
- Professional formatting

### 📧 Contact Form
- Send inquiries to support team
- Email validation
- Message tracking

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions/:company/:round` - Get company-specific questions
- `POST /api/questions/init-sample-data` - Initialize sample data

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog details
- `POST /api/blogs/init-sample-data` - Initialize sample blogs

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (admin)

### Compiler
- `POST /api/compiler/execute` - Execute code
- `GET /api/compiler/languages` - Get supported languages

---

## Important Notes

### Judge0 API Setup (For Code Compilation)

1. Sign up at [RapidAPI](https://rapidapi.com)
2. Search for "Judge0 CE"
3. Subscribe to the free plan
4. Copy your API key
5. Add to `.env` file:
   ```
   JUDGE0_API_KEY=your_key_here
   ```

### Sample Data Initialization

To load sample questions and blogs:

1. Make POST request to `http://localhost:5000/api/questions/init-sample-data`
2. Make POST request to `http://localhost:5000/api/blogs/init-sample-data`

Or use curl:
```bash
curl -X POST http://localhost:5000/api/questions/init-sample-data
curl -X POST http://localhost:5000/api/blogs/init-sample-data
```

---

## Test Credentials

You can create your own account or use these for testing:

```
Email: demo@placify.com
Password: demo123
```

---

## Troubleshooting

### Backend won't start
- Check if MongoDB is running: `mongod`
- Check if port 5000 is available
- Verify `.env` file exists and has correct values

### Frontend won't connect to backend
- Check if backend is running on `http://localhost:5000`
- Check CORS settings in `server.js`
- Open browser console for errors

### Code compiler not working
- Verify Judge0 API key in `.env`
- Check internet connection
- Verify code syntax is correct

### Tests not appearing
- Initialize sample data using API endpoints
- Check MongoDB connection
- Verify questions are in database: `db.questions.find()`

---

## Technologies Used

### Frontend
- React 19
- React Router v7
- Tailwind CSS
- Vite
- Ace Editor (code editing)

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- Bcrypt (password hashing)
- Axios (HTTP requests)

### External APIs
- Judge0 CE (code compilation)

---

## Future Enhancements

- [ ] Admin dashboard
- [ ] Progress tracking & analytics
- [ ] Discussion forum
- [ ] Video tutorials
- [ ] Mobile app
- [ ] Real-time leaderboard
- [ ] AI-powered recommendations
- [ ] Payment integration

---

## Support

For issues or questions, contact: **support@placify.com**

---

**Happy Preparing! 🎯** Good luck with your placements!
