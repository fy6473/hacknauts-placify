# 🎯 Placify - Placement Preparation Platform

> Complete placement preparation platform with authentication, real questions, code compiler, and professional features.

![Status](https://img.shields.io/badge/Status-Complete-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📸 Features at a Glance

### 🔐 **Authentication**
- Secure user registration and login
- JWT token-based authentication
- Role-based access control
- Password hashing with bcrypt

### 📚 **Real Questions**
- 16+ questions across all rounds
- Aptitude, Technical, Communication
- Company-specific filtering
- Difficulty levels

### 💻 **Code Compiler**
- Real-time code execution
- 5 programming languages
- Input/Output support
- Error reporting

### 📖 **Blog System**
- Read placement tips
- Search functionality
- View tracking
- Professional formatting

### 📧 **Contact Management**
- Send inquiries
- Message tracking
- Admin review

---

## 🚀 Quick Start

### Windows
```bash
# Double-click
start.bat
```

### Mac/Linux
```bash
# Run
bash start.sh
```

### Manual Setup
```bash
# Backend
cd placify-backend
npm install
npm start

# Frontend (new terminal)
cd placify
npm install
npm run dev
```

Visit: **http://localhost:5173**

---

## 📋 Requirements

- **Node.js** v16+
- **MongoDB** (local or cloud)
- **Judge0 API Key** (for code compiler)
- **Modern browser** (Chrome, Firefox, Safari)

---

## 🔧 Configuration

Create `.env` in `placify-backend/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/placify
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=development
JUDGE0_API_KEY=your_judge0_api_key
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

---

## 📖 Documentation

- 📘 **[Setup Guide](./SETUP_GUIDE.md)** - Detailed setup instructions
- 📊 **[Implementation Summary](./IMPLEMENTATION_SUMMARY.md)** - Feature overview
- ✅ **[Checklist](./CHECKLIST.md)** - Verification checklist

---

## 🎯 Main Routes

### Frontend Routes
```
/                      → Home page
/login                 → Login page
/signup                → Sign up page
/blog                  → Blog listing
/blog/:id              → Blog detail
/contact               → Contact form
/company/:name         → Company detail
/company/:name/:round  → Test page (protected)
/results/:name/:round  → Results page (protected)
```

### API Endpoints
```
POST   /api/auth/register           → Register user
POST   /api/auth/login              → Login user
GET    /api/auth/me                 → Get current user
GET    /api/questions               → Get all questions
GET    /api/questions/:company/:round → Get specific questions
GET    /api/blogs                   → Get all blogs
GET    /api/blogs/:id               → Get blog detail
POST   /api/contact                 → Send contact message
POST   /api/compiler/execute        → Compile code
```

---

## 🏗️ Project Structure

```
placify/
├── src/
│   ├── pages/              # React pages
│   ├── components/         # React components
│   ├── context/            # Auth context
│   ├── hooks/              # Custom hooks
│   ├── data/               # Static data
│   ├── styles/             # CSS/Tailwind
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js

placify-backend/
├── models/                 # Mongoose models
├── routes/                 # API routes
├── middleware/             # Auth middleware
├── data/                   # Sample data
├── server.js
├── package.json
└── .env
```

---

## 👥 User Roles

### User
- Take tests
- View results
- Read blog
- Contact support

### Admin (Future)
- Manage questions
- Manage blogs
- View messages
- Analytics

---

## 🔐 Authentication Flow

```
1. User registers → Password hashed → User saved
2. User logs in → Credentials verified → JWT token generated
3. Token sent to frontend → Stored in localStorage
4. Protected routes check token
5. API requests include token in header
6. Token validated on backend
7. Logout clears token
```

---

## 📊 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  college: String,
  role: String (user/admin),
  testResults: [
    {
      companyId: String,
      roundType: String,
      score: Number,
      percentage: Number,
      answers: Object,
      completedAt: Date
    }
  ],
  createdAt: Date
}
```

### Question
```javascript
{
  id: String (unique),
  question: String,
  options: [String],
  correctAnswer: String,
  explanation: String,
  difficulty: String,
  category: String,
  company: String,
  round: String
}
```

### Blog
```javascript
{
  title: String,
  content: String,
  excerpt: String,
  author: String,
  category: String,
  tags: [String],
  views: Number,
  createdAt: Date
}
```

---

## 🧪 Testing Guide

### Test Account
```
Email: demo@placify.com
Password: demo123
```

### Or Create New
1. Visit http://localhost:5173/signup
2. Enter details
3. Click "Create Account"

### Test Features
- [ ] Login/Logout
- [ ] Take tests
- [ ] View results
- [ ] Run code
- [ ] Read blogs
- [ ] Send contact form

---

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router v7
- Tailwind CSS v4
- Ace Editor
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcryptjs

### External APIs
- Judge0 CE (Code Compiler)

---

## 📈 Performance

- Optimized renders with React hooks
- Lazy loading for routes
- localStorage caching
- Efficient API calls
- Responsive design

---

## 🔒 Security

- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Protected routes
- ✅ CORS enabled
- ✅ Environment variables
- ✅ Token expiration

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway/Render)
```bash
git push heroku main
# Or use platform CLI
```

---

## 📝 Sample Questions

### Aptitude
```
Q: A train 100m long is running at 60 km/h. 
   In how much time will it cross a bridge of 200m?
A: 18 seconds
```

### Technical
```
Q: What data structure is best for LRU Cache?
A: HashMap + Doubly Linked List
```

### Communication
```
Q: What is AI?
A: Article provided in question
```

---

## 🎨 UI Components

- Header (with auth menu)
- Footer (with links)
- HeroSection (landing banner)
- CompanyCard (featured companies)
- CodeEditor (syntax highlighting)
- CodeCompiler (real execution)
- AuthForm (login/signup)
- BlogCard (article preview)
- ContactForm (inquiry form)

---

## 🐛 Troubleshooting

### Backend Issues
```bash
# MongoDB not running
mongod

# Port 5000 in use
lsof -i :5000
kill -9 <PID>

# Dependencies issue
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues
```bash
# Clear cache
rm -rf node_modules package-lock.json .next
npm install

# Port 5173 in use
npm run dev -- --port 3000
```

---

## 📚 Learning Resources

- [Express.js Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [JWT Guide](https://jwt.io)

---

## 🎯 Future Enhancements

- [ ] Admin dashboard
- [ ] Progress analytics
- [ ] Discussion forum
- [ ] Video tutorials
- [ ] Mobile app
- [ ] Live mentoring
- [ ] AI recommendations
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Email notifications

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙋 Support

- 📧 Email: support@placify.com
- 📖 Docs: See documentation files
- 🐛 Issues: Check console/error messages

---

## 🎉 Acknowledgments

- Inspired by LearnTheta, PrepInsta, GeeksforGeeks, FacePrep
- Judge0 API for code compilation
- Tailwind CSS for styling
- MongoDB for database

---

## 📊 Stats

- **Questions**: 16+
- **Companies**: 7
- **Blogs**: 3
- **Languages Supported**: 5
- **API Endpoints**: 13+

---

## 🔗 Links

- 🌐 Frontend: http://localhost:5173
- 🔌 Backend: http://localhost:5000
- 🗄️ Database: MongoDB

---

## ✨ Version History

### v1.0.0 (Current)
- Initial release
- Complete authentication system
- Real question database
- Code compiler integration
- Blog & contact features
- Professional UI/UX

---

## 📞 Contact

Have questions or suggestions?

- **Email**: support@placify.com
- **Website**: placify.com (coming soon)
- **GitHub**: github.com/placify

---

## 🎓 Made with ❤️

Built with passion for placement success!

**Start your preparation journey today! 🚀**

---

<div align="center">

**[Back to Top](#-placify---placement-preparation-platform)**

*Last Updated: November 14, 2025*

</div>
