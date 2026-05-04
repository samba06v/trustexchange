import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const typewriterWords = ['Trustless.', 'Transparent.', 'Decentralised.'];

function Orb3D() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.005;
      orb.style.transform = `rotateY(${t * 30}deg) rotateX(${Math.sin(t) * 10}deg)`;
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-[420px] h-[420px]">
      {/* Outer atmosphere */}
      <div className="absolute inset-0 rounded-full bg-purple-600/5 blur-3xl animate-pulse" />

      {/* Rings */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '600px' }}>
        {/* Ring 1 */}
        <div
          className="absolute w-[380px] h-[380px] rounded-full border border-purple-500/20"
          style={{ animation: 'ringRotate1 12s linear infinite', transformStyle: 'preserve-3d' }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-600/60" />
        </div>

        {/* Ring 2 */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full border border-pink-500/20"
          style={{ animation: 'ringRotate2 8s linear infinite', transformStyle: 'preserve-3d' }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-pink-400 shadow-lg shadow-pink-400/50" />
        </div>

        {/* Ring 3 */}
        <div
          className="absolute w-[220px] h-[220px] rounded-full border border-cyan-500/20"
          style={{ animation: 'ringRotate3 6s linear infinite', transformStyle: 'preserve-3d' }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
        </div>
      </div>

      {/* Core globe */}
      <div ref={orbRef} className="relative w-[160px] h-[160px]" style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-purple-800 to-indigo-900 shadow-2xl">
          {/* Latitude lines */}
          {[30, 50, 70].map((top, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-white/10"
              style={{ top: `${top}%`, borderRadius: '50%' }}
            />
          ))}
          {/* Longitude lines */}
          {[33, 66].map((left, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-white/10"
              style={{ left: `${left}%` }}
            />
          ))}

          {/* Shine */}
          <div className="absolute top-4 left-6 w-16 h-16 rounded-full bg-white/10 blur-lg" />
          <div className="absolute top-2 left-4 w-6 h-6 rounded-full bg-white/20 blur-sm" />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
              <path d="M24 16v16M16 20l8 4 8-4" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Glow */}
        <div className="absolute -inset-4 rounded-full bg-purple-600/20 blur-2xl" />
      </div>

      {/* Floating nodes */}
      {[
        { angle: 0, r: 170, color: '#8b5cf6', label: 'USDT', delay: 0 },
        { angle: 72, r: 160, color: '#ec4899', label: 'ETH', delay: 0.5 },
        { angle: 144, r: 175, color: '#06b6d4', label: 'P2P', delay: 1 },
        { angle: 216, r: 155, color: '#10b981', label: 'EVM', delay: 1.5 },
        { angle: 288, r: 170, color: '#f59e0b', label: 'DeFi', delay: 2 },
      ].map((node, idx) => {
        const x = Math.cos((node.angle * Math.PI) / 180) * node.r;
        const y = Math.sin((node.angle * Math.PI) / 180) * node.r;
        return (
          <motion.div
            key={idx}
            className="absolute flex items-center justify-center"
            style={{
              left: `calc(50% + ${x}px - 24px)`,
              top: `calc(50% + ${y}px - 24px)`,
            }}
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              delay: node.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{
                background: `${node.color}22`,
                border: `1px solid ${node.color}66`,
                boxShadow: `0 0 15px ${node.color}44`,
              }}
            >
              {node.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function TypeWriter({ words }: { words: string[] }) {
  const [displayText, setDisplayText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const speed = deleting ? 60 : 100;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < word.length) {
          setDisplayText(word.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        if (charIdx > 0) {
          setDisplayText(word.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setWordIdx(i => (i + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words]);

  return (
    <span>
      <span className="animated-gradient-text font-extrabold">{displayText}</span>
      <span className="cursor-blink" />
    </span>
  );
}

const statsData = [
  { value: '$2.4T', label: 'P2P Market Cap', color: '#8b5cf6' },
  { value: '0.1%', label: 'Platform Fee', color: '#10b981' },
  { value: '100%', label: 'Non-Custodial', color: '#06b6d4' },
  { value: '∞', label: 'Trustless Trades', color: '#ec4899' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-purple-800/15 blob" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-pink-800/10 blob" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/5 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="section-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse inline-block" />
                ROCKVERSE HACKATHON 2026 · WEB 3.0
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-6xl sm:text-7xl font-extrabold text-white leading-[1.05] mb-4 tracking-tight"
            >
              Trust<span className="gradient-text-purple">Exchange</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-purple-300 leading-tight mb-6"
            >
              Web3 P2P Escrow<br />Trading Platform
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-slate-400 text-lg leading-relaxed max-w-xl mb-10"
            >
              A decentralised, trustless peer-to-peer trading ecosystem engineered to facilitate
              secure exchanges of USDT and other stablecoins with fiat currency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <motion.button
                className="btn-3d px-8 py-4 text-base font-bold text-white rounded-xl relative z-10 flex items-center gap-3"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="white" />
                </svg>
                Launch Platform
              </motion.button>
              <motion.button
                className="px-8 py-4 text-base font-semibold text-purple-300 border border-purple-500/30 rounded-xl hover:border-purple-400/60 hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                </svg>
                Whitepaper
              </motion.button>
            </motion.div>

            {/* Team badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-3 bg-purple-600/10 border border-purple-500/20 rounded-xl"
            >
              <div className="flex -space-x-2">
                {['A', 'S', 'T', 'R'].map((l, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white border border-purple-500/30"
                    style={{ background: `hsl(${260 + i * 15}, 60%, 40%)` }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <span className="text-slate-400 text-sm">Team <span className="text-purple-300 font-semibold">AstraForge</span></span>
            </motion.div>
          </div>

          {/* Right: 3D Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative">
              <Orb3D />
            </div>

            {/* Typewriter tagline */}
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
                <TypeWriter words={typewriterWords} />
              </div>
              <div className="text-slate-400 text-sm">Trade with zero anxiety</div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              className="card-3d rounded-2xl p-5 text-center"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.1 }}
            >
              <div className="text-3xl font-extrabold mb-1" style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}66` }}>
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-purple-500 to-transparent" />
      </motion.div>
    </section>
  );
}
