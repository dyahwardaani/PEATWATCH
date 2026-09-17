import { useState } from 'react'
import { Thermometer, Droplets, Wind, Leaf, RefreshCw } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { chart24h, chart7d, currentSensor } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'
import type { RiskLevel } from '../data/mockData'

const sensors = [
  { id: 'suhu', label: 'Suhu Udara', sensor: 'DHT22', value: currentSensor.suhu, unit: '°C', status: 'Normal' as RiskLevel, icon: Thermometer, color: '#EF4444' },
  { id: 'kelUdara', label: 'Kelembaban Udara', sensor: 'DHT22', value: currentSensor.kelUdara, unit: '%', status: 'Normal' as RiskLevel, icon: Droplets, color: '#3B82F6' },
  { id: 'kelTanah', label: 'Kelembaban Tanah', sensor: 'Capacitive', value: currentSensor.kelTanah, unit: '%', status: 'Waspada' as RiskLevel, icon: Leaf, color: '#8B5CF6' },
  { id: 'asap', label: 'Gas / Asap', sensor: 'MQ-2 / MQ-135', value: currentSensor.asap, unit: 'ppm', status: 'Normal' as RiskLevel, icon: Wind, color: '#6B7280' },
]

const chartKeys = [
  { key: 'suhu', label: 'Suhu (°C)', color: '#EF4444' },
  { key: 'kelUdara', label: 'Kel. Udara (%)', color: '#3B82F6' },
  { key: 'kelTanah', label: 'Kel. Tanah (%)', color: '#8B5CF6' },
  { key: 'asap', label: 'Asap (ppm)', color: '#6B7280' },
]

const recentReadings = [
  { waktu: '14:20', suhu: 31.5, kelUdara: 68, kelTanah: 42, asap: 12 },
  { waktu: '14:10', suhu: 31.2, kelUdara: 67, kelTanah: 43, asap: 11 },
  { waktu: '14:00', suhu: 31.8, kelUdara: 69, kelTanah: 45, asap: 10 },
  { waktu: '13:50', suhu: 35.2, kelUdara: 55, kelTanah: 28, asap: 45 },
  { waktu: '13:40', suhu: 37.6, kelUdara: 48, kelTanah: 22, asap: 80 },
]

export default function MonitoringPage() {
  const [tab, setTab] = useState<'24h' | '7d' | '30d'>('24h')
  const [key, setKey] = useState('suhu')
  const chartData = tab === '24h' ? chart24h : chart7d
  const ck = chartKeys.find(k => k.key === key)!

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold">Monitoring</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Data sensor real-time dan grafik pemantauan</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-[var(--border)]"
          style={{ color: 'var(--brand)' }}>
          <RefreshCw size={13} />
          Terakhir update: {currentSensor.lastUpdate}
        </div>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {sensors.map(({ id, label, sensor, value, unit, status, icon: Icon, color }) => (
          <div key={id} className="card">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + '18' }}>
                <Icon size={20} style={{ color }} />
              </div>
              <StatusBadge level={status} />
            </div>
            <p className="text-[11px] font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
            <p className="text-[10px] mb-2" style={{ color: 'var(--text-muted)' }}>{sensor}</p>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-bold">{value}</span>
              <span className="text-sm pb-0.5" style={{ color: 'var(--text-muted)' }}>{unit}</span>
            </div>
            <p className="text-[10px] mt-2" style={{ color: 'var(--text-muted)' }}>Update: {currentSensor.lastUpdate}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Grafik Sensor</h3>
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg overflow-hidden border border-[var(--border)] text-xs">
              {(['24h', '7d', '30d'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className="px-3 py-1.5 font-medium transition-colors"
                  style={{
                    background: tab === t ? 'var(--brand)' : 'transparent',
                    color: tab === t ? '#fff' : 'var(--text-muted)',
                  }}>
                  {t === '24h' ? '24 Jam' : t === '7d' ? '7 Hari' : '30 Hari'}
                </button>
              ))}
            </div>
            <select value={key} onChange={e => setKey(e.target.value)}
              className="text-xs border border-[var(--border)] rounded-lg px-2 py-1.5 bg-white outline-none cursor-pointer">
              {chartKeys.map(k => <option key={k.key} value={k.key}>{k.label}</option>)}
            </select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="mgrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={ck.color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={ck.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#D1D5DB" />
            <YAxis tick={{ fontSize: 11 }} stroke="#D1D5DB" />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} />
            <Area type="monotone" dataKey={key} stroke={ck.color} strokeWidth={2} fill="url(#mgrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Data Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Data Sensor Terbaru</h3>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Lihat Semua</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Waktu', 'Suhu (°C)', 'Kel. Udara (%)', 'Kel. Tanah (%)', 'Asap (ppm)'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentReadings.map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)]">
                  <td className="py-2.5 px-3 text-xs font-medium">{row.waktu}</td>
                  <td className="py-2.5 px-3 text-xs">{row.suhu}</td>
                  <td className="py-2.5 px-3 text-xs">{row.kelUdara}</td>
                  <td className="py-2.5 px-3 text-xs">{row.kelTanah}</td>
                  <td className="py-2.5 px-3 text-xs">{row.asap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
