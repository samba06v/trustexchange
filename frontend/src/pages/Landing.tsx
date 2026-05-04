import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Shield, Zap, Globe, ChevronRight, TrendingUp, Lock, Users, ArrowRight, Star } from 'lucide-react'
import ThreeScene from '../components/ThreeScene'

const stats = [
  { label: 'Total Volume', value: '$2.4B+', change: '+18.3%', up: true },
  { label: 'Active Merchants', value: '48,291', change: '+5.1%', up: true },
  { label: 'Success Rate', value: '99.7%', change: '+0.2%', up: true },
  { label: 'Avg. Trade Time', value: '4.2 min', change: '-12%', up: true },
]

const features = [
  { icon: <Shield size={28} />, title: 'Smart Escrow', desc: 'Funds locked on-chain until both parties confirm. No trust required — code enforces the deal.', color: '#8b5cf6' },
  { icon: <Zap size={28} />, title: 'Real-time Trades', desc: 'WebSocket-powered live updates. Watch your trade status change in milliseconds.', color: '#06b6d4' },
  { icon: <Globe size={28} />, title: 'Multi-chain', desc: 'Trade on Ethereum, Polygon & Arbitrum. Lowest fees, highest speed — you choose.', color: '#f59e0b' },
  { icon: <Lock size={28} />, title: 'Dispute Shield', desc: 'Professional arbiters resolve conflicts with full evidence review. Always protected.', color: '#ec4899' },
  { icon: <TrendingUp size={28} />, title: 'Live Analytics', desc: 'Platform-wide and personal dashboards with real-time charts and performance metrics.', color: '#10b981' },
  { icon: <Users size={28} />, title: 'Merchant Hub', desc: 'Build your P2P business with tiered reputation, offer management, and analytics.', color: '#a78bfa' },
]

const testimonials = [
  { name: 'Alex K.', role: 'Premium Merchant', rating: 5, text: 'Processed over $200k in trades. The escrow system is flawless — zero disputes unsettled.', avatar: 'A' },
  { name: 'Priya M.', role: 'Active Trader', rating: 5, text: 'The 3D interface is stunning. But even better — trades settle in minutes, not hours.', avatar: 'P' },
  { name: 'James L.', role: 'Enterprise User', rating: 5, text: 'Our team uses TrustExchange for all cross-border crypto settlements. Unmatched reliability.', avatar: 'J' },
]

interface LandingProps { onEnterApp: () => void }

export default function Landing({ onEnterApp }: LandingProps) {
  const [walletConnecting, setWalletConnecting] = useState(false)

  const handleConnect = () => {
    setWalletConnecting(true)
    setTimeout(() => { setWalletConnecting(false); onEnterApp() }, 1200)
  }

  return (
    <div className="page-content">
      <ThreeScene />

      {/* NAV */}
      <nav>
        <div className="nav-logo">⬡ TrustExchange</div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#stats">Stats</a></li>
          <li><a href="#how">How it Works</a></li>
          <li><a href="#reviews">Reviews</a></li>
        </ul>
        <div className="nav-actions">
          <button className="btn btn-secondary btn-sm" onClick={onEnterApp}>Dashboard</button>
          <button className="btn btn-primary btn-sm" onClick={handleConnect}>
            <Wallet size={14} />
            {walletConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <div className="hero-inner">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="hero-tag">
                <div className="pulse-dot" /> Live on Ethereum · Polygon · Arbitrum
              </div>
              <h1 className="heading-xl">
                Trade Crypto<br />
                <span className="gradient-text">Without Trust.</span><br />
                With Code.
              </h1>
              <p className="hero-desc">
                TrustExchange is the next-gen decentralized P2P platform where blockchain-enforced escrow eliminates counterparty risk. Real-time, multi-chain, unstoppable.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={handleConnect}>
                  <Wallet size={16} />
                  {walletConnecting ? 'Connecting...' : 'Launch App'}
                  <ChevronRight size={14} />
                </button>
                <button className="btn btn-secondary" onClick={onEnterApp}>
                  Explore Dashboard
                </button>
              </div>
            </motion.div>

            {/* 3D Hero Card */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              <div className="hero-3d-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>Live Trade</span>
                  <span className="badge badge-green"><div className="pulse-dot" style={{ width: 6, height: 6 }} /> Active</span>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Selling</div>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 700, color: 'var(--purple-light)' }}>500 USDT</div>
                </div>
                <div className="divider" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Rate</div>
                    <div style={{ fontWeight: 600 }}>$1.0012 / USDT</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Network</div>
                    <div style={{ fontWeight: 600 }}>Polygon</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Payment</div>
                    <div style={{ fontWeight: 600 }}>Bank Wire</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Escrow</div>
                    <div style={{ fontWeight: 600, color: 'var(--green)' }}>Locked ✓</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, padding: '10px', textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>Confirm Fiat Sent</div>
                  <div style={{ flex: 1, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 10, padding: '10px', textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--purple-light)' }}>Release Funds</div>
                </div>
                <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 10, fontSize: 12, color: 'var(--cyan)' }}>
                  🔒 Protected by blockchain escrow · Dispute window: 24h
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="grid-4">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="glass stat-card">
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-value gradient-text">{s.value}</div>
                  <div className={`stat-change ${s.up ? 'up' : 'down'}`}>{s.change} this month</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section" style={{ position: 'relative' }}>
        <div className="orb orb-purple" style={{ width: 500, height: 500, top: -100, left: -200 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div style={{ textAlign: 'center', marginBottom: 60 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-lg"><span className="gradient-text">Why TrustExchange?</span></h2>
            <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: '1.05rem' }}>Every feature built for one purpose: making crypto trading completely trustless.</p>
          </motion.div>
          <div className="grid-3">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="glass glass-hover" style={{ padding: 28 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${f.color}22`, border: `1px solid ${f.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, marginBottom: 18 }}>
                    {f.icon}
                  </div>
                  <h3 className="heading-md" style={{ marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section" style={{ position: 'relative' }}>
        <div className="orb orb-cyan" style={{ width: 400, height: 400, top: -50, right: -150 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div style={{ textAlign: 'center', marginBottom: 60 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="heading-lg">How It <span className="gradient-text">Works</span></h2>
          </motion.div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { step: '01', title: 'Connect Wallet', desc: 'MetaMask or WalletConnect. Your keys, your crypto.' },
              { step: '02', title: 'Choose an Offer', desc: 'Browse verified merchant offers filtered by currency, rate, and payment method.' },
              { step: '03', title: 'Escrow Locks Funds', desc: 'Smart contract holds crypto until both sides confirm payment.' },
              { step: '04', title: 'Fiat Sent → Crypto Released', desc: 'Buyer pays, seller confirms, smart contract releases. Done.' },
            ].map((s, i) => (
              <motion.div key={i} style={{ flex: '1 1 220px', maxWidth: 280 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }}>
                <div className="glass" style={{ padding: 28, textAlign: 'center', height: '100%' }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: '3rem', fontWeight: 900, background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 16 }}>{s.step}</div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, marginBottom: 8, fontSize: '1.1rem' }}>{s.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="section">
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: 60 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="heading-lg">Trusted by <span className="gradient-text-gold">Thousands</span></h2>
          </motion.div>
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }}>
                <div className="glass glass-hover" style={{ padding: 28 }}>
                  <div style={{ display: 'flex', color: '#f59e0b', gap: 2, marginBottom: 16 }}>
                    {Array(t.rating).fill(0).map((_, j) => <Star key={j} size={14} fill="#f59e0b" />)}
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="merchant-avatar">{t.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ padding: '80px 0' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="glass" style={{ padding: 60, textAlign: 'center', background: 'linear-gradient(135deg, rgba(109,40,217,0.2), rgba(6,182,212,0.1))', border: '1px solid rgba(139,92,246,0.3)' }}>
              <h2 className="heading-lg" style={{ marginBottom: 16 }}>Ready to Trade <span className="gradient-text">Fearlessly?</span></h2>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', marginBottom: 36 }}>Join 48,000+ traders who chose code over trust.</p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={handleConnect} style={{ fontSize: '1rem', padding: '14px 32px' }}>
                  <Wallet size={18} /> Get Started Now <ArrowRight size={16} />
                </button>
                <button className="btn btn-secondary" onClick={onEnterApp} style={{ fontSize: '1rem', padding: '14px 32px' }}>
                  View Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
        <div className="container">
          <div className="nav-logo" style={{ marginBottom: 12 }}>⬡ TrustExchange</div>
          <p>© 2026 TrustExchange Protocol. Decentralized. Trustless. Unstoppable.</p>
        </div>
      </footer>
    </div>
  )
}
