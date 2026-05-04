import { create } from 'zustand';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
  chainId: number | null;
  connect: (address: string, chainId: number) => void;
  disconnect: () => void;
  setBalance: (balance: string) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  balance: '0',
  chainId: null,
  connect: (address, chainId) => set({ isConnected: true, address, chainId }),
  disconnect: () => set({ isConnected: false, address: null, balance: '0', chainId: null }),
  setBalance: (balance) => set({ balance }),
}));
