# 🚀 Placify - Quick Start & Troubleshooting

## ✅ Current Status

```
✅ Backend Server: Running on http://localhost:5000
✅ Frontend Server: Running on http://localhost:5174
✅ Health Check: Working
❌ MongoDB: Not connected yet
```

---

## 🔴 Issue: MongoDB Not Connected

**Symptoms**:
- Backend shows: `❌ MongoDB connection error`
- Routes work but data not saved
- Error 404: "Route not found"

**Root Cause**: 
MongoDB is not installed or running on your computer

---

## ✨ Quick Solution: Setup MongoDB

### Step 1: Download MongoDB Community Edition
1. Go to: https://www.mongodb.com/try/download/community
2. Select "Windows"
3. Download the MSI installer

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Follow the installation wizard
3. ✅ Check "Install MongoDB as a Service"
4. Click Install

### Step 3: Start MongoDB
```powershell
# Open PowerShell as Administrator
net start MongoDB

# Verify it's running
netstat -an | findstr 27017
```

### Step 4: Verify Connection
```powershell
curl -X GET http://localhost:5000/api/health
# Should show: {"message":"Server is running"}
```

---

## 🎯 MongoDB Compass Setup (Visual Database Manager)

### Installation
1. Download: https://www.mongodb.com/try/download/compass
2. Install the application
3. Open MongoDB Compass
4. Connection String: `mongodb://localhost:27017`
5. Click "Connect"

### What You'll See
- Database: `placify`
- Collections: `users`, `questions`, `blogs`, `contacts`
- All your saved data

---

## 🔗 API Endpoints (Test These)

### Health Check
```bash
curl -X GET http://localhost:5000/api/health
# Response: {"message":"Server is running"}
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "college": "My University"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Blogs
```bash
curl -X GET http://localhost:5000/api/blogs
```

### Initialize Sample Data
```bash
curl -X POST http://localhost:5000/api/questions/init-sample-data
curl -X POST http://localhost:5000/api/blogs/init-sample-data
```

---

## 🖥️ Frontend Access

### Open in Browser
- **URL**: http://localhost:5174/
- **Features**:
  - Register / Login
  - Take Tests
  - Read Blogs
  - Submit Contact Forms
  - Code Compiler

---

## 📊 File Structure

```
Hackathon project/
├── placify/                    # Frontend (React)
├── placify-backend/            # Backend (Node.js)
├── MONGODB_SETUP.md           # Detailed MongoDB guide
├── SETUP_GUIDE.md             # Full setup instructions
├── README.md                  # Project overview
└── FILE_MANIFEST.md           # All files created
```

---

## 🔧 Troubleshooting

### Backend Error: "Route not found"
**Solution**: Make sure MongoDB is running
```powershell
net start MongoDB
```

### Frontend Doesn't Load
**Check**:
- Is http://localhost:5174/ accessible?
- Try clearing browser cache (Ctrl+Shift+Delete)
- Restart frontend: `npm run dev`

### MongoDB Port Already in Use
```powershell
# Find what's using port 27017
Get-NetTcpConnection -LocalPort 27017 | Select-Object -Property State, OwningProcess

# Or change MongoDB port in .env
MONGODB_URI=mongodb://localhost:27018/placify
```

### Can't Connect to MongoDB Compass
1. Make sure MongoDB service is running
2. Try connection string: `mongodb://127.0.0.1:27017`
3. Check Windows Firewall isn't blocking port 27017

---

## 🎉 Once MongoDB is Running

1. ✅ Backend connects automatically
2. ✅ Frontend can create accounts
3. ✅ Data is saved in MongoDB
4. ✅ MongoDB Compass shows all data
5. ✅ Ready for production!

---

## 📝 Important Files to Check

- **Backend Config**: `placify-backend/.env`
- **MongoDB Connection**: `placify-backend/server.js` (line 25)
- **Routes**: `placify-backend/routes/` (5 files)
- **Frontend Config**: `placify/.env` (if exists)

---

## 🆘 Need Help?

Check these files in order:
1. `MONGODB_SETUP.md` - Detailed setup guide
2. `SETUP_GUIDE.md` - Complete instructions
3. `README.md` - Project overview
4. `FILE_MANIFEST.md` - All files created

---

## ✅ Checklist to Get Everything Working

- [ ] Downloaded MongoDB Community Edition
- [ ] Installed MongoDB
- [ ] Started MongoDB service (`net start MongoDB`)
- [ ] Verified connection (`netstat -an | findstr 27017`)
- [ ] Backend is running and connected
- [ ] Frontend is accessible at http://localhost:5174/
- [ ] Can register and login
- [ ] MongoDB Compass shows data
- [ ] All tests are passing

---

**Once you complete these steps, your Placify platform will be fully functional!** 🚀

Last Updated: November 14, 2025
Status: Ready for MongoDB Setup
