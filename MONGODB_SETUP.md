# MongoDB Setup Guide for Placify

## Option 1: MongoDB Community Edition (Local - Recommended for Development)

### Windows Installation

1. **Download MongoDB Community Edition**
   - Go to: https://www.mongodb.com/try/download/community
   - Select "Windows" and download the MSI installer

2. **Install MongoDB**
   - Run the installer
   - Follow the installation wizard
   - Choose "Install MongoDB as a Service" (recommended)
   - Default installation path: `C:\Program Files\MongoDB\Server\7.0\`

3. **Start MongoDB Service**
   ```powershell
   # MongoDB should auto-start if installed as service
   # Or manually start it:
   net start MongoDB
   ```

4. **Verify Installation**
   ```powershell
   mongod --version
   ```

---

## Option 2: MongoDB Compass (GUI Client - For Viewing Data)

### Installation & Connection

1. **Download MongoDB Compass**
   - Go to: https://www.mongodb.com/try/download/compass
   - Download for Windows

2. **Install Compass**
   - Run the installer and follow prompts

3. **Connect to Local MongoDB**
   - Open MongoDB Compass
   - Connection String: `mongodb://localhost:27017`
   - Click "Connect"

4. **View Your Data**
   - You'll see the `placify` database after running the app
   - Browse collections: `users`, `questions`, `blogs`, `contacts`

---

## Option 3: MongoDB Atlas (Cloud Database)

### Quick Setup

1. **Create Free Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster**
   - Create a free M0 cluster
   - Choose AWS or your preferred provider
   - Wait for cluster to be created (~5 minutes)

3. **Get Connection String**
   - Go to "Connect" → "Drivers"
   - Copy connection string

4. **Update .env**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/placify?retryWrites=true&w=majority
   ```

5. **Add IP Whitelist**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)

---

## Troubleshooting

### MongoDB Connection Error

**Error**: `MongoDB connection error: MongoServerError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**: 
- Check if MongoDB service is running
- Windows: `net start MongoDB`
- Check port 27017 is not blocked
- Try restarting MongoDB service

### MongoDB Compass Won't Connect

**Error**: `Unable to connect to localhost:27017`

**Solution**:
- Verify MongoDB is running
- Try connection string: `mongodb://127.0.0.1:27017`
- Check firewall settings
- Make sure port 27017 is open

### Can't See Collections

**Solution**:
- First, run the backend and create some data
- Make a test request: `POST http://localhost:5000/api/auth/register`
- Then refresh Compass

---

## Quick Start Commands

### Start MongoDB (Windows)
```powershell
# If installed as service
net start MongoDB

# Or run directly
mongod
```

### Start Backend (with MongoDB running)
```powershell
cd placify-backend
npm start
```

### Initialize Sample Data
```bash
curl -X POST http://localhost:5000/api/questions/init-sample-data
curl -X POST http://localhost:5000/api/blogs/init-sample-data
```

---

## Recommended Setup for Development

1. ✅ Install MongoDB Community Edition (local)
2. ✅ Install MongoDB Compass (for easy data viewing)
3. ✅ Keep both services running while developing
4. ✅ Use MongoDB Compass to verify data is being saved

---

## Files Location (Windows)

- **MongoDB Data**: `C:\Program Files\MongoDB\Server\7.0\data`
- **MongoDB Logs**: `C:\Program Files\MongoDB\Server\7.0\log`
- **Compass Config**: `%AppData%\MongoDB\Compass`

---

## Next Steps

1. Install MongoDB (Option 1 or 2)
2. Start MongoDB service
3. Restart your backend server (`npm start`)
4. Backend should connect successfully ✅
5. Open MongoDB Compass to view your data

**That's it!** Your Placify backend will now save data to MongoDB. 🎉

