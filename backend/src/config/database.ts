import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const connectDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/trustexchange';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    logger.error('❌ MongoDB connection error:', error);
    logger.warn('⚠️  Server will start without database. Install MongoDB or use MongoDB Atlas.');
    logger.warn('⚠️  Download MongoDB: https://www.mongodb.com/try/download/community');
    return false;
  }
};
