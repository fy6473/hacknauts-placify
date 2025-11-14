@echo off
REM Quick Start Script for Placify (Windows)

echo.
echo 🚀 Starting Placify Setup...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install it first.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Start Backend
echo 📦 Starting Backend Server...
cd placify-backend
call npm install
start cmd /k npm start
echo ✅ Backend started on http://localhost:5000
timeout /t 3

REM Start Frontend
echo 📱 Starting Frontend Server...
cd ..\placify
call npm install
start cmd /k npm run dev
echo ✅ Frontend started on http://localhost:5173
echo.

echo 🎉 Placify is running!
echo.
echo 📍 Frontend: http://localhost:5173
echo 📍 Backend: http://localhost:5000
echo.
echo 💡 Tips:
echo    - Register/Login at http://localhost:5173/signup
echo    - Backend and Frontend run in separate windows
echo    - Close both windows to stop
echo.
pause
