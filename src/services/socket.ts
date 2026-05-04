import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;

  connect(walletAddress: string) {
    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('✅ WebSocket connected');
      this.socket?.emit('join', walletAddress);
    });

    this.socket.on('disconnect', () => {
      console.log('❌ WebSocket disconnected');
    });

    this.setupListeners();
  }

  private setupListeners() {
    this.socket?.on('trade:new', (trade) => {
      toast.success(`New trade request received!`);
      console.log('New trade:', trade);
    });

    this.socket?.on('trade:escrowed', (trade) => {
      toast.success('Funds escrowed successfully!');
      console.log('Trade escrowed:', trade);
    });

    this.socket?.on('trade:fiat_sent', (trade) => {
      toast.info('Buyer confirmed fiat payment sent');
      console.log('Fiat sent:', trade);
    });

    this.socket?.on('trade:completed', (trade) => {
      toast.success('Trade completed successfully! 🎉');
      console.log('Trade completed:', trade);
    });

    this.socket?.on('dispute:created', (dispute) => {
      toast.error('A dispute has been raised');
      console.log('Dispute created:', dispute);
    });

    this.socket?.on('dispute:evidence_submitted', (data) => {
      toast.info('New evidence submitted in dispute');
      console.log('Evidence submitted:', data);
    });

    this.socket?.on('dispute:resolved', (dispute) => {
      toast.success('Dispute has been resolved');
      console.log('Dispute resolved:', dispute);
    });

    this.socket?.on('notification:received', (notification) => {
      toast(notification.message, { icon: '🔔' });
    });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  on(event: string, callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }
}

export const socketService = new SocketService();
