import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const revenueStreams = [
  {
    title: 'Maker / Taker Fees',
    icon: '💸',
    color: '#8b5cf6',
    metric: '~0.1%',
    metricLabel: 'per trade',
    desc: 'A micro-fee collected automatically by the smart contract upon successful trade completion — frictionless and trustless revenue generation at scale.',
    highlight: 'Auto-collected by smart contract',
  },
  {
    title: 'Premium Merchant Tiers',
    icon: '⭐',
    color: '#ec4899',
    metric: 'SaaS',
    metricLabel: 'subscription',
    desc: 'High-volume traders access advanced analytics dashboards, reduced fees, and priority ad placements in the marketplace via tiered subscriptions.',
    highlight: 'Priority access + reduced fees',
  },
  {
    title: 'Dispute Penalty Fees',
    icon: '⚖️',
    color: '#f59e0b',
    metric: '0',
    metricLabel: 'false claims',
    desc: 'A small penalty fee charged to the losing party in arbitrated disputes creates a strong economic disincentive against fraudulent or bad-faith claims.',
    highlight: 'Deters bad-faith disputes',
  },
];

const projections = [
  { year: 'Y1', trades: '10K', volume: '$2M', revenue: '$2K' },
  { year: 'Y2', trades: '250K', volume: '$80M', revenue: '$80K' },
  { year: 'Y3', trades: '2M', volume: '$1B', revenue: '$1M' },
];

export default function BusinessModel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="business" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-purple-800/6 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-badge mb-5 inline-flex">SUSTAINABILITY</span>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4">
            Business Model —<br />
            <span className="gradient-text-purple">How We Sustain</span>
          </h2>
        </motion.div>

        {/* Revenue streams */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {revenueStreams.map((stream, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + idx * 0.15 }}
              className="group card-3d rounded-2xl p-7 flex flex-col relative overflow-hidden"
              whileHover={{ y: -8 }}
            >
              {/* Top border */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: stream.color }}
              />

              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${stream.color}0a, transparent 70%)` }}
              />

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 transition-transform duration-500 group-hover:scale-110"
                style={{ background: `${stream.color}15`, border: `1px solid ${stream.color}25` }}
              >
                {stream.icon}
              </div>

              <h3 className="text-white font-bold text-center text-lg mb-5">{stream.title}</h3>

              {/* Metric box */}
              <div
                className="rounded-xl p-4 text-center mb-5 relative overflow-hidden"
                style={{ background: `${stream.color}12`, border: `1px solid ${stream.color}30` }}
              >
                <div
                  className="text-4xl font-extrabold leading-none"
                  style={{ color: stream.color, textShadow: `0 0 20px ${stream.color}60` }}
                >
                  {stream.metric}
                </div>
                <div className="text-slate-400 text-sm mt-1">{stream.metricLabel}</div>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(105deg, transparent 40%, ${stream.color}15 50%, transparent 60%)`,
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-200% center', '200% center'] }}
                  transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                />
              </div>

              <p className="text-slate-400 text-sm leading-relaxed flex-1">{stream.desc}</p>

              <div
                className="mt-4 px-3 py-2 rounded-lg text-xs font-medium"
                style={{ background: `${stream.color}10`, color: stream.color, border: `1px solid ${stream.color}20` }}
              >
                ✓ {stream.highlight}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projections table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="rounded-2xl border border-purple-500/15 bg-purple-900/8 p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 hex-bg opacity-10" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl">🎯</div>
              <h3 className="text-white font-bold text-xl">Growth Projections</h3>
              <span className="ml-auto px-3 py-1 rounded-full text-xs bg-purple-600/20 text-purple-300 border border-purple-500/20">
                Conservative Estimates
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    {['Year', 'Monthly Trades', 'Volume', 'Revenue'].map((h) => (
                      <th key={h} className="text-left text-slate-500 text-sm font-medium pb-4 pr-6">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projections.map((proj, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      className="border-t border-white/5"
                    >
                      <td className="py-4 pr-6">
                        <span className="text-purple-400 font-bold">{proj.year}</span>
                      </td>
                      <td className="py-4 pr-6">
                        <span className="text-white font-semibold">{proj.trades}</span>
                      </td>
                      <td className="py-4 pr-6">
                        <span className="text-green-400 font-semibold">{proj.volume}</span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-cyan-400 font-semibold">{proj.revenue}</span>
                          <div className="flex-1 max-w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={inView ? { width: idx === 0 ? '15%' : idx === 1 ? '55%' : '100%' } : { width: 0 }}
                              transition={{ duration: 1, delay: 0.8 + idx * 0.2 }}
                            />
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Competitive advantage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: 'vs Binance P2P', ours: '0.1%', theirs: '0%*', note: '*hidden in spread' },
            { label: 'vs LocalBitcoins', ours: '0.1%', theirs: '1%', note: 'was shut down' },
            { label: 'vs Paxful', ours: '0.1%', theirs: '1-5%', note: 'also shut down' },
            { label: 'vs OKX P2P', ours: '0.1%', theirs: '0.1%*', note: '*custodial risk' },
          ].map((comp, idx) => (
            <motion.div
              key={idx}
              className="rounded-xl p-4 bg-white/2 border border-white/5 hover:border-purple-500/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 + idx * 0.1 }}
            >
              <div className="text-slate-500 text-xs mb-2">{comp.label}</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-400 font-bold text-sm">TrustEx: {comp.ours}</span>
              </div>
              <div className="text-slate-600 text-xs">Them: {comp.theirs}</div>
              <div className="text-slate-700 text-xs italic">{comp.note}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-20 text-center text-slate-700 text-xs tracking-widest uppercase">
        ASTRAFORGE · TRUSTEXCHANGE · ROCKVERSE 2026
      </div>
    </section>
  );
}
