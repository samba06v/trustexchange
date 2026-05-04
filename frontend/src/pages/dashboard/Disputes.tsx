import { useState } from 'react'
import { AlertTriangle, FileText, CheckCircle, Clock, X } from 'lucide-react'
import { showToast } from '../../components/Toast'

const disputes = [
  { id: 'D-001', tradeId: 'TX-010', initiator: '0xAlice', respondent: '0xBob', reason: 'Payment not received after 24h', status: 'open', evidence: 2, created: '3h ago' },
  { id: 'D-002', tradeId: 'TX-008', initiator: '0xCharlie', respondent: '0xDave', reason: 'Wrong amount transferred', status: 'evidence_submission', evidence: 5, created: '1d ago' },
  { id: 'D-003', tradeId: 'TX-005', initiator: '0xEve', respondent: '0xFrank', reason: 'Chargeback initiated', status: 'resolved', evidence: 4, created: '3d ago' },
]

const statusIcons: Record<string, JSX.Element> = {
  open: <AlertTriangle size={14} />,
  evidence_submission: <FileText size={14} />,
  resolved: <CheckCircle size={14} />,
  pending: <Clock size={14} />,
}
const statusClass: Record<string, string> = {
  open: 'badge-red', evidence_submission: 'badge-gold', resolved: 'badge-green', pending: 'badge-purple',
}

export default function Disputes() {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ tradeId: '', reason: '', evidence: '' })

  const submit = () => {
    if (!form.tradeId || !form.reason) { showToast('Fill in all fields', 'error'); return }
    showToast('Dispute submitted successfully', 'success')
    setShowModal(false)
    setForm({ tradeId: '', reason: '', evidence: '' })
  }

  return (
    <div>
      {/* Header actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div className="glass" style={{ padding: '10px 20px', display: 'flex', gap: 24 }}>
          <div><span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Space Grotesk', color: 'var(--red)' }}>1</span><div style={{ fontSize: 12, color: 'var(--muted)' }}>Open</div></div>
          <div style={{ width: 1, background: 'var(--border)' }} />
          <div><span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Space Grotesk', color: 'var(--gold)' }}>1</span><div style={{ fontSize: 12, color: 'var(--muted)' }}>In Review</div></div>
          <div style={{ width: 1, background: 'var(--border)' }} />
          <div><span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Space Grotesk', color: 'var(--green)' }}>1</span><div style={{ fontSize: 12, color: 'var(--muted)' }}>Resolved</div></div>
        </div>
        <button className="btn btn-danger btn-sm" onClick={() => setShowModal(true)}>
          <AlertTriangle size={14} /> Open Dispute
        </button>
      </div>

      {/* Disputes list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {disputes.map((d, i) => (
          <div key={i} className="glass glass-hover" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--purple-light)' }}>{d.id}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 12 }}>→ Trade {d.tradeId}</span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 600 }}>{d.reason}</p>
              </div>
              <span className={`badge ${statusClass[d.status]}`}>
                {statusIcons[d.status]}
                {d.status.replace('_', ' ')}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'var(--muted)', marginBottom: 16, flexWrap: 'wrap' }}>
              <span>Initiator: <b style={{ color: 'var(--text)' }}>{d.initiator}</b></span>
              <span>Respondent: <b style={{ color: 'var(--text)' }}>{d.respondent}</b></span>
              <span>Evidence files: <b style={{ color: 'var(--cyan)' }}>{d.evidence}</b></span>
              <span>Opened: {d.created}</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {d.status !== 'resolved' && (
                <button className="btn btn-secondary btn-sm" onClick={() => showToast('Evidence upload opened', 'info')}>
                  <FileText size={13} /> Submit Evidence
                </button>
              )}
              {d.status === 'resolved' && (
                <div style={{ fontSize: 13, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle size={14} /> Arbiter ruled in favor of {d.initiator}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Open a Dispute</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Trade ID</label>
                <input className="form-input" placeholder="e.g. TX-010" value={form.tradeId} onChange={e => setForm({ ...form, tradeId: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Reason for Dispute</label>
                <textarea className="form-input" rows={4} placeholder="Describe the issue in detail..." value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} style={{ resize: 'vertical' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Evidence (URL or description)</label>
                <input className="form-input" placeholder="Screenshot link, transaction hash..." value={form.evidence} onChange={e => setForm({ ...form, evidence: e.target.value })} />
              </div>
              <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, fontSize: 13, color: '#fca5a5' }}>
                ⚠️ Frivolous disputes incur a 0.5% penalty fee. Only open disputes for valid reasons.
              </div>
              <button className="btn btn-danger" style={{ justifyContent: 'center' }} onClick={submit}>Submit Dispute</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
