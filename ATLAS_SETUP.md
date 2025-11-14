# 🔗 MongoDB Atlas Connection Setup

## Step 1: Get Your Connection String from MongoDB Atlas

1. Go to: https://www.mongodb.com/cloud/atlas
2. Log in to your account
3. Click on your cluster (the one with "placify" database)
4. Click "Connect" button
5. Choose "Drivers" → "Node.js"
6. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/placify?retryWrites=true&w=majority
   ```

## Step 2: Replace Username and Password

In the connection string you copied, replace:
- `username` → Your MongoDB Atlas username
- `password` → Your MongoDB Atlas password

Example:
```
BEFORE:
mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/placify?retryWrites=true&w=majority

AFTER (example):
mongodb+srv://myuser:mypassword123@cluster0.xyz.mongodb.net/placify?retryWrites=true&w=majority
```

## Step 3: Update .env File

Replace the MONGODB_URI in `.env` file with your connection string

---

**IMPORTANT**: The connection string should:
- ✅ Include `mongodb+srv://` (NOT `mongodb://`)
- ✅ Include your username and password
- ✅ End with `/placify?retryWrites=true&w=majority`
- ✅ NO spaces in the string

---

## After You Update .env:

1. Save the file
2. Restart backend: Kill current `npm start` and run again
3. Check terminal for "✅ MongoDB connected successfully"
4. Try accessing http://localhost:5174/

