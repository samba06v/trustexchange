import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const phases = [
  {
    quarter: 'Q1 2026',
    label: 'Genesis',
    status: 'done',
    color: '#10b981',
    items: [
      { text: 'Core escrow smart contract development', done: true },
      { text: 'Internal security audit (0 critical findings)', done: true },
      { text: 'MVP frontend with React + TypeScript', done: true },
      { text: 'Testnet deployment (Sepolia + Mumbai)', done: true },
      { text: 'Team formation & Rockverse hackathon entry', done: true },
    ],
  },
  {
    quarter: 'Q2 2026',
    label: 'Alpha Launch',
    status: 'active',
    color: '#8b5cf6',
    items: [
      { text: 'Public testnet beta — invite-only 500 users', done: true },
      { text: 'External audit by CertiK', done: false },
      { text: 'Wallet integrations: MetaMask, WalletConnect, Coinbase', done: true },
      { text: 'Multi-chain deployment: Ethereum + Polygon + Arbitrum', done: false },
      { text: 'Dispute resolution module v1', done: false },
    ],
  },
  {
    quarter: 'Q3 2026',
    label: 'Mainnet',
    status: 'upcoming',
    color: '#06b6d4',
    items: [
      { text: 'Mainnet launch across 5 EVM chains', done: false },
      { text: 'Mobile app (React Native) — iOS & Android', done: false },
      { text: 'KYC-lite integration for high-volume traders', done: false },
      { text: 'Reputation system & trust score on-chain', done: false },
      { text: 'DAO governance token launch', done: false },
    ],
  },
  {
    quarter: 'Q4 2026',
    label: 'Scale',
    status: 'upcoming',
    color: '#ec4899',
    items: [
      { text: 'SWIFT / traditional bank fiat rails bridge', done: false },
      { text: 'SDK for third-party escrow integrations', done: false },
      { text: 'Institutional-grade API & white-label solution', done: false },
      { text: '100,000 MAU milestone target', done: false },
      { text: 'Series A fundraising round', done: false },
    ],
  },
  {
    quarter: '2027+',
    label: 'Ecosystem',
    status: 'future',
    color: '#f59e0b',
    items: [
      { text: 'Cross-chain bridge for non-EVM assets', done: false },
      { text: 'AI-powered fraud detection layer', done: false },
      { text: 'Layer-2 custom rollup for ultra-low gas', done: false },
      { text: 'DeFi yield on escrowed idle funds', done: false },
      { text: 'Global P2P marketplace with 50+ currencies', done: false },
    ],
  },
];

const statusConfig = {
  done: { label: 'Completed', bg: '#10b98115', border: '#10b98140', text: '#10b981' },
  active: { label: 'In Progress', bg: '#8b5cf615', border: '#8b5cf640', text: '#8b5cf6' },
  upcoming: { label: 'Upcoming', bg: '#06b6d415', border: '#06b6d440', text: '#06b6d4' },
  future: { label: 'Future Vision', bg: '#f59e0b15', border: '#f59e0b40', text: '#f59e0b' },
};

export default function RoadmapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="roadmap" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="section-badge mb-5 inline-flex">PRODUCT ROADMAP</span>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4">
            The Path to<br />
            <span className="animated-gradient-text">Trustless Commerce</span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            From hackathon project to global infrastructure — a clear, executable roadmap
            built on transparency and community governance.
          </p>
        </motion.div>

        {/* Progress bar overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-14 rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(139,92,246,0.15)' }}
        >
          <div className="flex items-center justify-between mb-3 text-sm">
            <span className="text-slate-400">Overall Progress</span>
            <span className="font-bold" style={{ color: '#8b5cf6' }}>32% Complete</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #10b981, #8b5cf6, #06b6d4)' }}
              initial={{ width: '0%' }}
              animate={inView ? { width: '32%' } : {}}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-600">
            <span>Genesis</span>
            <span>Alpha</span>
            <span>Mainnet</span>
            <span>Scale</span>
            <span>Ecosystem</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px hidden lg:block"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.4), rgba(6,182,212,0.4), transparent)' }}
          />

          <div className="space-y-8">
            {phases.map((phase, idx) => {
              const cfg = statusConfig[phase.status as keyof typeof statusConfig];
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + idx * 0.12 }}
                  className={`relative lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start ${isLeft ? '' : 'lg:direction-rtl'}`}
                >
                  {/* Center dot */}
                  <div className="absolute left-[50%] -translate-x-1/2 top-6 hidden lg:flex items-center justify-center z-10">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                      style={{
                        background: phase.color,
                        borderColor: phase.color,
                        boxShadow: `0 0 16px ${phase.color}60`,
                      }}
                    />
                    {phase.status === 'active' && (
                      <div
                        className="absolute w-9 h-9 rounded-full animate-ping opacity-30"
                        style={{ background: phase.color }}
                      />
                    )}
                  </div>

                  {/* Card — alternating left/right */}
                  <div className={isLeft ? 'lg:text-right lg:pr-12' : 'lg:col-start-2 lg:pl-12'}>
                    <motion.div
                      className="rounded-2xl p-6 card-shine relative overflow-hidden"
                      style={{
                        background: `${phase.color}08`,
                        border: `1px solid ${phase.color}25`,
                      }}
                      whileHover={{ y: -4, boxShadow: `0 20px 40px ${phase.color}15` }}
                    >
                      {/* Glow bg */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 50% 0%, ${phase.color}0a, transparent 70%)` }} />

                      <div className={`relative z-10`}>
                        {/* Header */}
                        <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                          <div>
                            <div className="font-mono text-xs font-bold" style={{ color: phase.color }}>{phase.quarter}</div>
                            <div className="text-white font-extrabold text-xl">{phase.label}</div>
                          </div>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-bold ml-auto"
                            style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text }}
                          >
                            {cfg.label}
                          </span>
                        </div>

                        {/* Items */}
                        <ul className="space-y-2">
                          {phase.items.map((item, i) => (
                            <li key={i} className={`flex items-start gap-2.5 text-sm ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                              <div
                                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{
                                  background: item.done ? `${phase.color}20` : 'rgba(255,255,255,0.04)',
                                  border: `1px solid ${item.done ? phase.color + '50' : 'rgba(255,255,255,0.1)'}`,
                                }}
                              >
                                {item.done ? (
                                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 6l3 3 5-5" stroke={phase.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                ) : (
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
                                )}
                              </div>
                              <span className={item.done ? 'text-slate-300' : 'text-slate-500'}>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty spacer for opposite side on desktop */}
                  {!isLeft && <div className="hidden lg:block lg:col-start-1 lg:row-start-1" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
