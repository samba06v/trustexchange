import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Market', href: '#market' },
  { label: 'Business', href: '#business' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center glow-purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#fff" strokeWidth="1.5" fill="rgba(255,255,255,0.1)" />
                <path d="M12 8v8M8 10l4 2 4-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
          </div>
          <div>
            <span className="text-white font-bold text-lg tracking-tight">Trust<span className="text-purple-400">Exchange</span></span>
            <div className="text-purple-400/60 text-xs tracking-widest">WEB3 P2P</div>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-purple-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-purple-600/15 rounded-lg border border-purple-500/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.button
            className="px-4 py-2 text-sm text-purple-300 border border-purple-500/30 rounded-lg hover:border-purple-400/60 hover:text-purple-200 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Connect Wallet
          </motion.button>
          <motion.button
            className="btn-3d px-5 py-2 text-sm font-semibold text-white rounded-lg relative z-10"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Launch App
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 10 : 0 }}
              className="block h-0.5 bg-current rounded"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="block h-0.5 bg-current rounded"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -10 : 0 }}
              className="block h-0.5 bg-current rounded"
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden nav-glass border-t border-purple-500/10 mt-2"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-purple-600/10 rounded-lg transition-all"
                >
                  {item.label}
                </motion.button>
              ))}
              <button className="mt-2 px-4 py-3 btn-3d text-white font-semibold rounded-lg relative z-10">
                Launch App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
