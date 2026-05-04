import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const disputeSteps = [
  {
    num: '01',
    title: 'Funds Remain Locked',
    desc: 'Smart contract continues holding escrowed USDT securely. No party can unilaterally access funds during an active dispute, preventing theft or premature release.',
    color: '#8b5cf6',
    icon: '🔒',
  },
  {
    num: '02',
    title: 'Evidence Submission',
    desc: 'Both parties submit verifiable evidence — bank receipts, UPI transaction IDs, screenshots — directly to the dispute dashboard within a defined submission window.',
    color: '#ec4899',
    icon: '📋',
  },
  {
    num: '03',
    title: 'Arbiter Review',
    desc: 'A decentralised arbiter panel reviews submitted evidence alongside immutable on-chain transaction data, applying a transparent scoring framework to determine the outcome.',
    color: '#f59e0b',
    icon: '⚖️',
  },
  {
    num: '04',
    title: 'Funds Released',
    desc: 'Smart contract executes the arbiter\'s verdict, routing funds to the rightful owner. Losing party incurs a small dispute fee to deter frivolous claims.',
    color: '#10b981',
    icon: '✅',
  },
];

export default function DisputeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/15 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-40 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-800/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <span className="section-badge mb-5 inline-flex">CRITICAL MECHANISM</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mt-4">
            Dispute Resolution —<br />
            <span className="gradient-text-purple">The Hardest Problem, Solved</span>
          </h2>
        </motion.div>

        {/* Scenario box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10 p-6 rounded-xl border border-purple-500/30 bg-purple-900/10 italic text-slate-300"
        >
          <span className="text-purple-400 not-italic font-semibold">The Scenario: </span>
          Buyer claims fiat was sent. Seller claims it was never received. Funds are locked. What happens next?
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {disputeSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + idx * 0.12 }}
              className="group card-3d rounded-2xl p-7 overflow-hidden relative"
              whileHover={{ y: -5 }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }}
              />

              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at top left, ${step.color}0a, transparent 60%)` }}
              />

              <div className="flex items-start gap-5 relative z-10">
                <div className="flex-shrink-0">
                  <div
                    className="text-3xl font-black mb-3 tabular-nums"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                  >
                    {step.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arbiter network visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 rounded-2xl border border-purple-500/15 bg-purple-900/8 p-8"
        >
          <div className="text-center mb-6">
            <div className="text-purple-300 font-bold text-lg mb-2">Decentralised Arbiter Network</div>
            <div className="text-slate-400 text-sm">Transparent, community-governed dispute resolution</div>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            {['🧑‍⚖️ Arbiter A', '🧑‍⚖️ Arbiter B', '🧑‍⚖️ Arbiter C'].map((arbiter, idx) => (
              <motion.div
                key={idx}
                className="px-4 py-2 rounded-xl bg-purple-800/20 border border-purple-500/20 text-purple-300 text-sm font-medium"
                animate={{
                  y: [0, -4, 0],
                  boxShadow: [
                    '0 0 0px rgba(139,92,246,0)',
                    '0 0 15px rgba(139,92,246,0.3)',
                    '0 0 0px rgba(139,92,246,0)',
                  ],
                }}
                transition={{ duration: 2, delay: idx * 0.4, repeat: Infinity }}
              >
                {arbiter}
              </motion.div>
            ))}
            <div className="text-slate-500 text-sm px-2">→</div>
            <motion.div
              className="px-4 py-2 rounded-xl bg-green-800/20 border border-green-500/20 text-green-300 text-sm font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✅ Verdict Executed
            </motion.div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Resolution Time', value: '< 48h', color: '#8b5cf6' },
              { label: 'Dispute Rate', value: '< 0.3%', color: '#10b981' },
              { label: 'Accuracy Rate', value: '99.1%', color: '#06b6d4' },
            ].map((stat, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/2 border border-white/5">
                <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-20 text-center text-slate-700 text-xs tracking-widest uppercase">
        ASTRAFORGE · TRUSTEXCHANGE · ROCKVERSE 2026
      </div>
    </section>
  );
}
