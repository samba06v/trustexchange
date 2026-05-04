import { useState } from 'react'
import { Plus, Star, BadgeCheck, X } from 'lucide-react'
import { showToast } from '../../components/Toast'

const merchants = [
  { addr: '0xAlexP2P', name: 'AlexP2P', rating: 4.9, trades: 1240, volume: '$1.2M', tier: 'premium', verified: true, methods: ['Bank Wire', 'SEPA'], offers: 3 },
  { addr: '0xCrypto', name: 'CryptoQueen', rating: 4.7, trades: 890, volume: '$640K', tier: 'basic', verified: true, methods: ['PayPal', 'Revolut'], offers: 2 },
  { addr: '0xBlock', name: 'BlockTrade', rating: 5.0, trades: 3100, volume: '$8.4M', tier: 'enterprise', verified: true, methods: ['SWIFT', 'Bank Wire'], offers: 5 },
  { addr: '0xSafe', name: 'SafeHarbor', rating: 4.9, trades: 2020, volume: '$3.1M', tier: 'premium', verified: true, methods: ['SEPA', 'Revolut'], offers: 4 },
]

const tierColors: Record<string, string> = { basic: 'badge-cyan', premium: 'badge-purple', enterprise: 'badge-gold' }

export default function Merchants() {
  const [showReg, setShowReg] = useState(false)
  const [showOffer, setShowOffer] = useState(false)
  const [form, setForm] = useState({ name: '', walletAddress: '' })
  const [offer, setOffer] = useState({ type: 'sell', currency: 'USDT', min: '', max: '', rate: '', method: '' })

  return (
    <div>
      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, justifyContent: 'flex-end' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => setShowReg(true)}><Plus size={14} /> Register as Merchant</button>
        <button className="btn btn-primary btn-sm" onClick={() => setShowOffer(true)}><Plus size={14} /> Create Offer</button>
      </div>

      {/* Merchant grid */}
      <div className="grid-2">
        {merchants.map((m, i) => (
          <div key={i} className="glass glass-hover" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="merchant-avatar" style={{ width: 48, height: 48, fontSize: 18 }}>{m.name[0]}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{m.name}</span>
                    {m.verified && <BadgeCheck size={15} color="var(--green)" />}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--muted)' }}>{m.addr}</div>
                </div>
              </div>
              <span className={`badge ${tierColors[m.tier]}`}>{m.tier}</span>
            </div>
            <div className="grid-2" style={{ gap: 12, marginBottom: 16 }}>
              <div className="glass" style={{ padding: '10px 14px', border: 'none' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Rating</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700 }}>
                  <Star size={12} fill="#f59e0b" color="#f59e0b" /> {m.rating}
                </div>
              </div>
              <div className="glass" style={{ padding: '10px 14px', border: 'none' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Trades</div>
                <div style={{ fontWeight: 700 }}>{m.trades.toLocaleString()}</div>
              </div>
              <div className="glass" style={{ padding: '10px 14px', border: 'none' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Volume</div>
                <div style={{ fontWeight: 700, color: 'var(--green)' }}>{m.volume}</div>
              </div>
              <div className="glass" style={{ padding: '10px 14px', border: 'none' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Active Offers</div>
                <div style={{ fontWeight: 700, color: 'var(--cyan)' }}>{m.offers}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {m.methods.map(m2 => <span key={m2} className="badge badge-purple" style={{ fontSize: 11 }}>{m2}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* Register Modal */}
      {showReg && (
        <div className="modal-overlay" onClick={() => setShowReg(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Merchant Registration</h3>
              <button className="modal-close" onClick={() => setShowReg(false)}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group"><label className="form-label">Display Name</label><input className="form-input" placeholder="YourP2PName" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">Wallet Address</label><input className="form-input" placeholder="0x..." value={form.walletAddress} onChange={e => setForm({ ...form, walletAddress: e.target.value })} /></div>
              <div style={{ padding: '12px 16px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 10, fontSize: 13, color: 'var(--purple-light)' }}>
                Starting tier: Basic. Upgrade to Premium after 100 successful trades.
              </div>
              <button className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => { showToast('Merchant registered!', 'success'); setShowReg(false) }}>Register Merchant</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Offer Modal */}
      {showOffer && (
        <div className="modal-overlay" onClick={() => setShowOffer(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Offer</h3>
              <button className="modal-close" onClick={() => setShowOffer(false)}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group"><label className="form-label">Offer Type</label>
                <select className="form-select" value={offer.type} onChange={e => setOffer({ ...offer, type: e.target.value })}>
                  <option value="sell">Sell Crypto (I want fiat)</option>
                  <option value="buy">Buy Crypto (I have fiat)</option>
                </select>
              </div>
              <div className="grid-2" style={{ gap: 12 }}>
                <div className="form-group"><label className="form-label">Min Amount ($)</label><input className="form-input" placeholder="50" type="number" value={offer.min} onChange={e => setOffer({ ...offer, min: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Max Amount ($)</label><input className="form-input" placeholder="5000" type="number" value={offer.max} onChange={e => setOffer({ ...offer, max: e.target.value })} /></div>
              </div>
              <div className="form-group"><label className="form-label">Rate (USD per USDT)</label><input className="form-input" placeholder="1.0012" type="number" value={offer.rate} onChange={e => setOffer({ ...offer, rate: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">Payment Method</label><input className="form-input" placeholder="Bank Wire, PayPal..." value={offer.method} onChange={e => setOffer({ ...offer, method: e.target.value })} /></div>
              <button className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => { showToast('Offer created!', 'success'); setShowOffer(false) }}>Publish Offer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
