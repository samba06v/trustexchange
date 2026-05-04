import { useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, ArrowLeftRight, ShieldAlert, BarChart3, Store, Settings, LogOut, Wallet, Bell } from 'lucide-react'
import DashboardHome from './dashboard/DashboardHome'
import Trades from './dashboard/Trades'
import Disputes from './dashboard/Disputes'
import Analytics from './dashboard/Analytics'
import Merchants from './dashboard/Merchants'

const navItems = [
  { id: 'home', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'trades', label: 'Trades', icon: <ArrowLeftRight size={18} /> },
  { id: 'disputes', label: 'Disputes', icon: <ShieldAlert size={18} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  { id: 'merchants', label: 'Merchants', icon: <Store size={18} /> },
]

interface DashboardProps { onLogout: () => void }

export default function Dashboard({ onLogout }: DashboardProps) {
  const [active, setActive] = useState('home')
  const wallet = '0x742d...f4e2'

  const pages: Record<string, JSX.Element> = {
    home: <DashboardHome onNavigate={setActive} />,
    trades: <Trades />,
    disputes: <Disputes />,
    analytics: <Analytics />,
    merchants: <Merchants />,
  }

  return (
    <div className="dash-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">⬡ TrustExchange</div>
        <ul className="sidebar-nav">
          {navItems.map(item => (
            <li key={item.id}>
              <button className={active === item.id ? 'active' : ''} onClick={() => setActive(item.id)}>
                {item.icon} {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div style={{ borderTop: '1px solid var(--border)', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div className="merchant-avatar" style={{ width: 32, height: 32, fontSize: 13 }}>W</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{wallet}</div>
              <div style={{ fontSize: 11, color: 'var(--green)' }}>● Connected</div>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={onLogout}>
            <LogOut size={14} /> Disconnect
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="dash-main">
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '1.6rem', fontWeight: 700 }}>
              {navItems.find(n => n.id === active)?.label || 'Dashboard'}
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>Welcome back, trader</p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="btn btn-secondary btn-sm"><Bell size={14} /></button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '8px 14px', borderRadius: 10 }}>
              <Wallet size={14} color="var(--green)" />
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--green)' }}>{wallet}</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {pages[active] || <DashboardHome onNavigate={setActive} />}
        </motion.div>
      </main>
    </div>
  )
}
