import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-20 border-t border-purple-500/10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[400px] h-[200px] bg-purple-800/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center glow-purple">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#fff" strokeWidth="1.5" fill="rgba(255,255,255,0.1)" />
                  <path d="M12 8v8M8 10l4 2 4-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-xl">Trust<span className="text-purple-400">Exchange</span></div>
                <div className="text-purple-400/60 text-xs tracking-widest">WEB3 P2P ESCROW</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-5">
              A decentralised, trustless peer-to-peer trading ecosystem engineered for the future of finance.
            </p>
            <div className="flex gap-3">
              {[
                { icon: '🐦', label: 'Twitter' },
                { icon: '💬', label: 'Discord' },
                { icon: '📘', label: 'Docs' },
                { icon: '⚙️', label: 'GitHub' },
              ].map((social) => (
                <motion.button
                  key={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-base hover:border-purple-500/40 hover:bg-purple-600/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  title={social.label}
                >
                  {social.icon}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {['Trade Now', 'Marketplace', 'Merchant Hub', 'Analytics', 'API Docs'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-purple-300 text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About AstraForge', 'Whitepaper', 'Security Audit', 'Bug Bounty', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-purple-300 text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chain list */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-10 border-b border-white/5">
          <span className="text-slate-500 text-xs">Live on:</span>
          {[
            { name: 'Ethereum', color: '#627eea' },
            { name: 'Polygon', color: '#8247e5' },
            { name: 'Arbitrum', color: '#28a0f0' },
            { name: 'Optimism', color: '#ff0420' },
          ].map((chain) => (
            <div
              key={chain.name}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs"
              style={{ background: `${chain.color}12`, color: chain.color, border: `1px solid ${chain.color}25` }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: chain.color }} />
              {chain.name}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-600 text-xs">
            © 2026 TrustExchange by Team AstraForge. Rockverse Hackathon 2026.
          </div>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 rounded-xl bg-white/2 border border-white/5">
          <p className="text-slate-600 text-xs leading-relaxed text-center">
            ⚠️ TrustExchange is a decentralised protocol. Users are responsible for their own transactions.
            Smart contracts have been audited but DeFi carries inherent risks. Always DYOR.
          </p>
        </div>
      </div>
    </footer>
  );
}
