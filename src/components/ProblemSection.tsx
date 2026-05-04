import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const problems = [
  {
    num: '01',
    title: 'Centralised Risk',
    desc: "Traditional crypto exchanges hold user funds in custodial wallets — high-value honeypots for hacks, breaches, and regulatory seizures. Users have no true ownership until they withdraw.",
    color: '#8b5cf6',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
      </svg>
    ),
    stats: '73% of exchange hacks target custodial wallets',
    barWidth: '73%',
  },
  {
    num: '02',
    title: 'P2P Trust Deficit',
    desc: "Direct P2P trading without a credible intermediary routinely results in scams, fraud, and non-payment — especially when bridging on-chain crypto with off-chain fiat.",
    color: '#f59e0b',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
        <line x1="20" y1="10" x2="20" y2="16" strokeLinecap="round" />
        <line x1="17" y1="13" x2="23" y2="13" strokeLinecap="round" />
      </svg>
    ),
    stats: '$4.2B lost to P2P crypto fraud in 2025',
    barWidth: '89%',
  },
  {
    num: '03',
    title: 'High Friction',
    desc: "Existing P2P solutions impose excessive fees, deliver clunky user interfaces, and operate opaque dispute resolution processes that leave users with zero recourse.",
    color: '#06b6d4',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" strokeLinecap="round" />
        <path d="M4.93 4.93l14.14 14.14" strokeLinecap="round" />
      </svg>
    ),
    stats: 'Average P2P fee: 2.8% — 28x our platform',
    barWidth: '56%',
  },
];

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="problem" className="relative py-28 overflow-hidden" ref={ref}>
      {/* BG accent */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-amber-900/5 rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-0 w-72 h-72 bg-purple-900/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="section-badge mb-5 inline-flex">THE PROBLEM</span>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4">
            Why Does This<br />
            <span className="gradient-text-purple">Need to Exist?</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {problems.map((problem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="group relative card-3d rounded-2xl p-8 overflow-hidden cursor-pointer"
              whileHover={{ x: 6 }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl transition-all duration-500 group-hover:w-2"
                style={{ background: problem.color, boxShadow: `0 0 20px ${problem.color}60` }}
              />

              {/* Holographic shimmer on hover */}
              <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start gap-8">
                {/* Number */}
                <div
                  className="flex-shrink-0 text-5xl font-black tabular-nums tracking-tight opacity-70"
                  style={{ color: problem.color }}
                >
                  {problem.num}
                </div>

                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${problem.color}15`, color: problem.color, border: `1px solid ${problem.color}30` }}
                    >
                      {problem.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white pt-1.5">{problem.title}</h3>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-lg mb-5">{problem.desc}</p>

                  {/* Stat bar */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${problem.color}, ${problem.color}88)` }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: problem.barWidth } : { width: 0 }}
                        transition={{ duration: 1.2, delay: 0.5 + idx * 0.2, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{problem.stats}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl border border-purple-500/20 bg-purple-600/5 text-center"
        >
          <p className="text-slate-300 text-lg">
            The market demands a <span className="text-purple-300 font-semibold">trustless, transparent, decentralised</span> alternative.
            <br />TrustExchange delivers exactly that.
          </p>
        </motion.div>
      </div>

      {/* Footer branding */}
      <div className="mt-20 text-center text-slate-700 text-xs tracking-widest uppercase">
        ASTRAFORGE · TRUSTEXCHANGE · ROCKVERSE 2026
      </div>
    </section>
  );
}
