import { Cpu, Globe, Send, Wifi, Leaf } from 'lucide-react'

const roles = [
  { icon: Leaf, label: 'Sensor IoT', desc: 'Membaca data lingkungan: kelembaban tanah, suhu, kelembaban udara, dan gas/asap secara terus-menerus.' },
  { icon: Cpu, label: 'ESP32', desc: 'Mikrokontroler yang menerima data dari sensor, memprosesnya, dan menentukan tingkat risiko kebakaran.' },
  { icon: Wifi, label: 'Koneksi Internet', desc: 'ESP32 mengirimkan data yang telah diproses ke server/website melalui jaringan internet secara real-time.' },
  { icon: Globe, label: 'Website (PEATWATCH)', desc: 'Menampilkan data sensor dan status risiko secara real-time. Platform utama untuk pemantauan kondisi lahan gambut.' },
  { icon: Send, label: 'Telegram Bot', desc: 'Mengirimkan notifikasi peringatan dini kepada operator ketika kondisi Waspada atau Bahaya terdeteksi.' },
]

const steps = [
  'Sensor mengumpulkan data lingkungan (kelembaban tanah, suhu, kelembaban udara, gas/asap).',
  'ESP32 menerima dan memproses data dari seluruh sensor.',
  'Sistem menentukan tingkat risiko kebakaran berdasarkan kondisi yang terdeteksi.',
  'Website menampilkan data pemantauan secara real-time.',
  'Telegram mengirimkan peringatan untuk kondisi Waspada, Siaga, atau Bahaya.',
]

export default function AboutPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold">Tentang PEATWATCH</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Sistem Pemantauan dan Peringatan Dini Karhutla pada Lahan Gambut</p>
      </div>

      {/* What is PEATWATCH */}
      <div className="card mb-5">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--brand)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Apa itu PEATWATCH?</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              PEATWATCH adalah sistem peringatan dini berbasis web yang dirancang untuk memantau kondisi lingkungan pada lahan gambut dan memberikan peringatan awal terhadap potensi risiko kebakaran hutan dan lahan (Karhutla).
            </p>
            <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-muted)' }}>
              Sistem ini memanfaatkan teknologi Internet of Things (IoT) dengan mikrokontroler ESP32 yang terhubung dengan berbagai sensor lingkungan untuk memantau parameter kritis secara real-time, memberikan peringatan ketika kondisi mencapai tingkat risiko tertentu.
            </p>
          </div>
        </div>
      </div>

      {/* Roles */}
      <div className="card mb-5">
        <h3 className="font-semibold text-sm mb-4">Komponen Sistem</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {roles.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--brand-pale)' }}>
                  <Icon size={16} style={{ color: 'var(--brand)' }} />
                </div>
                <span className="text-sm font-semibold">{label}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="card mb-5">
        <h3 className="font-semibold text-sm mb-4">Cara Kerja Sistem</h3>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                style={{ background: 'var(--brand)' }}>{i + 1}</span>
              <p className="text-sm leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="card text-center py-8" style={{ background: 'var(--brand)', color: 'white' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <span className="font-bold tracking-widest text-lg">PEATWATCH</span>
        </div>
        <p className="text-sm opacity-80 mb-1">Peatland Early Warning System</p>
        <p className="text-xs opacity-60 italic max-w-sm mx-auto mt-3">
          "Teknologi untuk gambut yang lebih aman, lingkungan yang lebih lestari."
        </p>
      </div>
    </div>
  )
}
