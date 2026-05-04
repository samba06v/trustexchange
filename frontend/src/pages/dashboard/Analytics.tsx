import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const volumeData = [
  { month: 'Nov', volume: 1.2 }, { month: 'Dec', volume: 1.8 }, { month: 'Jan', volume: 2.1 },
  { month: 'Feb', volume: 1.9 }, { month: 'Mar', volume: 2.6 }, { month: 'Apr', volume: 2.4 },
]

const dailyData = [
  { day: 'Mon', trades: 42 }, { day: 'Tue', trades: 67 }, { day: 'Wed', trades: 53 },
  { day: 'Thu', trades: 89 }, { day: 'Fri', trades: 112 }, { day: 'Sat', trades: 78 }, { day: 'Sun', trades: 55 },
]

const chainData = [
  { name: 'Polygon', value: 52, color: '#8b5cf6' },
  { name: 'Ethereum', value: 31, color: '#06b6d4' },
  { name: 'Arbitrum', value: 17, color: '#ec4899' },
]

const tooltipStyle = { background: '#0d0d2b', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 10, color: '#f1f5f9', fontSize: 13 }

export default function Analytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top stats */}
      <div className="grid-4">
        {[
          { label: 'Total Volume (6mo)', value: '$12.0M', color: 'var(--purple)' },
          { label: 'Total Trades', value: '496', color: 'var(--cyan)' },
          { label: 'Success Rate', value: '99.1%', color: 'var(--green)' },
          { label: 'Dispute Rate', value: '0.9%', color: 'var(--gold)' },
        ].map((s, i) => (
          <div key={i} className="glass" style={{ padding: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Volume chart */}
      <div className="glass" style={{ padding: 28 }}>
        <h3 className="heading-md" style={{ marginBottom: 20 }}>Monthly Volume (M USDT)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={volumeData}>
            <defs>
              <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.1)" />
            <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="volume" stroke="#8b5cf6" fill="url(#volGrad)" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid-2">
        {/* Daily trades */}
        <div className="glass" style={{ padding: 28 }}>
          <h3 className="heading-md" style={{ marginBottom: 20 }}>Daily Trades (This Week)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(6,182,212,0.1)" />
              <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="trades" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chain distribution */}
        <div className="glass" style={{ padding: 28 }}>
          <h3 className="heading-md" style={{ marginBottom: 20 }}>Chain Distribution</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={chainData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={2} stroke="#050510">
                  {chainData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {chainData.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: c.color }} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</span>
                  <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: c.color }}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
