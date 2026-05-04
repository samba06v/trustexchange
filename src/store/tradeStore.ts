import { create } from 'zustand';

export interface Trade {
  tradeId: string;
  buyer: string;
  seller: string;
  amount: number;
  currency: string;
  cryptoAmount: number;
  status: 'initiated' | 'escrowed' | 'fiat_sent' | 'completed' | 'disputed' | 'cancelled';
  createdAt: string;
  escrowTxHash?: string;
}

interface TradeState {
  trades: Trade[];
  activeTrade: Trade | null;
  addTrade: (trade: Trade) => void;
  updateTrade: (tradeId: string, updates: Partial<Trade>) => void;
  setActiveTrade: (trade: Trade | null) => void;
}

export const useTradeStore = create<TradeState>((set) => ({
  trades: [],
  activeTrade: null,
  addTrade: (trade) => set((state) => ({ trades: [trade, ...state.trades] })),
  updateTrade: (tradeId, updates) =>
    set((state) => ({
      trades: state.trades.map((t) => (t.tradeId === tradeId ? { ...t, ...updates } : t)),
    })),
  setActiveTrade: (trade) => set({ activeTrade: trade }),
}));
