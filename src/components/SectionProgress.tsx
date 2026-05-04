import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'features', label: 'Features' },
  { id: 'contract', label: 'Smart Contract' },
  { id: 'security', label: 'Security' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'market', label: 'Market' },
  { id: 'business', label: 'Business' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'team', label: 'Team' },
];

export default function SectionProgress() {
  const [active, setActive] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
      const scrollY = window.scrollY + window.innerHeight / 2;
      let found = 0;
      sections.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollY) found = idx;
      });
      setActive(found);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5"
        >
          {sections.map((sec, idx) => (
            <div
              key={sec.id}
              className="relative flex items-center justify-end gap-3 cursor-pointer group"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => scrollTo(sec.id)}
            >
              {/* Label tooltip */}
              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="text-xs font-medium text-purple-300 whitespace-nowrap px-2 py-1 rounded-md bg-purple-900/80 border border-purple-500/30 backdrop-blur-sm"
                  >
                    {sec.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Dot */}
              <motion.div
                animate={{
                  scale: active === idx ? 1.4 : 1,
                  backgroundColor: active === idx ? '#8b5cf6' : hoveredIdx === idx ? '#a78bfa' : 'rgba(139,92,246,0.3)',
                }}
                transition={{ duration: 0.2 }}
                className="rounded-full transition-all"
                style={{
                  width: active === idx ? '10px' : '6px',
                  height: active === idx ? '10px' : '6px',
                  boxShadow: active === idx ? '0 0 12px rgba(139,92,246,0.8)' : 'none',
                }}
              />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
