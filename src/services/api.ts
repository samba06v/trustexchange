import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tradeAPI = {
  initiate: (data: any) => api.post('/trades/initiate', data),
  confirmEscrow: (tradeId: string, txHash: string) => 
    api.post(`/trades/${tradeId}/escrow`, { txHash }),
  confirmFiatSent: (tradeId: string) => 
    api.post(`/trades/${tradeId}/fiat-sent`),
  releaseFunds: (tradeId: string, txHash: string) => 
    api.post(`/trades/${tradeId}/release`, { txHash }),
  getDetails: (tradeId: string) => api.get(`/trades/${tradeId}`),
  getUserTrades: (walletAddress: string) => api.get(`/trades/user/${walletAddress}`),
};

export const merchantAPI = {
  register: (data: any) => api.post('/merchants/register', data),
  getProfile: (walletAddress: string) => api.get(`/merchants/${walletAddress}`),
  createOffer: (walletAddress: string, data: any) => 
    api.post(`/merchants/${walletAddress}/offers`, data),
  updateOffer: (walletAddress: string, offerId: string, data: any) => 
    api.put(`/merchants/${walletAddress}/offers/${offerId}`, data),
  getActiveOffers: () => api.get('/merchants/offers/active'),
};

export const disputeAPI = {
  create: (data: any) => api.post('/disputes/create', data),
  submitEvidence: (disputeId: string, data: any) => 
    api.post(`/disputes/${disputeId}/evidence`, data),
  getDetails: (disputeId: string) => api.get(`/disputes/${disputeId}`),
  resolve: (disputeId: string, data: any) => 
    api.post(`/disputes/${disputeId}/resolve`, data),
};

export const analyticsAPI = {
  getPlatformStats: () => api.get('/analytics/platform'),
  getMerchantAnalytics: (walletAddress: string) => 
    api.get(`/analytics/merchant/${walletAddress}`),
};

export default api;
