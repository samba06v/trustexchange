import { Server, Socket } from 'socket.io';
import { logger } from '../utils/logger.js';

export const initializeSocketHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    logger.info(`Client connected: ${socket.id}`);

    // Join room based on wallet address
    socket.on('join', (walletAddress: string) => {
      socket.join(walletAddress);
      logger.info(`${socket.id} joined room: ${walletAddress}`);
    });

    // Trade status updates
    socket.on('trade:update', (data) => {
      io.to(data.recipient).emit('trade:status_changed', data);
    });

    // Real-time notifications
    socket.on('notification:send', (data) => {
      io.to(data.recipient).emit('notification:received', data);
    });

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });

  logger.info('✅ WebSocket handlers initialized');
};
