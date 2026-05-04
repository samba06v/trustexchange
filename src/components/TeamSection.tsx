import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const team = [
  {
    name: 'Samba Ghosh',
    role: 'Full-Stack & Blockchain Lead',
    avatar: 'SG',
    color: '#8b5cf6',
    bio: 'Web3 architect with a passion for trustless systems. Leads smart contract development and platform architecture for TrustExchange.',
    skills: ['Solidity', 'React', 'Node.js', 'EVM'],
    social: { github: '#', twitter: '#', linkedin: '#' },
    badge: 'Team Lead',
  },
  {
    name: 'Astra Member 2',
    role: 'Smart Contract Engineer',
    avatar: 'A2',
    color: '#ec4899',
    bio: 'Specialises in gas-optimised Solidity patterns and DeFi protocol design. Contributor to multiple OpenZeppelin repositories.',
    skills: ['Hardhat', 'Foundry', 'Vyper', 'Auditing'],
    social: { github: '#', twitter: '#', linkedin: '#' },
    badge: 'Core Dev',
  },
  {
    name: 'Astra Member 3',
    role: 'Frontend & UX Engineer',
    avatar: 'A3',
    color: '#06b6d4',
    bio: 'Creates pixel-perfect, accessible Web3 interfaces. Expert in Framer Motion, Three.js, and crypto UX patterns.',
    skills: ['TypeScript', 'Three.js', 'Figma', 'Web3.js'],
    social: { github: '#', twitter: '#', linkedin: '#' },
    badge: 'UX Lead',
  },
  {
    name: 'Astra Member 4',
    role: 'Research & Tokenomics',
    avatar: 'A4',
    color: '#f59e0b',
    bio: 'DeFi researcher with expertise in mechanism design, tokenomics, and on-chain governance. Drives protocol economics.',
    skills: ['DeFi', 'DAO Design', 'Python', 'Research'],
    social: { github: '#', twitter: '#', linkedin: '#' },
    badge: 'Research',
  },
];

const advisors = [
  { initials: 'DK', name: 'Dr. Kavya', role: 'Blockchain Security', color: '#8b5cf6' },
  { initials: 'MR', name: 'Marcus R.', role: 'DeFi Protocol Design', color: '#06b6d4' },
  { initials: 'SP', name: 'Sarah P.', role: 'Regulatory & Legal', color: '#ec4899' },
];

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MemberCard({ member, idx }: { member: typeof team[0]; idx: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: idx * 0.12 }}
      className="flip-card h-72 cursor-pointer"
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        className="flip-card-inner w-full h-full relative"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="flip-card-front rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
          style={{ background: `${member.color}08`, border: `1px solid ${member.color}25`, backfaceVisibility: 'hidden' }}
        >
          {/* Bg glow */}
          <div className="absolute inset-0 rounded-2xl" style={{ background: `radial-gradient(circle at 50% 20%, ${member.color}0a, transparent 70%)` }} />

          {/* Top badge */}
          <div className="absolute top-4 right-4">
            <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ background: `${member.color}20`, color: member.color, border: `1px solid ${member.color}30` }}>
              {member.badge}
            </span>
          </div>

          {/* Avatar */}
          <div className="relative mb-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white"
              style={{ background: `linear-gradient(135deg, ${member.color}60, ${member.color}30)`, border: `2px solid ${member.color}50`, boxShadow: `0 0 30px ${member.color}30` }}
            >
              {member.avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[#0d0b1a] animate-pulse" />
          </div>

          <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
          <p className="text-xs font-semibold mb-4" style={{ color: member.color }}>{member.role}</p>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {member.skills.map(skill => (
              <span key={skill} className="px-2 py-0.5 rounded-md text-xs bg-white/5 text-slate-400 border border-white/8">
                {skill}
              </span>
            ))}
          </div>

          <div className="absolute bottom-4 text-xs text-slate-600">Click to see bio →</div>
        </div>

        {/* Back */}
        <div
          className="flip-card-back rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
          style={{ background: `${member.color}10`, border: `1px solid ${member.color}35`, backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 rounded-2xl" style={{ background: `radial-gradient(circle at 50% 80%, ${member.color}08, transparent 70%)` }} />

          <div className="relative z-10">
            <div className="text-white font-bold text-base mb-1">{member.name}</div>
            <div className="text-xs mb-4" style={{ color: member.color }}>{member.role}</div>
            <p className="text-slate-300 text-sm leading-relaxed">{member.bio}</p>
          </div>

          {/* Social links */}
          <div className="relative z-10 flex items-center gap-3 mt-4">
            {[
              { href: member.social.github, Icon: GithubIcon, label: 'GitHub' },
              { href: member.social.twitter, Icon: TwitterIcon, label: 'Twitter' },
              { href: member.social.linkedin, Icon: LinkedInIcon, label: 'LinkedIn' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                onClick={e => e.stopPropagation()}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                style={{ background: `${member.color}15`, border: `1px solid ${member.color}30` }}
              >
                <Icon />
              </a>
            ))}
            <span className="text-xs text-slate-600 ml-auto">Click to flip ↩</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="team" className="relative py-28 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-900/6 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="section-badge mb-5 inline-flex">THE TEAM</span>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mt-4">
            Meet Team<br />
            <span className="animated-gradient-text">AstraForge</span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            A squad of builders obsessed with trustless systems, cryptographic proofs,
            and beautiful user experiences. Click cards to flip.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {team.map((member, idx) => (
            <MemberCard key={member.name} member={member} idx={idx} />
          ))}
        </div>

        {/* Advisors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="text-center text-slate-500 text-sm uppercase tracking-widest mb-6">Strategic Advisors</div>
          <div className="flex flex-wrap justify-center gap-4">
            {advisors.map((adv, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 px-5 py-3 rounded-xl"
                style={{ background: `${adv.color}08`, border: `1px solid ${adv.color}20` }}
                whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${adv.color}15` }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${adv.color}50, ${adv.color}30)` }}
                >
                  {adv.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{adv.name}</div>
                  <div className="text-slate-500 text-xs">{adv.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hackathon footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 text-center py-8 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(236,72,153,0.04))', border: '1px solid rgba(139,92,246,0.15)' }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500/50" />
            <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Rockverse Hackathon 2026</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500/50" />
          </div>
          <p className="text-slate-400 text-sm">Built with ❤️ by Team AstraForge · Solving trust in P2P commerce</p>
          <div className="flex items-center justify-center gap-6 mt-5 text-xs text-slate-600">
            <span>🔗 EVM · Solidity</span>
            <span>⚛️ React · TypeScript</span>
            <span>🎨 Framer Motion · Three.js</span>
            <span>🛡 OpenZeppelin v5</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
