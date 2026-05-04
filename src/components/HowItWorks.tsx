import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Initiation',
    desc: "Buyer and Seller agree on trade terms via the platform's secure trade initiation interface.",
    color: '#8b5cf6',
    icon: '🤝',
    detail: 'Both parties connect their wallets, set trade amount, price, and preferred payment method. A trade ID is generated on-chain.',
  },
  {
    num: '02',
    title: 'Escrow Lock',
    desc: "Seller's USDT is deposited into an immutable smart contract, locked until all conditions are met.",
    color: '#ec4899',
    icon: '🔒',
    detail: "The seller's USDT is transferred to the escrow smart contract. Funds are cryptographically locked — no party can move them unilaterally.",
  },
  {
    num: '03',
    title: 'Fiat Transfer',
    desc: "Buyer sends fiat via their preferred channel — bank transfer, UPI, PayPal, and more.",
    color: '#f59e0b',
    icon: '💸',
    detail: 'The buyer completes the off-chain fiat payment using their chosen method. All payment details are securely shared in-app.',
  },
  {
    num: '04',
    title: 'Verify & Release',
    desc: "Seller confirms fiat receipt; smart contract instantly releases USDT to the Buyer's wallet.",
    color: '#10b981',
    icon: '✅',
    detail: "The seller confirms receipt. The smart contract automatically executes, transferring USDT directly to the buyer's non-custodial wallet.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Animated flow line */}
      <div className="absolute left-1/2 top-40 bottom-40 w-px -translate-x-1/2 hidden xl:block">
        <motion.div
          className="h-full bg-gradient-to-b from-purple-500/0 via-purple-500/30 to-purple-500/0"
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <span className="section-badge mb-5 inline-flex">CORE TRANSACTION FLOW</span>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4">
            How It <span className="gradient-text-purple">Works</span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-3xl">
            Every trade follows a structured, four-stage flow governed entirely by smart contract logic — no human intervention, no single point of failure.
          </p>
        </motion.div>

        {/* Flow animation bar */}
        <motion.div
          className="flex items-center gap-2 mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2 flex-1">
              <motion.div
                className="flex-1 h-1 rounded-full"
                style={{ background: step.color }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.2 }}
              />
              {idx < steps.length - 1 && (
                <motion.div
                  className="w-3 h-3 flex-shrink-0"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 + idx * 0.2 }}
                >
                  <svg viewBox="0 0 12 12" fill={step.color}>
                    <polygon points="0,0 12,6 0,12" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + idx * 0.15 }}
              className={`card-3d rounded-2xl p-8 cursor-pointer relative overflow-hidden transition-all duration-300 ${
                activeStep === idx ? 'ring-1' : ''
              }`}
              style={activeStep === idx ? { boxShadow: `0 0 0 1px ${step.color}66` } : {}}
              onClick={() => setActiveStep(activeStep === idx ? null : idx)}
              whileHover={{ y: -4 }}
            >
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: step.color }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.15 }}
              />

              {/* Active glow */}
              {activeStep === idx && (
                <div
                  className="absolute inset-0 rounded-2xl opacity-10"
                  style={{ background: step.color }}
                />
              )}

              <div className="flex items-start gap-5">
                {/* Step number + icon */}
                <div className="flex-shrink-0">
                  <div
                    className="text-4xl font-black leading-none mb-2 tabular-nums"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                  >
                    {step.icon}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>

                  {/* Expanded detail */}
                  <motion.div
                    initial={false}
                    animate={{ height: activeStep === idx ? 'auto' : 0, opacity: activeStep === idx ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-slate-300 text-sm leading-relaxed">{step.detail}</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Click hint */}
              <div className="absolute bottom-4 right-4 text-xs text-slate-600">
                {activeStep === idx ? 'Click to collapse' : 'Click for details'}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Smart Contract guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10 rounded-2xl border border-purple-500/15 bg-purple-900/10 p-6 flex flex-col sm:flex-row items-center gap-5"
        >
          <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center text-3xl flex-shrink-0">⚡</div>
          <div>
            <div className="text-purple-300 font-bold mb-1">100% On-Chain Guarantee</div>
            <p className="text-slate-400 text-sm">
              Every trade step is governed by immutable Solidity smart contracts deployed on EVM-compatible chains.
              No human can alter, pause, or override the contract logic once deployed.
            </p>
          </div>
          <div className="sm:ml-auto flex-shrink-0">
            <div className="flex gap-2">
              {['ETH', 'MATIC', 'ARB'].map((chain) => (
                <div key={chain} className="px-3 py-1.5 rounded-lg bg-purple-600/20 border border-purple-500/20 text-purple-300 text-xs font-mono">
                  {chain}
                </div>
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
