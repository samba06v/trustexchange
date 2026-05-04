import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const threats = [
  { name: 'Reentrancy Attack', mitigated: true, method: 'OpenZeppelin ReentrancyGuard', risk: 'Critical' },
  { name: 'Integer Overflow', mitigated: true, method: 'Solidity ^0.8.20 SafeMath', risk: 'High' },
  { name: 'Front-Running', mitigated: true, method: 'Commit-Reveal + Deadline', risk: 'High' },
  { name: 'Flash Loan Exploit', mitigated: true, method: 'Single-Tx Escrow Model', risk: 'High' },
  { name: 'Oracle Manipulation', mitigated: true, method: 'On-chain TWAP + Chainlink', risk: 'Medium' },
  { name: 'Phishing / Fake UI', mitigated: true, method: 'EIP-712 Typed Signing', risk: 'Medium' },
  { name: 'Griefing / DoS', mitigated: true, method: 'Gas Limits + Deadlines', risk: 'Low' },
  { name: 'Rug Pull', mitigated: true, method: 'Non-Custodial Architecture', risk: 'Critical' },
];

const layers = [
  {
    title: 'Layer 1 — Contract Security',
    items: ['ReentrancyGuard on all state-changing calls', 'Checks-Effects-Interactions pattern', 'Role-based access control via OpenZeppelin', 'Immutable constructor params, no upgradeable proxy risk'],
    color: '#8b5cf6',
    icon: '📜',
  },
  {
    title: 'Layer 2 — Cryptographic Auth',
    items: ['EIP-712 structured data signing', 'SIWE (Sign-In with Ethereum) standard', 'No passwords, no centralized auth server', 'Hardware wallet & multi-sig support'],
    color: '#06b6d4',
    icon: '🔑',
  },
  {
    title: 'Layer 3 — Dispute Resolution',
    items: ['Time-locked escrow with deadline enforcement', '3-of-5 multi-sig arbitration committee', 'On-chain evidence submission via IPFS CID', 'Transparent arbitration outcome logged on-chain'],
    color: '#ec4899',
    icon: '⚖️',
  },
  {
    title: 'Layer 4 — Operational Security',
    items: ['All sensitive ops emit on-chain events', 'Frontend served via IPFS (censorship-resistant)', 'Bug bounty programme — up to $50k reward', 'Continuous monitoring via Tenderly Alerts'],
    color: '#f59e0b',
    icon: '🛡',
  },
];

function ThreatMatrix() {
  const riskColors: Record<string, string> = {
    Critical: '#f87171',
    High: '#f59e0b',
    Medium: '#06b6d4',
    Low: '#10b981',
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(139,92,246,0.2)', background: '#0d1117' }}>
      <div className="px-5 py-4 flex items-center justify-between" style={{ background: '#161b22', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="text-white font-bold text-sm">⚔️ Threat Mitigation Matrix</span>
        <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: '#10b98115', color: '#10b981', border: '1px solid #10b98130' }}>
          8/8 Mitigated
        </span>
      </div>
      <div className="divide-y divide-white/5">
        {threats.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 px-5 py-3 hover:bg-white/2 transition-colors"
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#10b98120', border: '1px solid #10b98140' }}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium">{t.name}</div>
              <div className="text-slate-500 text-xs truncate">{t.method}</div>
            </div>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
              style={{ color: riskColors[t.risk], background: `${riskColors[t.risk]}15`, border: `1px solid ${riskColors[t.risk]}30` }}
            >
              {t.risk}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AuditScore() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 800);
    return () => clearTimeout(t);
  }, []);

  const metrics = [
    { label: 'Security Score', value: 98, color: '#10b981', suffix: '/100' },
    { label: 'Gas Efficiency', value: 92, color: '#06b6d4', suffix: '%' },
    { label: 'Code Coverage', value: 100, color: '#8b5cf6', suffix: '%' },
    { label: 'Decentralisation', value: 95, color: '#ec4899', suffix: '%' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className="rounded-xl p-4" style={{ background: `${m.color}08`, border: `1px solid ${m.color}25` }}>
          <div className="text-xs text-slate-400 mb-2">{m.label}</div>
          <div className="flex items-end gap-1 mb-2">
            <span className="text-3xl font-extrabold" style={{ color: m.color }}>
              {animated ? m.value : 0}
            </span>
            <span className="text-sm font-bold mb-1" style={{ color: m.color }}>{m.suffix}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${m.color}80, ${m.color})` }}
              initial={{ width: '0%' }}
              animate={{ width: animated ? `${m.value}%` : '0%' }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SecuritySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section id="security" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-900/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="section-badge mb-5 inline-flex">SECURITY ARCHITECTURE</span>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4">
            Fort Knox–Grade<br />
            <span className="animated-gradient-text">Smart Security</span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl">
            Multi-layered defence in depth. Every vector covered, every exploit mitigated.
            Your assets never leave the blockchain's custody.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Threat matrix + audit scores */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ThreatMatrix />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <AuditScore />
            </motion.div>
          </div>

          {/* Right — Security layers */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div className="text-white font-bold text-lg mb-2">🛡 Defence-in-Depth Layers</div>
            {layers.map((layer, idx) => (
              <motion.div
                key={idx}
                className="rounded-2xl p-5 cursor-pointer transition-all duration-300"
                style={{
                  background: activeLayer === idx ? `${layer.color}10` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${activeLayer === idx ? layer.color + '40' : 'rgba(255,255,255,0.06)'}`,
                }}
                onClick={() => setActiveLayer(activeLayer === idx ? -1 : idx)}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-3 mb-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${layer.color}20`, border: `1px solid ${layer.color}30` }}
                  >
                    {layer.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">{layer.title}</div>
                  </div>
                  <motion.div
                    animate={{ rotate: activeLayer === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-500"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </div>

                {activeLayer === idx && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2 pl-2"
                  >
                    {layer.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: layer.color }} />
                        {item}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            ))}

            {/* Audit badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="rounded-2xl p-5 flex items-center gap-5"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.05))', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <div className="text-4xl">🏆</div>
              <div>
                <div className="text-white font-bold">Audit Pending — CertiK & Trail of Bits</div>
                <div className="text-slate-400 text-sm mt-1">Internal audit complete with 0 critical findings. External audit scheduled pre-mainnet.</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
