import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import { connectDatabase } from './config/database.js';
import { logger } from './utils/logger.js';
import tradeRoutes from './routes/trade.routes.js';
import merchantRoutes from './routes/merchant.routes.js';
import disputeRoutes from './routes/dispute.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import { initializeSocketHandlers } from './sockets/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimiter } from './middleware/rateLimiter.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://trustexchange.io'] 
      : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
  }
});

app.set('io', io);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://trustexchange.io'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/api/trades', tradeRoutes);
app.use('/api/merchants', merchantRoutes);
app.use('/api/disputes', disputeRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Initialize WebSocket handlers
initializeSocketHandlers(io);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const dbConnected = await connectDatabase();
    if (!dbConnected) {
      logger.warn('⚠️  Starting server without database connection');
    }
    httpServer.listen(PORT, () => {
      logger.info(`🚀 TrustExchange Backend running on port ${PORT}`);
      logger.info(`📡 WebSocket server ready`);
      logger.info(`🌐 Frontend should connect to: http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export { io };
