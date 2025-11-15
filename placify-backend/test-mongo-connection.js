import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
console.log('📋 Testing MongoDB Connection');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Connection String:', mongoURI.substring(0, 60) + '...');
console.log('');

// Set a hard timeout to ensure we don't hang forever
const hardTimeout = setTimeout(() => {
  console.error('❌ TIMEOUT: Connection attempt exceeded 10 seconds');
  console.error('   Firewall rule may still be propagating');
  console.error('   Please wait 2-3 minutes and try again');
  process.exit(1);
}, 10000);

const mongooseOptions = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 10000,
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
};

console.log('⏱️  Attempting connection (timeout: 10 seconds)...');
const startTime = Date.now();

mongoose.connect(mongoURI, mongooseOptions)
  .then(() => {
    clearTimeout(hardTimeout);
    const elapsed = Date.now() - startTime;
    console.log(`✅ SUCCESS! Connected in ${elapsed}ms`);
    console.log('   Database:', mongoose.connection.name);
    console.log('   Host:', mongoose.connection.host);
    console.log('');
    console.log('✅ Your MongoDB connection is working!');
    process.exit(0);
  })
  .catch((err) => {
    clearTimeout(hardTimeout);
    const elapsed = Date.now() - startTime;
    console.error(`❌ FAILED after ${elapsed}ms`);
    console.error('   Error:', err.message);
    console.error('');
    console.error('⚠️  Diagnostic Info:');

    if (err.message.includes('ENOTFOUND') || err.message.includes('getaddrinfo')) {
      console.error('   → DNS resolution failed');
      console.error('   → Check your internet connection');
      console.error('   → Verify hostname in connection string');
    } else if (err.message.includes('ECONNREFUSED')) {
      console.error('   → Connection refused');
      console.error('   → MongoDB cluster may be down');
    } else if (err.message.includes('authentication failed')) {
      console.error('   → Authentication failed');
      console.error('   → Check username/password in connection string');
    } else if (err.message.includes('IP')) {
      console.error('   → IP whitelist issue');
      console.error('   → Please wait for whitelist propagation');
    } else if (err.message.includes('ETIMEDOUT') || err.message.includes('timeout')) {
      console.error('   → Connection timeout');
      console.error('   → Firewall rule still propagating');
      console.error('   → Please wait 2-3 minutes and retry');
    }

    process.exit(1);
  });
