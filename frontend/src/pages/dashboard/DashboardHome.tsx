import { ArrowUpRight, ArrowDownRight, Clock, TrendingUp, ShieldCheck, Zap } from 'lucide-react'

const stats = [
  { label: 'Total Volume', value: '$84,200', change: '+12.4%', up: true, icon: <TrendingUp size={20} />, color: '#8b5cf6' },
  { label: 'Active Trades', value: '3', change: '+1 today', up: true, icon: <Zap size={20} />, color: '#06b6d4' },
  { label: 'Success Rate', value: '99.1%', change: '+0.3%', up: true, icon: <ShieldCheck size={20} />, color: '#10b981' },
  { label: 'Avg. Time', value: '4.8 min', change: '-0.6 min', up: true, icon: <Clock size={20} />, color: '#f59e0b' },
]

const recentTrades = [
  { id: 'TX-001', type: 'Sell', amount: '500 USDT', fiat: '$501.2', status: 'completed', method: 'Bank Wire', time: '2h ago' },
  { id: 'TX-002', type: 'Buy', amount: '200 USDT', fiat: '$200.5', status: 'escrowed', method: 'PayPal', time: '4h ago' },
  { id: 'TX-003', type: 'Sell', amount: '1000 USDT', fiat: '$1003', status: 'fiat_sent', method: 'Revolut', time: '1d ago' },
  { id: 'TX-004', type: 'Buy', amount: '750 USDT', fiat: '$752', status: 'completed', method: 'SEPA', time: '2d ago' },
]

const statusColors: Record<string, string> = {
  completed: 'badge-green',
  escrowed: 'badge-purple',
  fiat_sent: 'badge-gold',
  disputed: 'badge-red',
  initiated: 'badge-cyan',
}

interface Props { onNavigate: (page: string) => void }

export default function DashboardHome({ onNavigate }: Props) {
  return (
    <div>
      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={i} className="glass" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}22`, border: `1px solid ${s.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{s.icon}</div>
              <span style={{ fontSize: 12, color: s.up ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>
                {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {s.change}
              </span>
            </div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid-3" style={{ marginBottom: 32 }}>
        <div className="glass glass-hover" style={{ padding: 24, cursor: 'pointer', background: 'linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.1))' }} onClick={() => onNavigate('trades')}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>⚡</div>
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, marginBottom: 4 }}>Start a Trade</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Browse offers and initiate a new trade</div>
        </div>
        <div className="glass glass-hover" style={{ padding: 24, cursor: 'pointer' }} onClick={() => onNavigate('disputes')}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>🛡️</div>
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, marginBottom: 4 }}>Dispute Center</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Manage and track open disputes</div>
        </div>
        <div className="glass glass-hover" style={{ padding: 24, cursor: 'pointer' }} onClick={() => onNavigate('merchants')}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>🏪</div>
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, marginBottom: 4 }}>Merchant Hub</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Create offers and manage your store</div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="glass" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 className="heading-md">Recent Trades</h3>
          <button className="btn btn-secondary btn-sm" onClick={() => onNavigate('trades')}>View All</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th><th>Type</th><th>Amount</th><th>Fiat Value</th><th>Payment</th><th>Status</th><th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((t, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--purple-light)' }}>{t.id}</td>
                  <td><span style={{ color: t.type === 'Buy' ? 'var(--green)' : 'var(--cyan)', fontWeight: 600 }}>{t.type}</span></td>
                  <td style={{ fontWeight: 600 }}>{t.amount}</td>
                  <td style={{ color: 'var(--muted)' }}>{t.fiat}</td>
                  <td style={{ fontSize: 13 }}>{t.method}</td>
                  <td><span className={`badge ${statusColors[t.status]}`}>{t.status.replace('_', ' ')}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
