import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const valueCards = [
  {
    title: 'Decentralised Escrow',
    desc: 'Smart contracts replace custodial intermediaries entirely.',
    color: '#8b5cf6',
    icon: '🔐',
  },
  {
    title: 'Trustless Fiat-to-Crypto',
    desc: 'Stablecoins locked on-chain until fiat payment is confirmed.',
    color: '#ec4899',
    icon: '⚡',
  },
  {
    title: 'Total User Control',
    desc: 'Non-custodial architecture — users retain private keys until trade execution.',
    color: '#06b6d4',
    icon: '🛡️',
  },
];

const promises = [
  { text: 'Zero anxiety', color: '#10b981' },
  { text: 'Zero custody risk', color: '#10b981' },
  { text: 'Full cryptographic proof', color: '#10b981' },
];

export default function SolutionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="solution" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute left-0 top-1/4 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-pink-900/8 rounded-full blur-3xl" />
      <div className="absolute inset-0 hex-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-badge mb-5 inline-flex">THE SOLUTION</span>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4">
            The Value <span className="gradient-text-purple">Proposition</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Core Promise Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="card-3d rounded-3xl p-8 relative overflow-hidden group"
            style={{ border: '1px solid rgba(139,92,246,0.25)' }}
          >
            {/* Top border gradient */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

            {/* Bg pattern */}
            <div className="absolute inset-0 hex-bg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="text-purple-400 font-bold text-xl mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600/30 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                The Core Promise
              </div>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                TrustExchange introduces a fully decentralised escrow layer where smart contracts act as the
                incorruptible, impartial middleman — permanently removing the need to trust a counterparty you've never met.
              </p>

              <div className="border-t border-purple-500/20 pt-6 mb-6">
                <p className="text-slate-400 text-sm italic mb-4">Trade USDT for fiat with:</p>
                <div className="space-y-3">
                  {promises.map((p, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: p.color }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                          <polyline points="20 6 9 17 4 12" strokeWidth="3" stroke="white" fill="none" />
                        </svg>
                      </div>
                      <span className="text-white font-semibold">{p.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Animated escrow visualization */}
              <div className="relative rounded-xl bg-purple-900/20 border border-purple-500/15 p-4 overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center mx-auto mb-1 text-lg">👤</div>
                    <div className="text-xs text-slate-400">Buyer</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-purple-500"
                      animate={{ x: [0, 20, 0], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-3 h-3 rounded-full bg-purple-400"
                      animate={{ x: [0, 20, 0], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.div
                      className="w-3 h-3 rounded-full bg-purple-300"
                      animate={{ x: [0, 20, 0], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-purple-800/50 flex items-center justify-center mx-auto mb-1 text-lg">🔒</div>
                    <div className="text-xs text-slate-400">Escrow</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-green-500"
                      animate={{ x: [0, 20, 0], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                    />
                    <motion.div
                      className="w-3 h-3 rounded-full bg-green-400"
                      animate={{ x: [0, 20, 0], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                    />
                    <motion.div
                      className="w-3 h-3 rounded-full bg-green-300"
                      animate={{ x: [0, 20, 0], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-xl bg-green-600/30 flex items-center justify-center mx-auto mb-1 text-lg">👤</div>
                    <div className="text-xs text-slate-400">Seller</div>
                  </div>
                </div>
                {/* Scan line */}
                <motion.div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                  animate={{ y: [0, 100, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ top: 0 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right value cards */}
          <div className="flex flex-col gap-5">
            {valueCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + idx * 0.15 }}
                className="card-3d rounded-2xl p-6 relative overflow-hidden group flex-1"
                whileHover={{ scale: 1.02 }}
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }}
                />

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                    style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 text-center text-slate-700 text-xs tracking-widest uppercase">
        ASTRAFORGE · TRUSTEXCHANGE · ROCKVERSE 2026
      </div>
    </section>
  );
}
