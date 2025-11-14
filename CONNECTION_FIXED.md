# 🚀 Placify - Frontend/Backend Connection Fixed

## ✅ What Was Done

All hardcoded API URLs have been replaced with environment variables:
- Frontend now reads from `VITE_API_URL` environment variable
- Falls back to `http://localhost:5000/api` if not set
- All components updated: AuthContext, BlogPage, ContactPage, CodeCompiler, etc.

---

## 🎯 Current Status

```
✅ Backend Server: http://localhost:5000
✅ Frontend Server: http://localhost:5174
✅ Environment Variables: Configured
✅ CORS: Enabled on backend
✅ API Routing: Fixed
```

---

## 🔗 How to Access

### Frontend
```
🌐 URL: http://localhost:5174/
```

### Backend API
```
🔌 Base URL: http://localhost:5000/api
✅ Health: http://localhost:5000/api/health
```

---

## 📋 Next Steps (If Still Not Working)

### 1. Clear Browser Cache
- Press `Ctrl + Shift + Delete`
- Clear all cache
- Refresh the page

### 2. Check MongoDB Status
```powershell
# MongoDB is required!
net start MongoDB

# Or download from:
# https://www.mongodb.com/try/download/community
```

### 3. Verify Backend is Running
```powershell
curl -X GET http://localhost:5000/api/health
# Should show: {"message":"Server is running"}
```

### 4. Check Network Tab in Browser
1. Open Firefox/Chrome DevTools (F12)
2. Go to "Network" tab
3. Refresh page
4. Look for failed requests
5. Click on failed request to see details

### 5. Check Console for Errors
1. Open DevTools (F12)
2. Go to "Console" tab
3. Look for red errors
4. Take note of error message

---

## 🔧 Common Issues & Solutions

### Issue: "Can't reach localhost:5000" in Frontend

**Check 1**: Backend is running?
```powershell
netstat -an | findstr 5000
# Should show: LISTENING
```

**Check 2**: CORS is enabled?
- Backend has `app.use(cors())` ✅
- This allows cross-origin requests

**Check 3**: Environment variable set?
- Check `placify/.env` file
- Should contain: `VITE_API_URL=http://localhost:5000/api`

---

### Issue: 404 "Route not found" on API calls

**Solution**: MongoDB is not running
```powershell
# Start MongoDB
net start MongoDB

# Verify it's running
netstat -an | findstr 27017
# Should show: LISTENING
```

---

### Issue: Frontend loads but can't login

**Check**: 
1. Fill in login form
2. Open DevTools Network tab
3. Look at POST request to `/api/auth/login`
4. Check the response

**Common errors**:
- `CORS error` → MongoDB not running
- `"Route not found"` → MongoDB not running
- `"Invalid credentials"` → Wrong email/password

---

## 🎯 Quick Test

### Test 1: Health Check
```bash
curl -X GET http://localhost:5000/api/health
# Response: {"message":"Server is running"}
```

### Test 2: Backend Connectivity from Frontend
1. Open browser to http://localhost:5174/
2. Open DevTools (F12)
3. Go to Network tab
4. Refresh page
5. Look for requests to `http://localhost:5000/api`
6. They should succeed (green checkmark)

### Test 3: Try Registration
1. Go to http://localhost:5174/signup
2. Fill in form with test data:
   - Name: Test User
   - Email: test@test.com
   - Password: password123
   - College: Test College
3. Click Register
4. Check DevTools Network tab for response

---

## 📊 Frontend Configuration

### File: `placify/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

This file tells the frontend where to find the backend API.

---

## 🛠️ If Still Having Issues

### Step 1: Check Logs
- **Frontend**: Check browser console (F12 → Console tab)
- **Backend**: Check terminal output where you ran `npm start`

### Step 2: Restart Everything
```powershell
# In separate terminals:

# Terminal 1: Restart MongoDB
net start MongoDB

# Terminal 2: Kill backend (Ctrl+C), then restart
cd placify-backend
npm start

# Terminal 3: Kill frontend (Ctrl+C), then restart
cd placify
npm run dev
```

### Step 3: Clear Everything
```powershell
# In placify folder
rm -r node_modules package-lock.json
npm install
npm run dev
```

---

## 📝 Files Modified

✅ `placify/.env` - Added API URL configuration
✅ `placify/src/context/AuthContext.jsx` - Updated API URLs
✅ `placify/src/pages/BlogPage.jsx` - Updated API URLs
✅ `placify/src/pages/BlogDetailPage.jsx` - Updated API URLs
✅ `placify/src/pages/ContactPage.jsx` - Updated API URLs
✅ `placify/src/pages/TechnicalTestPage.jsx` - Updated API URLs
✅ `placify/src/components/CodeCompiler.jsx` - Updated API URLs

---

## 🎉 Expected Result

Once everything is working:

1. ✅ Frontend loads at http://localhost:5174/
2. ✅ You can see the homepage
3. ✅ "Sign Up" button works
4. ✅ You can register a new account
5. ✅ You can login with that account
6. ✅ You can take tests
7. ✅ You can view blogs
8. ✅ You can submit contact form
9. ✅ Code compiler works

---

## 📞 Support

If you're still stuck:

1. Check MONGODB_SETUP.md for MongoDB installation
2. Check QUICK_START.md for quick reference
3. Check SETUP_GUIDE.md for detailed setup
4. Read the error messages carefully
5. Check browser Network tab (F12)

---

**Your Placify platform is now configured to work properly!** 🚀

Last Updated: November 14, 2025
Status: ✅ Frontend/Backend Connection Fixed
