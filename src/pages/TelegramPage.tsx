import { useState } from 'react'
import { Send, CheckCircle, Bot, Bell, Hash, User } from 'lucide-react'

export default function TelegramPage() {
  const [tested, setTested] = useState(false)

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold">Notifikasi Telegram</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Integrasi dan pengaturan notifikasi Telegram</p>
      </div>

      {/* Connection Status */}
      <div className="card mb-5" style={{ background: '#F0F8F3', border: '1px solid #B9DEC7' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: '#2FA66A22' }}>
              <Send size={20} style={{ color: '#2FA66A' }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: '#2FA66A' }}>Telegram Terhubung</p>
              <p className="text-xs" style={{ color: '#2FA66A', opacity: .75 }}>Bot aktif dan siap mengirim notifikasi.</p>
            </div>
          </div>
          <button onClick={() => setTested(true)}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white transition-all"
            style={{ background: 'var(--brand)' }}>
            <Send size={13} />
            {tested ? 'Terkirim ✓' : 'Uji Notifikasi'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        {/* Bot Info */}
        <div className="card">
          <h3 className="font-semibold text-sm mb-4">Informasi Bot</h3>
          <div className="space-y-3">
            {[
              { icon: Bot, label: 'Nama Bot', value: 'PeatWatch_EWS_Bot' },
              { icon: User, label: 'Username', value: '@PeatWatch_EWS_Bot' },
              { icon: Hash, label: 'Chat ID', value: '123456789' },
              { icon: Bell, label: 'Status', value: 'Aktif' },
              { icon: CheckCircle, label: 'Notifikasi', value: 'Aktif' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg)' }}>
                    <Icon size={14} style={{ color: 'var(--brand)' }} />
                  </div>
                  <span className="text-xs font-medium">{label}</span>
                </div>
                <span className="text-xs font-semibold"
                  style={{ color: value === 'Aktif' ? '#2FA66A' : 'var(--text)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Rules */}
        <div className="card">
          <h3 className="font-semibold text-sm mb-4">Aturan Notifikasi</h3>
          <div className="space-y-3">
            {[
              { level: 'Normal', color: '#2FA66A', bg: '#DDF3E7', desc: 'Pemantauan website saja. Tidak ada notifikasi Telegram.' },
              { level: 'Waspada', color: '#EAB308', bg: '#FEF3C7', desc: 'Pemantauan website + notifikasi Telegram terkirim.' },
              { level: 'Siaga', color: '#F59E0B', bg: '#FFEDD5', desc: 'Pemantauan website + notifikasi Telegram prioritas tinggi.' },
              { level: 'Bahaya', color: '#DC2626', bg: '#FEE2E2', desc: 'Pemantauan website + notifikasi Telegram darurat.' },
            ].map(({ level, color, bg, desc }) => (
              <div key={level} className="flex gap-3 p-3 rounded-xl" style={{ background: bg }}>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full h-fit"
                  style={{ color, background: color + '22' }}>{level}</span>
                <p className="text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Preview */}
      <div className="card">
        <h3 className="font-semibold text-sm mb-4">Contoh Pesan Notifikasi</h3>
        <div className="max-w-sm">
          <div className="rounded-2xl p-4 text-sm leading-relaxed"
            style={{ background: '#FEF3C7', border: '1px solid #FCD34D' }}>
            <p className="font-bold text-base mb-2">⚠️ PERINGATAN DINI KARHUTLA</p>
            <div className="space-y-1 text-xs">
              <p><strong>Status:</strong> SIAGA</p>
              <p><strong>Lokasi:</strong> Area Gambut A</p>
              <p><strong>Waktu:</strong> 13 Sep 2024, 13:50 WIB</p>
            </div>
            <div className="my-3 border-t border-yellow-300" />
            <p className="text-xs mb-2">Terdapat peningkatan risiko kebakaran pada area monitoring.</p>
            <div className="space-y-0.5 text-xs">
              <p>🌡️ Suhu: 37.8 °C</p>
              <p>💧 Kel. Udara: 45 %</p>
              <p>🌱 Kel. Tanah: 22 %</p>
              <p>💨 Gas/Asap: 85 ppm</p>
            </div>
            <div className="my-3 border-t border-yellow-300" />
            <p className="text-xs font-semibold">Segera lakukan pemeriksaan kondisi area.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
