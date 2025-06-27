// src/config/db.ts

import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
  try {
    const uri = process.env.MONGO_URI as string;

    if (!uri) {
      throw new Error('MONGO_URI not defined in environment variables');
    }

    const conn = await mongoose.connect(uri, {
      dbName: 'nasa-explorer', // explicitly set DB name
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
