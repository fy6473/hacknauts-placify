# MongoDB Connection Troubleshooting Guide

## Current Status
❌ Connection timing out after 15 seconds
- Your IP address is likely **NOT** whitelisted on MongoDB Atlas
- OR the connection string has an issue

## Step 1: Verify Your Current IP Address

To add your IP to MongoDB Atlas, you first need to know what it is:

```powershell
# Option 1: Check your public IP (best for MongoDB whitelisting)
$response = Invoke-WebRequest -Uri "https://api.ipify.org?format=json"
$ip = ($response.Content | ConvertFrom-Json).ip
Write-Host "Your Public IP: $ip"

# Option 2: Check your local network IP
ipconfig
# Look for "IPv4 Address" under your active network adapter
```

## Step 2: Verify MongoDB Atlas Configuration

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Sign in** with your account
3. **Select your cluster** (cluster0)
4. **Click "Network Access"** in the left sidebar
5. **Check Current IP Rules**:
   - You should see at least one IP address or IP range whitelisted
   - If you see "0.0.0.0/0", that means "allow all IPs" (not ideal but works)
   
## Step 3: Add/Update Your IP Address

If your IP is not whitelisted:

1. In the **Network Access** tab, click **"+ ADD IP ADDRESS"**
2. Click **"ADD CURRENT IP ADDRESS"** button (recommended)
   - This will automatically detect and add your current IP
3. OR manually enter your IP address
4. Click **"CONFIRM"**
5. **IMPORTANT**: Wait 5-10 minutes for the rule to propagate

## Step 4: Test Connection Again

After adding your IP, wait a few minutes and try:

```powershell
cd 'C:\Users\HP\Downloads\webdevfoldersAFTER9videos\NETFLIX CLONE PROJECT1\assets\videos\Hackathon project\placify-backend'
node test-mongo-connection.js
```

## Common Issues

### Issue: "Connection timed out after 15 seconds"
**Cause**: Your IP is not whitelisted
**Solution**: 
1. Go to MongoDB Atlas Network Access tab
2. Check your public IP address
3. Add it to the whitelist
4. Wait 5-10 minutes for propagation

### Issue: "Authentication failed"
**Cause**: Wrong username or password in connection string
**Solution**:
1. Go to MongoDB Atlas → Database Access
2. Verify username is "placify_user1"
3. If password is wrong, reset it:
   - Click the user "placify_user1"
   - Click "Edit Password"
   - Copy the new password
   - Update it in .env file

### Issue: "Could not resolve host"
**Cause**: Typo in hostname or DNS issue
**Solution**:
- Verify the hostname: `cluster0.gnc7fnj.mongodb.net`
- Check your internet connection
- Try: `ping cluster0.gnc7fnj.mongodb.net`

## Current Connection String

```
mongodb+srv://placify_user1:PlacifyApp2024!11@cluster0.gnc7fnj.mongodb.net/placify?retryWrites=true&w=majority&appName=Cluster0
```

**Components**:
- **Username**: placify_user1
- **Password**: PlacifyApp2024!11
- **Host**: cluster0.gnc7fnj.mongodb.net
- **Database**: placify
- **Options**: retryWrites=true, w=majority

## Next Steps

1. **Verify your public IP address** using the command above
2. **Check MongoDB Atlas Network Access** to see what IPs are whitelisted
3. **Add your IP** if it's not already there
4. **Wait 5-10 minutes** for the firewall rule to apply
5. **Run the test again**:
   ```powershell
   node test-mongo-connection.js
   ```
6. **Once successful**, restart the backend:
   ```powershell
   npm start
   ```

Need help? Make sure to:
- ✅ Verified IP address
- ✅ Checked MongoDB Atlas Network Access tab
- ✅ Added IP to whitelist
- ✅ Waited for propagation
- ✅ Tested connection with diagnostic script
