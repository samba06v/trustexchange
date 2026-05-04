import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const wallets = [
  { name: 'MetaMask', icon: '🦊', desc: 'Connect using browser extension', popular: true },
  { name: 'WalletConnect', icon: '🔗', desc: 'Scan QR with mobile wallet', popular: false },
  { name: 'Coinbase Wallet', icon: '🔵', desc: 'Connect Coinbase smart wallet', popular: false },
  { name: 'Ledger', icon: '🔐', desc: 'Connect hardware wallet', popular: false },
];

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<string | null>(null);

  const handleConnect = async (walletName: string) => {
    if (walletName !== 'MetaMask') {
      // For other wallets, show coming soon
      setConnecting(walletName);
      setTimeout(() => {
        setConnecting(null);
        alert('Coming soon!');
      }, 1000);
      return;
    }

    setConnecting(walletName);
    try {
      // Import web3Service dynamically to avoid build issues
      const { web3Service } = await import('../services/web3');
      const { socketService } = await import('../services/socket');
      const { useWalletStore } = await import('../store/walletStore');
      
      const { address, chainId } = await web3Service.connectWallet();
      const balance = await web3Service.getBalance(address);
      
      useWalletStore.getState().connect(address, chainId);
      useWalletStore.getState().setBalance(balance);
      socketService.connect(address);
      
      setConnecting(null);
      setConnected(walletName);
      setTimeout(() => {
        onClose();
        setConnected(null);
      }, 1500);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setConnecting(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-md rounded-3xl p-7 relative overflow-hidden"
            style={{ background: '#13102b', border: '1px solid rgba(139,92,246,0.25)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-purple-600/10 blur-2xl rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white font-bold text-xl">Connect Wallet</h2>
                  <p className="text-slate-500 text-sm mt-0.5">Choose your preferred wallet</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  ✕
                </button>
              </div>

              {connected ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center py-8 gap-4"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-3xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    ✓
                  </motion.div>
                  <div className="text-white font-bold text-lg">Connected!</div>
                  <div className="text-green-400 text-sm">{connected} connected successfully</div>
                  <div className="px-3 py-1.5 rounded-lg bg-purple-600/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
                    0x7a2f...3c9d
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {wallets.map((wallet) => (
                    <motion.button
                      key={wallet.name}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group"
                      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
                      whileHover={{ borderColor: 'rgba(139,92,246,0.4)', background: 'rgba(139,92,246,0.05)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleConnect(wallet.name)}
                      disabled={!!connecting}
                    >
                      <div className="text-3xl w-12 text-center flex-shrink-0">{wallet.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{wallet.name}</span>
                          {wallet.popular && (
                            <span className="px-2 py-0.5 rounded text-xs bg-purple-600/20 text-purple-300 border border-purple-500/20">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-slate-500 text-xs mt-0.5">{wallet.desc}</div>
                      </div>

                      {connecting === wallet.name ? (
                        <motion.div
                          className="w-5 h-5 rounded-full border-2 border-purple-500 border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 group-hover:text-purple-400 transition-colors">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              <div className="mt-6 text-center text-slate-600 text-xs">
                By connecting, you agree to our{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
