import { useState } from 'react'
import { Search, Filter, ArrowUpDown, Star } from 'lucide-react'
import { showToast } from '../../components/Toast'

const offers = [
  { id: 1, merchant: 'AlexP2P', avatar: 'A', rating: 4.9, trades: 1240, verified: true, type: 'sell', currency: 'USDT', rate: 1.0012, min: 50, max: 2000, methods: ['Bank Wire', 'SEPA'], network: 'Polygon', tier: 'premium' },
  { id: 2, merchant: 'CryptoQueen', avatar: 'C', rating: 4.7, trades: 890, verified: true, type: 'sell', currency: 'USDT', rate: 1.0008, min: 100, max: 5000, methods: ['PayPal', 'Revolut'], network: 'Ethereum', tier: 'basic' },
  { id: 3, merchant: 'FastBuyer', avatar: 'F', rating: 4.8, trades: 620, verified: false, type: 'buy', currency: 'USDT', rate: 0.9990, min: 20, max: 1000, methods: ['Cash App'], network: 'Arbitrum', tier: 'basic' },
  { id: 4, merchant: 'BlockTrade', avatar: 'B', rating: 5.0, trades: 3100, verified: true, type: 'sell', currency: 'USDT', rate: 1.0015, min: 500, max: 50000, methods: ['SWIFT', 'Bank Wire'], network: 'Polygon', tier: 'enterprise' },
  { id: 5, merchant: 'MoonSwap', avatar: 'M', rating: 4.6, trades: 445, verified: true, type: 'buy', currency: 'USDT', rate: 0.9985, min: 10, max: 500, methods: ['Venmo', 'Zelle'], network: 'Ethereum', tier: 'basic' },
  { id: 6, merchant: 'SafeHarbor', avatar: 'S', rating: 4.9, trades: 2020, verified: true, type: 'sell', currency: 'USDT', rate: 1.0010, min: 200, max: 10000, methods: ['SEPA', 'Revolut'], network: 'Arbitrum', tier: 'premium' },
]

const tradeList = [
  { id: 'TX-001', counterpart: '0xAlice', type: 'Sell', amount: 500, status: 'completed', time: '2h ago' },
  { id: 'TX-002', counterpart: '0xBob', type: 'Buy', amount: 200, status: 'escrowed', time: '4h ago' },
  { id: 'TX-003', counterpart: '0xCharlie', type: 'Sell', amount: 1000, status: 'fiat_sent', time: '1d ago' },
]

const statusColors: Record<string, string> = {
  completed: 'badge-green', escrowed: 'badge-purple', fiat_sent: 'badge-gold', disputed: 'badge-red', initiated: 'badge-cyan',
}
const tierColors: Record<string, string> = { basic: 'badge-cyan', premium: 'badge-purple', enterprise: 'badge-gold' }

export default function Trades() {
  const [tab, setTab] = useState<'browse' | 'my'>('browse')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell'>('all')

  const filtered = offers.filter(o => {
    if (filter !== 'all' && o.type !== filter) return false
    if (search && !o.merchant.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const startTrade = (offer: typeof offers[0]) => {
    showToast(`Trade initiated with ${offer.merchant}!`, 'success')
  }

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'var(--surface)', borderRadius: 12, padding: 4, width: 'fit-content', border: '1px solid var(--border)' }}>
        {(['browse', 'my'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className="btn btn-sm" style={{ background: tab === t ? 'var(--purple)' : 'transparent', color: tab === t ? 'white' : 'var(--muted)', boxShadow: 'none' }}>
            {t === 'browse' ? 'Browse Offers' : 'My Trades'}
          </button>
        ))}
      </div>

      {tab === 'browse' && (
        <>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1 1 240px' }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <input className="form-input" style={{ paddingLeft: 36 }} placeholder="Search merchants..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {(['all', 'buy', 'sell'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className="btn btn-sm" style={{ background: filter === f ? 'rgba(139,92,246,0.2)' : 'transparent', color: filter === f ? 'var(--purple-light)' : 'var(--muted)', border: '1px solid var(--border)', textTransform: 'capitalize', boxShadow: 'none' }}>
                {f === 'all' ? 'All Offers' : f === 'buy' ? '🟢 Buy' : '🔵 Sell'}
              </button>
            ))}
          </div>

          <div className="grid-2">
            {filtered.map(o => (
              <div key={o.id} className="glass glass-hover offer-card">
                <div className="offer-card-header">
                  <div className="offer-merchant">
                    <div className="merchant-avatar">{o.avatar}</div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span className="merchant-name">{o.merchant}</span>
                        {o.verified && <span style={{ fontSize: 11, color: 'var(--green)' }}>✓</span>}
                        <span className={`badge ${tierColors[o.tier]} btn-sm`} style={{ padding: '2px 6px', fontSize: 10 }}>{o.tier}</span>
                      </div>
                      <div className="merchant-meta">
                        <Star size={10} fill="#f59e0b" color="#f59e0b" style={{ display: 'inline', marginRight: 2 }} />
                        {o.rating} · {o.trades.toLocaleString()} trades
                      </div>
                    </div>
                  </div>
                  <span className={`badge ${o.type === 'sell' ? 'badge-cyan' : 'badge-green'}`} style={{ textTransform: 'capitalize' }}>{o.type === 'sell' ? 'Selling' : 'Buying'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>Rate</div>
                    <div className="offer-rate gradient-text">${o.rate.toFixed(4)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="offer-limits">{o.currency} · {o.network}</div>
                    <div className="offer-limits">${o.min} – ${o.max}</div>
                  </div>
                </div>
                <div className="offer-methods">
                  {o.methods.map(m => <span key={m} className="badge badge-purple btn-sm" style={{ fontSize: 11 }}>{m}</span>)}
                </div>
                <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} onClick={() => startTrade(o)}>
                  {o.type === 'sell' ? 'Buy from Merchant' : 'Sell to Merchant'}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'my' && (
        <div className="glass" style={{ padding: 24 }}>
          <table className="table">
            <thead><tr><th>Trade ID</th><th>Counterpart</th><th>Type</th><th>Amount (USDT)</th><th>Status</th><th>Time</th><th>Action</th></tr></thead>
            <tbody>
              {tradeList.map((t, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--purple-light)', fontSize: 12 }}>{t.id}</td>
                  <td style={{ fontSize: 13 }}>{t.counterpart}</td>
                  <td><span style={{ color: t.type === 'Buy' ? 'var(--green)' : 'var(--cyan)', fontWeight: 600 }}>{t.type}</span></td>
                  <td style={{ fontWeight: 600 }}>{t.amount}</td>
                  <td><span className={`badge ${statusColors[t.status]}`}>{t.status.replace('_', ' ')}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--muted)' }}>{t.time}</td>
                  <td>
                    {t.status === 'escrowed' && <button className="btn btn-sm" style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--green)', border: '1px solid rgba(16,185,129,0.3)', boxShadow: 'none' }} onClick={() => showToast('Fiat confirmed!', 'success')}>Confirm Fiat</button>}
                    {t.status === 'fiat_sent' && <button className="btn btn-sm btn-primary" onClick={() => showToast('Funds released!', 'success')}>Release Funds</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
