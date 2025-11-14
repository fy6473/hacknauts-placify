# 🔐 MONGODB ATLAS CONNECTION STRING - REFERENCE

## 📝 What Your .env File Should Look Like

### CURRENT (Template):
```env
PORT=5000
MONGODB_URI=mongodb+srv://REPLACE_USERNAME:REPLACE_PASSWORD@YOUR_CLUSTER/placify?retryWrites=true&w=majority
JWT_SECRET=placify_jwt_secret_key_2025_production
NODE_ENV=development
JUDGE0_API_KEY=your_judge0_api_key_here
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

### AFTER UPDATE (With Real Values):
```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/placify?retryWrites=true&w=majority
JWT_SECRET=placify_jwt_secret_key_2025_production
NODE_ENV=development
JUDGE0_API_KEY=your_judge0_api_key_here
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
```

---

## 🎯 Connection String Breakdown

### Full String Structure:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

### Each Part:
| Part | Example | What It Is |
|------|---------|-----------|
| `mongodb+srv://` | (Fixed) | Protocol for MongoDB Atlas |
| `USERNAME` | `john_doe` | Your MongoDB database user |
| `:` | (Fixed) | Separator |
| `PASSWORD` | `MySecure123` | Your MongoDB database password |
| `@` | (Fixed) | Separator |
| `CLUSTER` | `cluster0.a1b2c3d4` | Your MongoDB cluster name |
| `.mongodb.net` | (Fixed) | MongoDB Atlas domain |
| `/placify` | (Fixed) | Database name |
| `?retryWrites=true&w=majority` | (Fixed) | Settings |

### Example Full:
```
mongodb+srv://john_doe:MySecure123@cluster0.a1b2c3d4.mongodb.net/placify?retryWrites=true&w=majority
```

---

## ✅ VALID CONNECTION STRINGS

### Example 1:
```
mongodb+srv://alice:password123@cluster0.abc123.mongodb.net/placify?retryWrites=true&w=majority
```

### Example 2:
```
mongodb+srv://dev_user:MyPass456@cluster0.xyz789.mongodb.net/placify?retryWrites=true&w=majority
```

### Example 3:
```
mongodb+srv://admin_team:SecureP@ssw0rd@cluster0.12345678.mongodb.net/placify?retryWrites=true&w=majority
```

---

## ❌ INVALID CONNECTION STRINGS

### Wrong #1 - Missing username/password:
```
❌ mongodb+srv://cluster0.abc123.mongodb.net/placify?retryWrites=true&w=majority
```

### Wrong #2 - Missing database name:
```
❌ mongodb+srv://john:pass@cluster0.abc123.mongodb.net?retryWrites=true&w=majority
```

### Wrong #3 - Wrong protocol (localhost):
```
❌ mongodb://localhost:27017/placify
```

### Wrong #4 - Using placeholder text:
```
❌ mongodb+srv://<username>:<password>@cluster0.abc123.mongodb.net/placify?retryWrites=true&w=majority
```

---

## 🔑 Where to Find Your Values

### USERNAME
- Go to MongoDB Atlas → Database Access (left menu)
- Look for your database user
- See the username there
- Example: `john_doe`, `dev_user`, etc.

### PASSWORD
- You set this when creating the database user
- It's the password you use to login to that user
- NOT your MongoDB Atlas login password
- NOT your Gmail password
- It's the database-specific password

### CLUSTER
- Go to MongoDB Atlas → Clusters (left menu)
- Click Connect on your cluster
- The connection string shows your cluster name
- Look for `cluster0.xxxxx` part
- Copy the whole `cluster0.xxxxx.mongodb.net` part

---

## 🎯 Step-by-Step Assembly

### Step 1: Get Cluster Info
From MongoDB Atlas, you get:
```
mongodb+srv://<username>:<password>@cluster0.a1b2c3d4.mongodb.net/?retryWrites=true&w=majority
```

### Step 2: Fill in Username & Password

If your username is `john_doe` and password is `MyPassword123`:
```
mongodb+srv://john_doe:MyPassword123@cluster0.a1b2c3d4.mongodb.net/?retryWrites=true&w=majority
```

### Step 3: Add Database Name

Add `/placify` before the `?`:
```
mongodb+srv://john_doe:MyPassword123@cluster0.a1b2c3d4.mongodb.net/placify?retryWrites=true&w=majority
```

### Step 4: Done!
That's your final connection string.

---

## ⚠️ SPECIAL CHARACTERS IN PASSWORD

If your password has special characters:

| Character | Code | Example |
|-----------|------|---------|
| `@` | `%40` | `pass@word` → `pass%40word` |
| `#` | `%23` | `pass#123` → `pass%23123` |
| `:` | `%3A` | `pass:word` → `pass%3Aword` |
| `!` | `%21` | `pass!word` → `pass%21word` |

**Example with special chars**:
```
Password: myPass@123!secure

Connection string:
mongodb+srv://user:myPass%40123%21secure@cluster0.abc.mongodb.net/placify?retryWrites=true&w=majority
```

---

## ✅ COPY & PASTE TEMPLATE

Use this exact format and fill in YOUR values:

```env
MONGODB_URI=mongodb+srv://YOUR_DB_USERNAME:YOUR_DB_PASSWORD@YOUR_CLUSTER.mongodb.net/placify?retryWrites=true&w=majority
```

Replace:
- `YOUR_DB_USERNAME` - Your MongoDB database username
- `YOUR_DB_PASSWORD` - Your MongoDB database password
- `YOUR_CLUSTER` - Your cluster name (e.g., cluster0.a1b2c3d4)

---

## 🎯 FINAL CHECK

Before saving, verify your connection string:

- [ ] Starts with `mongodb+srv://`
- [ ] Has your actual username
- [ ] Has your actual password
- [ ] Has `@` separator
- [ ] Has your cluster name
- [ ] Has `.mongodb.net`
- [ ] Has `/placify`
- [ ] Has `?retryWrites=true&w=majority` at end
- [ ] No `<` or `>` symbols (these are placeholders)
- [ ] No spaces in the string

---

## 🎬 WHEN DONE

1. Save the .env file (Ctrl+S)
2. Kill backend (Ctrl+C)
3. Restart: `npm start`
4. You should see: ✅ MongoDB connected successfully

---

**Your connection string is unique to YOUR MongoDB Atlas account!** 🔐

