import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const techCards = [
  {
    title: 'Frontend',
    subtitle: 'React / Next.js',
    color: '#8b5cf6',
    icon: '⚛️',
    desc: 'Server-side rendering for SEO and performance, paired with a responsive, mobile-first UI optimised for Web3 interactions.',
    features: ['SSR/SSG', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    metric: { label: 'Performance Score', value: '98/100' },
  },
  {
    title: 'Web3 Integration',
    subtitle: 'Ethers.js / Web3.js',
    color: '#ec4899',
    icon: '🔗',
    desc: 'Robust libraries connecting the frontend directly to on-chain contract state, wallet signatures, and transaction broadcasting.',
    features: ['ethers.js v6', 'wagmi', 'viem', 'WalletConnect'],
    metric: { label: 'Chain Support', value: '15+ Networks' },
  },
  {
    title: 'Smart Contracts',
    subtitle: 'Solidity on EVM',
    color: '#06b6d4',
    icon: '📜',
    desc: 'Deployed on Ethereum, Polygon, or Arbitrum for significantly lower gas fees without sacrificing security or composability.',
    features: ['Solidity 0.8+', 'OpenZeppelin', 'Hardhat', 'Foundry'],
    metric: { label: 'Gas Optimised', value: '~40% savings' },
  },
  {
    title: 'Wallet Auth',
    subtitle: 'Cryptographic Signatures',
    color: '#f59e0b',
    icon: '🔑',
    desc: 'Fully passwordless, phishing-resistant login using wallet-signed messages. No usernames, no passwords, no attack surface.',
    features: ['EIP-712', 'SIWE', 'Passkeys', 'Multi-sig'],
    metric: { label: 'Attack Surface', value: 'Near Zero' },
  },
];

const networkBadges = [
  { name: 'Ethereum', color: '#627eea', symbol: 'ETH' },
  { name: 'Polygon', color: '#8247e5', symbol: 'MATIC' },
  { name: 'Arbitrum', color: '#28a0f0', symbol: 'ARB' },
  { name: 'Optimism', color: '#ff0420', symbol: 'OP' },
  { name: 'BSC', color: '#f0b90b', symbol: 'BNB' },
];

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tech-stack" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-900/5 rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <span className="section-badge mb-5 inline-flex">TECHNICAL ARCHITECTURE</span>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4">
            Built to Scale —<br />
            <span className="animated-gradient-text">The Tech Stack</span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl">
            Engineered on a battle-tested, modular stack optimised for performance, security, and EVM compatibility.
          </p>
        </motion.div>

        {/* Network badges */}
        <motion.div
          className="flex flex-wrap gap-3 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <span className="text-slate-500 text-sm self-center">Deployed on:</span>
          {networkBadges.map((net, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{
                background: `${net.color}15`,
                border: `1px solid ${net.color}30`,
                color: net.color,
              }}
              whileHover={{ scale: 1.08, boxShadow: `0 0 15px ${net.color}30` }}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: net.color }} />
              {net.symbol}
            </motion.div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + idx * 0.12 }}
              className="group card-3d rounded-2xl p-6 flex flex-col overflow-hidden relative"
              whileHover={{ y: -8, rotateX: 3 }}
            >
              {/* Top border */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                style={{ background: card.color }}
              />

              {/* Bg glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${card.color}0a, transparent 70%)` }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 mx-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: `${card.color}20`, border: `1px solid ${card.color}30` }}
                >
                  {card.icon}
                </div>

                <h3 className="text-white font-bold text-center text-lg mb-1">{card.title}</h3>
                <div
                  className="text-center text-sm font-semibold mb-4"
                  style={{ color: card.color }}
                >
                  {card.subtitle}
                </div>

                <p className="text-slate-400 text-sm text-center leading-relaxed mb-5">{card.desc}</p>

                {/* Feature tags */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                  {card.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-slate-500 border border-white/5"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Metric */}
                <div
                  className="rounded-xl p-3 text-center"
                  style={{ background: `${card.color}10`, border: `1px solid ${card.color}25` }}
                >
                  <div className="text-xs text-slate-500 mb-1">{card.metric.label}</div>
                  <div className="font-bold text-base" style={{ color: card.color }}>{card.metric.value}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 rounded-2xl border border-purple-500/15 bg-purple-900/5 p-8 overflow-hidden relative"
        >
          <div className="absolute inset-0 hex-bg opacity-20" />
          <div className="relative z-10">
            <div className="text-center text-purple-300 font-bold mb-6">System Architecture Flow</div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {[
                { label: 'User Wallet', color: '#8b5cf6' },
                { arrow: true },
                { label: 'React Frontend', color: '#ec4899' },
                { arrow: true },
                { label: 'ethers.js', color: '#06b6d4' },
                { arrow: true },
                { label: 'Smart Contract', color: '#f59e0b' },
                { arrow: true },
                { label: 'EVM Chain', color: '#10b981' },
              ].map((item, idx) => (
                item.arrow ? (
                  <motion.div
                    key={idx}
                    className="text-slate-600 text-xl"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, delay: idx * 0.1, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                ) : (
                  <div
                    key={idx}
                    className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap"
                    style={{
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}30`,
                      color: item.color,
                    }}
                  >
                    {item.label}
                  </div>
                )
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-20 text-center text-slate-700 text-xs tracking-widest uppercase">
        ASTRAFORGE · TRUSTEXCHANGE · ROCKVERSE 2026
      </div>
    </section>
  );
}
