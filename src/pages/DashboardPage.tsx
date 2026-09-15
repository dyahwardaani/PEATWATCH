import { useState } from 'react'
import { Thermometer, Droplets, Wind, Leaf, Activity, TrendingUp, TrendingDown } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { chart24h, chart7d, recentActivity, currentSensor } from '../data/mockData'
import type { Page, RiskLevel } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'

const riskConfig: Record<RiskLevel, { bg: string; text: string; border: string; dot: string }> = {
  Normal:  { bg: '#F0F8F3', text: '#2FA66A', border: '#B9DEC7', dot: '#2FA66A' },
  Waspada: { bg: '#FFFBEB', text: '#EAB308', border: '#FCD34D', dot: '#EAB308' },
  Siaga:   { bg: '#FFF7ED', text: '#F59E0B', border: '#FDBA74', dot: '#F59E0B' },
  Bahaya:  { bg: '#FEF2F2', text: '#DC2626', border: '#FCA5A5', dot: '#DC2626' },
}

const sensorCards = [
  { label: 'Suhu', value: currentSensor.suhu, unit: '°C', status: 'Normal' as RiskLevel, icon: Thermometer, color: '#EF4444', trend: 'up' },
  { label: 'Kelembaban Udara', value: currentSensor.kelUdara, unit: '%', status: 'Normal' as RiskLevel, icon: Droplets, color: '#3B82F6', trend: 'stable' },
  { label: 'Kelembaban Tanah', value: currentSensor.kelTanah, unit: '%', status: 'Waspada' as RiskLevel, icon: Leaf, color: '#8B5CF6', trend: 'down' },
  { label: 'Asap/Gas', value: currentSensor.asap, unit: 'ppm', status: 'Normal' as RiskLevel, icon: Wind, color: '#6B7280', trend: 'stable' },
]

const chartKeys = [
  { key: 'suhu', label: 'Suhu (°C)', color: '#EF4444' },
  { key: 'kelUdara', label: 'Kel. Udara (%)', color: '#3B82F6' },
  { key: 'kelTanah', label: 'Kel. Tanah (%)', color: '#8B5CF6' },
  { key: 'asap', label: 'Asap (ppm)', color: '#6B7280' },
]

interface Props { onNavigate: (p: Page) => void }

export default function DashboardPage({ onNavigate }: Props) {
  const [timeRange, setTimeRange] = useState<'24h' | '7d'>('24h')
  const [selectedKey, setSelectedKey] = useState('suhu')
  const chartData = timeRange === '24h' ? chart24h : chart7d
  const risk = currentSensor.riskLevel
  const rc = riskConfig[risk]
  const ck = chartKeys.find(k => k.key === selectedKey)!

  return (
    <div>
      {/* Page title */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Monitoring kondisi lahan gambut secara real-time</p>
        </div>
      </div>

      {/* Risk Status Card */}
      <div className="card mb-5 overflow-hidden relative"
        style={{
          background: risk === 'Normal' ? '#F0F8F3' : rc.bg,
          border: `1px solid ${risk === 'Normal' ? '#BBE7C8' : rc.border}`,
          minHeight: 174,
          boxShadow: '0 2px 8px rgba(22, 163, 74, .06)',
        }}>
        <div className="absolute inset-0 scale-[1.02] opacity-60 blur-[1.5px]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=85')",
            backgroundPosition: 'center 58%',
            backgroundSize: 'cover',
          }} />
        <div className="absolute inset-0" style={{ background: 'rgba(240, 248, 243, .78)' }} />
        <div className="relative z-10 flex min-h-[132px] flex-col items-center justify-center text-center">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#2FA66A' }}>
              Status Risiko Karhutla
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: '#DDF3E7' }}>
              <Leaf size={27} strokeWidth={2.25} style={{ color: rc.dot }} />
            </div>
            <h2 className="text-5xl font-extrabold tracking-wide" style={{ color: rc.text }}>{risk.toUpperCase()}</h2>
          </div>
          <p className="text-sm font-medium mt-2" style={{ color: '#2FA66A' }}>
            {risk === 'Normal' ? 'Kondisi lahan dalam batas aman' :
             risk === 'Waspada' ? 'Perhatian diperlukan' :
             risk === 'Siaga' ? 'Tingkatkan kewaspadaan' : 'Segera ambil tindakan!'}
          </p>
        </div>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {sensorCards.map(({ label, value, unit, status, icon: Icon, color, trend }) => (
          <div key={label} className="card">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: color + '18' }}>
                <Icon size={18} style={{ color }} />
              </div>
              <StatusBadge level={status} />
            </div>
            <p className="text-[11px] font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
            <div className="flex items-end gap-1.5">
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-sm pb-0.5" style={{ color: 'var(--text-muted)' }}>{unit}</span>
              {trend === 'up' && <TrendingUp size={14} className="pb-1 text-red-400" />}
              {trend === 'down' && <TrendingDown size={14} className="pb-1 text-blue-400" />}
              {trend === 'stable' && <Activity size={14} className="pb-1" style={{ color: 'var(--text-muted)' }} />}
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Grafik Sensor Real-Time</h3>
            <div className="flex items-center gap-2">
              {/* Time filter */}
              <div className="flex rounded-lg overflow-hidden border border-[var(--border)] text-xs">
                {(['24h', '7d'] as const).map(t => (
                  <button key={t} onClick={() => setTimeRange(t)}
                    className="px-3 py-1.5 font-medium transition-colors"
                    style={{
                      background: timeRange === t ? 'var(--brand)' : 'transparent',
                      color: timeRange === t ? '#fff' : 'var(--text-muted)',
                    }}>
                    {t === '24h' ? '24 Jam' : '7 Hari'}
                  </button>
                ))}
              </div>
              {/* Sensor selector */}
              <select value={selectedKey} onChange={e => setSelectedKey(e.target.value)}
                className="text-xs border border-[var(--border)] rounded-lg px-2 py-1.5 bg-white outline-none cursor-pointer">
                {chartKeys.map(k => <option key={k.key} value={k.key}>{k.label}</option>)}
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={ck.color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={ck.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#D1D5DB" />
              <YAxis tick={{ fontSize: 11 }} stroke="#D1D5DB" />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} />
              <Area type="monotone" dataKey={selectedKey} stroke={ck.color} strokeWidth={2}
                fill="url(#grad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Aktivitas Terbaru</h3>
            <button className="text-xs font-medium" style={{ color: 'var(--brand)' }}>Lihat Semua</button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium leading-snug">{a.text}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="mt-4 pt-4 border-t border-[var(--border)] grid grid-cols-2 gap-2">
            {[
              { label: 'Monitoring', page: 'monitoring' as Page },
              { label: 'Early Warning', page: 'early-warning' as Page },
              { label: 'Histori Data', page: 'history' as Page },
              { label: 'Peta Lokasi', page: 'map' as Page },
            ].map(({ label, page }) => (
              <button key={page} onClick={() => onNavigate(page)}
                className="text-xs py-1.5 px-2 rounded-lg border border-[var(--border)] font-medium hover:bg-[var(--brand-pale)] transition-colors"
                style={{ color: 'var(--brand)' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
