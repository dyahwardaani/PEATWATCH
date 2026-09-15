import { Wifi, Database, Globe, Send, Cpu, CheckCircle } from 'lucide-react'

const devices = [
  { icon: Cpu, label: 'ESP32 EWS-001', status: 'Online', color: '#2FA66A' },
  { icon: Wifi, label: 'Koneksi Internet', status: 'Terhubung', color: '#2FA66A' },
  { icon: Database, label: 'Database', status: 'Terhubung', color: '#2FA66A' },
  { icon: Send, label: 'Telegram', status: 'Terhubung', color: '#2FA66A' },
]

const sensors = [
  { name: 'Capacitive Soil Moisture', desc: 'Kelembaban tanah (%)' },
  { name: 'DS18B20 (Waterproof)', desc: 'Suhu tanah (°C)' },
  { name: 'DHT22', desc: 'Suhu & kelembaban udara' },
  { name: 'MQ-2 / MQ-135', desc: 'Gas / Asap (ppm)' },
]

export default function SystemPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold">Sistem</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Arsitektur sistem dan status perangkat</p>
      </div>

      {/* Architecture Diagram */}
      <div className="card mb-5">
        <h3 className="font-semibold text-sm mb-6">Arsitektur Sistem IoT</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto">
          {/* Sensors block */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-4 w-40">
              <p className="text-xs font-bold text-center mb-3" style={{ color: 'var(--brand)' }}>SENSOR</p>
              {sensors.map(s => (
                <div key={s.name} className="mb-2 last:mb-0">
                  <div className="bg-[var(--bg)] rounded-lg px-2.5 py-1.5">
                    <p className="text-[10px] font-semibold">{s.name}</p>
                    <p className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight label="Data Sensor" />

          {/* ESP32 */}
          <ArchNode icon={<Cpu size={28} />} label="ESP32" desc="Mikrokontroler" color="#0B3D2E" />

          <ArrowRight label="Data via Internet" />

          {/* Server */}
          <ArchNode icon={<Database size={28} />} label="Server / Database" desc="Menyimpan & mengolah data" color="#3B82F6" />

          <ArrowRight label="Real-time" />

          {/* Website */}
          <ArchNode icon={<Globe size={28} />} label="Website" desc="Monitoring & visualisasi" color="#8B5CF6" />

          <ArrowRight label="Notifikasi" />

          {/* Telegram */}
          <ArchNode icon={<Send size={28} />} label="Telegram" desc="Notifikasi dini" color="#2AABEE" />
        </div>

        {/* Risk flow */}
        <div className="mt-8 pt-6 border-t border-[var(--border)]">
          <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Alur Deteksi Risiko</p>
          <div className="flex flex-wrap items-center gap-3">
            {['Pembacaan Sensor', 'Pengolahan ESP32', 'Penentuan Risiko', 'Kondisi Aman → Website Normal', 'Kondisi Waspada/Bahaya → Website + Telegram'].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[var(--bg)] rounded-lg px-3 py-2">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                    style={{ background: 'var(--brand)' }}>{i + 1}</span>
                  <span className="text-xs font-medium">{step}</span>
                </div>
                {i < arr.length - 1 && <span className="text-[var(--text-muted)]">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Status */}
      <div className="card">
        <h3 className="font-semibold text-sm mb-4">Status Perangkat</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {devices.map(({ icon: Icon, label, status, color }) => (
            <div key={label} className="p-4 rounded-xl border border-[var(--border)] flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: color + '18' }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <p className="text-xs font-semibold">{label}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                  <span className="text-[11px] font-medium" style={{ color }}>{status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] mt-3" style={{ color: 'var(--text-muted)' }}>
          Terakhir Online: 13 Sep 2024, 14:28 WIB
        </p>
      </div>
    </div>
  )
}

function ArchNode({ icon, label, desc, color }: { icon: React.ReactNode; label: string; desc: string; color: string }) {
  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-2 shadow-sm"
        style={{ background: color }}>
        {icon}
      </div>
      <p className="text-xs font-bold text-center">{label}</p>
      <p className="text-[9px] text-center mt-0.5 max-w-[80px] leading-tight" style={{ color: 'var(--text-muted)' }}>{desc}</p>
    </div>
  )
}

function ArrowRight({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-shrink-0">
      <svg width="40" height="20" viewBox="0 0 40 20">
        <line x1="0" y1="10" x2="34" y2="10" stroke="#D5E5DC" strokeWidth="2" />
        <polygon points="28,5 40,10 28,15" fill="#D5E5DC" />
      </svg>
      <span className="text-[9px] font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </div>
  )
}
