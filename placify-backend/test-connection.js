// test-connection.js
// Run this to verify your MongoDB Atlas connection

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    console.log(`📍 Connection String: ${process.env.MONGODB_URI}`);

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected successfully!');

    // Get database info
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log('\n📊 Collections found:');
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });

    console.log('\n✅ Your MongoDB Atlas is working!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection Failed!');
    console.error('Error:', error.message);
    console.error('\n🔍 Troubleshooting:');
    console.error('  1. Check your connection string in .env');
    console.error('  2. Verify username and password');
    console.error('  3. Check Network Access in MongoDB Atlas');
    console.error('  4. Ensure database name is "placify"');
    process.exit(1);
  }
};

connectDB();
