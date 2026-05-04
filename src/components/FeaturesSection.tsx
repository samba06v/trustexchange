import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const frontendFeatures = [
  {
    num: '01',
    title: 'Wallet Integration',
    desc: 'Seamless, one-click connectivity via MetaMask and WalletConnect ensures frictionless onboarding for both new and experienced Web3 users — no account registration required.',
    color: '#8b5cf6',
    icon: '🦊',
    tags: ['MetaMask', 'WalletConnect', 'Web3Modal'],
    badge: 'UX',
  },
  {
    num: '02',
    title: 'Merchant Registration & Ad Publishing',
    desc: 'Verified merchants can create, customise, and manage buy/sell offers in real time — setting their own pricing, min/max limits, and accepted payment methods with full autonomy.',
    color: '#ec4899',
    icon: '📢',
    tags: ['Real-time', 'Custom Pricing', 'Multi-method'],
    badge: 'MERCHANT',
  },
  {
    num: '03',
    title: 'Real-Time Trade Tracking',
    desc: 'Live status updates and a robust push notification system keep both parties fully informed at every stage — from escrow lock confirmation through to final USDT release.',
    color: '#06b6d4',
    icon: '📡',
    tags: ['WebSocket', 'Push Notifications', 'Live Status'],
    badge: 'LIVE',
  },
];

const engineFeatures = [
  {
    title: 'Smart Contract Deployment',
    desc: 'Custom-built, rigorously audited Solidity contracts handle every aspect of escrow logic — from locking to conditional release — with zero off-chain reliance.',
    color: '#8b5cf6',
    emoji: '🔐',
    metric: 'Zero off-chain reliance',
  },
  {
    title: 'Blockchain Verification',
    desc: 'Every transaction recorded on an immutable, publicly verifiable ledger. Automated on-chain verification eliminates ambiguity about trade state.',
    color: '#ec4899',
    emoji: '⛓️',
    metric: '100% immutable records',
  },
  {
    title: 'Analytics Dashboard',
    desc: 'Comprehensive data visualisation gives users granular insight into trading volume, success rates, completion times, and full portfolio history.',
    color: '#06b6d4',
    emoji: '📊',
    metric: 'Full portfolio insights',
  },
  {
    title: 'Audited Security Layer',
    desc: 'All contracts undergo formal security audits pre-deployment. Reentrancy guards, time-locks, and multi-sig release options baked into the architecture.',
    color: '#f59e0b',
    emoji: '🛡️',
    metric: 'Multi-layer protection',
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const ref2 = useRef<HTMLDivElement>(null);
  const inView2 = useInView(ref2, { once: true, margin: '-80px' });

  return (
    <>
      {/* Frontend Features */}
      <section id="features" className="relative py-28 overflow-hidden" ref={ref}>
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-900/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 grid-bg opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="section-badge mb-5 inline-flex">USER EXPERIENCE</span>
            <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4">
              Key Features —<br />
              <span className="gradient-text-purple">The Frontend</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {frontendFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                className="group card-3d rounded-2xl p-0 overflow-hidden"
                whileHover={{ x: 4 }}
              >
                <div className="flex gap-0">
                  {/* Left colored bar */}
                  <div
                    className="w-1.5 flex-shrink-0 transition-all duration-300 group-hover:w-2"
                    style={{ background: feature.color }}
                  />

                  <div className="flex-1 p-7">
                    <div className="flex items-start gap-6">
                      {/* Icon circle */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-2">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110"
                          style={{ background: `${feature.color}20`, border: `2px solid ${feature.color}40` }}
                        >
                          {feature.icon}
                        </div>
                        <div
                          className="px-2 py-0.5 rounded text-xs font-bold"
                          style={{ background: `${feature.color}20`, color: feature.color }}
                        >
                          {feature.num}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                          <span
                            className="px-2 py-0.5 rounded text-xs font-bold tracking-wider"
                            style={{ background: `${feature.color}15`, color: feature.color, border: `1px solid ${feature.color}30` }}
                          >
                            {feature.badge}
                          </span>
                        </div>

                        <p className="text-slate-400 leading-relaxed mb-4">{feature.desc}</p>

                        <div className="flex flex-wrap gap-2">
                          {feature.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-400 border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center text-slate-700 text-xs tracking-widest uppercase">
          ASTRAFORGE · TRUSTEXCHANGE · ROCKVERSE 2026
        </div>
      </section>

      {/* Engine Room Features */}
      <section className="relative py-28 overflow-hidden" ref={ref2}>
        <div className="absolute left-0 top-0 w-96 h-96 bg-cyan-900/5 rounded-full blur-3xl" />
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 hex-bg opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="section-badge mb-5 inline-flex">TECHNICAL ENGINE</span>
            <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4">
              Key Features —<br />
              <span className="animated-gradient-text">The Engine Room</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {engineFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={inView2 ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + idx * 0.12 }}
                className="flip-card"
              style={{ height: '300px' }}
              >
                <div className="flip-card-inner h-full">
                  {/* Front */}
                  <div
                    className="flip-card-front card-3d rounded-2xl p-6 h-full flex flex-col overflow-hidden"
                    style={{ border: `1px solid ${feature.color}25` }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: feature.color }}
                    />
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 mx-auto"
                      style={{ background: `${feature.color}20`, border: `1px solid ${feature.color}30` }}
                    >
                      {feature.emoji}
                    </div>
                    <h3 className="text-white font-bold text-center text-lg leading-tight mb-3">{feature.title}</h3>
                    <p className="text-slate-400 text-sm text-center leading-relaxed flex-1">{feature.desc}</p>
                    <div className="mt-4 text-center">
                      <span
                        className="text-xs font-semibold"
                        style={{ color: feature.color }}
                      >
                        Hover for more →
                      </span>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="flip-card-back rounded-2xl p-6 h-full flex flex-col items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}08)`,
                      border: `1px solid ${feature.color}40`,
                    }}
                  >
                    <div className="text-4xl mb-4">{feature.emoji}</div>
                    <div className="text-white font-bold text-lg mb-3 text-center">{feature.title}</div>
                    <div
                      className="px-4 py-2 rounded-xl text-sm font-semibold"
                      style={{ background: `${feature.color}20`, color: feature.color, border: `1px solid ${feature.color}40` }}
                    >
                      {feature.metric}
                    </div>
                    <div className="mt-4 w-full">
                      <div className="h-px w-full" style={{ background: `${feature.color}30` }} />
                      <div className="mt-4 text-slate-400 text-xs text-center">
                        Built with security-first architecture
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center text-slate-700 text-xs tracking-widest uppercase">
          ASTRAFORGE · TRUSTEXCHANGE · ROCKVERSE 2026
        </div>
      </section>
    </>
  );
}
