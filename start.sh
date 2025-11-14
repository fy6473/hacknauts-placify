#!/bin/bash
# Quick Start Script for Placify

echo "🚀 Starting Placify Setup..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

echo "✅ Node.js is installed"
echo ""

# Start Backend
echo "📦 Starting Backend Server..."
cd placify-backend
npm install > /dev/null 2>&1
npm start &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
sleep 3

# Start Frontend
echo "📱 Starting Frontend Server..."
cd ../placify
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo ""

echo "🎉 Placify is running!"
echo ""
echo "📍 Frontend: http://localhost:5173"
echo "📍 Backend: http://localhost:5000"
echo ""
echo "💡 Tips:"
echo "   - Register/Login at http://localhost:5173/signup"
echo "   - To stop: Press Ctrl+C"
echo ""

wait
