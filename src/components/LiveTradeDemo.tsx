import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mockTrades = [
  { id: '#TX001', buyer: '0x7a2f...3c9d', seller: '0x3b1e...8f2a', amount: '500 USDT', fiat: '₹41,250', method: 'UPI', status: 'Escrow Lock', statusColor: '#ec4899' },
  { id: '#TX002', buyer: '0x9c4d...1a7b', seller: '0x5f3c...2e8d', amount: '1,200 USDT', fiat: '$1,200', method: 'Bank', status: 'Fiat Sent', statusColor: '#f59e0b' },
  { id: '#TX003', buyer: '0x2e8f...4d1c', seller: '0x8a6b...7f3e', amount: '250 USDT', fiat: '€230', method: 'PayPal', status: 'Completed ✓', statusColor: '#10b981' },
  { id: '#TX004', buyer: '0x4f2a...9c5b', seller: '0x1d7e...6a4f', amount: '800 USDT', fiat: '£626', method: 'Wise', status: 'Initiating', statusColor: '#8b5cf6' },
];

export default function LiveTradeDemo() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx(i => (i + 1) % mockTrades.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating demo button */}
      <motion.button
        className="fixed bottom-24 right-8 z-40 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white"
        style={{ background: 'linear-gradient(135deg, #1a1535, #201d42)', border: '1px solid rgba(139,92,246,0.3)' }}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Live Trades
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 40 }}
              className="w-full max-w-lg rounded-2xl p-6 relative overflow-hidden"
              style={{ background: '#13102b', border: '1px solid rgba(139,92,246,0.25)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <h3 className="text-white font-bold text-lg">Live Trade Monitor</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                {mockTrades.map((trade, idx) => (
                  <motion.div
                    key={trade.id}
                    className="rounded-xl p-4 border border-white/5 bg-white/2"
                    animate={{
                      borderColor: currentIdx === idx ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.05)',
                      background: currentIdx === idx ? 'rgba(139,92,246,0.05)' : 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-400 font-mono text-xs">{trade.id}</span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: trade.statusColor, background: `${trade.statusColor}15`, border: `1px solid ${trade.statusColor}30` }}
                      >
                        {trade.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500">Amount: </span>
                        <span className="text-white font-semibold">{trade.amount}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Fiat: </span>
                        <span className="text-green-400 font-semibold">{trade.fiat}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Method: </span>
                        <span className="text-white">{trade.method}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Buyer: </span>
                        <span className="text-slate-300 font-mono">{trade.buyer}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                <span>Showing {mockTrades.length} active trades</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>Real-time updates</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
