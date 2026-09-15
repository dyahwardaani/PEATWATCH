import { useState } from 'react'
import { AlertTriangle, CheckCircle, Send } from 'lucide-react'
import { warningHistory } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'
import type { RiskLevel } from '../data/mockData'

const conditions = [
  { label: 'Suhu', value: '37.8', unit: '°C', risk: 'Tinggi', color: '#DC2626' },
  { label: 'Kelembaban Udara', value: '45', unit: '%', risk: 'Rendah', color: '#EAB308' },
  { label: 'Kelembaban Tanah', value: '22', unit: '%', risk: 'Sangat Rendah', color: '#DC2626' },
  { label: 'Gas/Asap', value: '85', unit: 'ppm', risk: 'Tinggi', color: '#DC2626' },
]

const actions = [
  'Lakukan pemeriksaan lapangan',
  'Pantau perkembangan kondisi',
  'Siapkan langkah mitigasi',
  'Koordinasi dengan pihak terkait',
]

const riskConfig: Record<RiskLevel, { bg: string; text: string; icon: string; label: string }> = {
  Normal:  { bg: '#F0F8F3', text: '#2FA66A', icon: '✓', label: 'Kondisi Aman' },
  Waspada: { bg: '#FFFBEB', text: '#EAB308', icon: '⚠', label: 'Perhatian Diperlukan' },
  Siaga:   { bg: '#FFF7ED', text: '#F59E0B', icon: '⚠', label: 'Siaga Kebakaran' },
  Bahaya:  { bg: '#FEF2F2', text: '#DC2626', icon: '🚨', label: 'Bahaya! Ambil Tindakan' },
}

export default function EarlyWarningPage() {
  const [currentStatus] = useState<RiskLevel>('Siaga')
  const rc = riskConfig[currentStatus]

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold">Early Warning</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Informasi peringatan dini karhutla</p>
      </div>

      {/* Main Status */}
      <div className="card mb-5 overflow-hidden" style={{ background: rc.bg }}>
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: rc.text, opacity: .7 }}>
            Status Saat Ini
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: rc.text + '22' }}>
              <AlertTriangle size={30} style={{ color: rc.text }} />
            </div>
            <h2 className="text-4xl font-extrabold tracking-wide" style={{ color: rc.text }}>
              {currentStatus.toUpperCase()}
            </h2>
          </div>
          <p className="text-sm mt-2 max-w-lg" style={{ color: rc.text, opacity: .8 }}>
            Terdapat peningkatan risiko kebakaran pada area monitoring.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        {/* Condition Details */}
        <div className="card">
          <h3 className="font-semibold text-sm mb-4">Detail Kondisi</h3>
          <div className="space-y-3">
            {conditions.map(c => (
              <div key={c.label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                  <span className="text-sm font-medium">{c.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">{c.value} <span className="font-normal text-xs" style={{ color: 'var(--text-muted)' }}>{c.unit}</span></span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ color: c.color, background: c.color + '18' }}>
                    {c.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="card">
          <h3 className="font-semibold text-sm mb-4">Tindakan yang Disarankan</h3>
          <div className="space-y-2.5">
            {actions.map((action, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--bg)' }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                  style={{ background: 'var(--brand)' }}>{i + 1}</span>
                <p className="text-sm">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warning History */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Riwayat Peringatan</h3>
          <button className="text-xs font-medium" style={{ color: 'var(--brand)' }}>Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Tanggal', 'Waktu', 'Status', 'Pemicu', 'Notifikasi Telegram'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {warningHistory.map((row, i) => (
                <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)]">
                  <td className="py-2.5 px-3 text-xs">{row.tanggal}</td>
                  <td className="py-2.5 px-3 text-xs font-medium">{row.waktu}</td>
                  <td className="py-2.5 px-3"><StatusBadge level={row.status} /></td>
                  <td className="py-2.5 px-3 text-xs">{row.pemicu}</td>
                  <td className="py-2.5 px-3">
                    {row.telegram ? (
                      <div className="flex items-center gap-1 text-xs" style={{ color: '#2FA66A' }}>
                        <CheckCircle size={13} />
                        <span>Terkirim</span>
                      </div>
                    ) : (
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
