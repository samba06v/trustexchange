import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const targetUsers = [
  {
    icon: '🔄',
    title: 'Crypto-Native Traders',
    desc: 'Demand non-custodial, low-fee P2P infrastructure as an alternative to over-regulated centralised exchanges.',
    color: '#8b5cf6',
    stat: '450M+ traders',
  },
  {
    icon: '💻',
    title: 'Freelancers & Remote Workers',
    desc: 'Receiving stablecoin compensation who need a reliable, low-friction off-ramp to local fiat currencies.',
    color: '#ec4899',
    stat: '1.57B freelancers',
  },
  {
    icon: '🌍',
    title: 'Unbanked Populations',
    desc: 'In emerging markets seeking access to global digital dollars without requiring a traditional bank account.',
    color: '#10b981',
    stat: '1.4B unbanked',
  },
];

const marketStats = [
  { value: '$4.2T', label: 'Global P2P Volume (2025)', color: '#8b5cf6', icon: '📈' },
  { value: '340%', label: 'YoY Growth Rate', color: '#10b981', icon: '🚀' },
  { value: '$890B', label: 'Stablecoin Market Cap', color: '#06b6d4', icon: '💎' },
  { value: '67M+', label: 'Active P2P Users', color: '#f59e0b', icon: '👥' },
];

export default function MarketSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="market" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
      <div className="absolute inset-0 hex-bg opacity-20" />
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-green-900/5 rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-1/3 w-96 h-96 bg-purple-900/8 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-badge mb-5 inline-flex">MARKET OPPORTUNITY</span>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4">
            Target Market &<br />
            <span className="gradient-text-purple">The Demand Signal</span>
          </h2>
        </motion.div>

        {/* Market stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {marketStats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="card-3d rounded-2xl p-5 text-center relative overflow-hidden group"
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div
                className="text-2xl sm:text-3xl font-extrabold mb-1"
                style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}60` }}
              >
                {stat.value}
              </div>
              <div className="text-slate-400 text-xs">{stat.label}</div>
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Who We Serve */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card-3d rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

            <div className="text-purple-400 font-bold text-xl mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-600/30 flex items-center justify-center">🎯</div>
              Who We Serve
            </div>

            <div className="space-y-6">
              {targetUsers.map((user, idx) => (
                <motion.div
                  key={idx}
                  className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/3 cursor-default"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + idx * 0.15 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${user.color}15`, border: `1px solid ${user.color}25` }}
                  >
                    {user.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-bold text-base">{user.title}</h3>
                      <span className="text-xs" style={{ color: user.color }}>{user.stat}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{user.desc}</p>
                  </div>

                  {idx < targetUsers.length - 1 && (
                    <div className="absolute left-8 right-8 h-px bg-white/5 bottom-0" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Market Gap */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="card-3d rounded-3xl p-8 relative overflow-hidden flex flex-col"
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #ec4899, transparent)' }}
            />

            <div className="text-purple-400 font-bold text-xl mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-600/20 flex items-center justify-center">📊</div>
              The Market Gap
            </div>

            <p className="text-slate-300 leading-relaxed mb-6">
              As centralised exchanges face escalating global regulatory pressure — including KYC mandates,
              asset freezes, and outright bans — demand for non-custodial, fiat-integrated P2P platforms
              is scaling exponentially.
            </p>

            <div className="border-t border-purple-500/15 pt-6 mb-6">
              <p className="text-slate-300 text-sm italic leading-relaxed">
                <span className="text-white font-semibold not-italic">TrustExchange</span> is positioned
                precisely at this inflection point, offering the infrastructure the market urgently needs.
              </p>
            </div>

            {/* Demand signal */}
            <motion.div
              className="rounded-2xl p-5 relative overflow-hidden mt-auto"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)' }}
              animate={{ boxShadow: ['0 0 0px rgba(139,92,246,0)', '0 0 25px rgba(139,92,246,0.2)', '0 0 0px rgba(139,92,246,0)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">📈</div>
                <div className="text-white font-bold">Demand scaling exponentially</div>
              </div>

              {/* Bar chart visual */}
              <div className="flex items-end gap-2 h-16">
                {[30, 45, 55, 65, 75, 88, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t"
                    style={{ background: `linear-gradient(180deg, #8b5cf6, #7c3aed)` }}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${h}%` } : { height: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>2019</span>
                <span>2022</span>
                <span>2025</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="mt-20 text-center text-slate-700 text-xs tracking-widest uppercase">
        ASTRAFORGE · TRUSTEXCHANGE · ROCKVERSE 2026
      </div>
    </section>
  );
}
