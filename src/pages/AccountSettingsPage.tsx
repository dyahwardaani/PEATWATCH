import { useState } from 'react'
import { Bell, KeyRound, LockKeyhole, MessageCircle, Save, ShieldCheck } from 'lucide-react'

export default function AccountSettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [telegram, setTelegram] = useState(true)

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold">Pengaturan Akun</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Kelola preferensi akun dan keamanan</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl">
        <section className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--brand-pale)' }}><ShieldCheck size={18} style={{ color: 'var(--brand-mid)' }} /></div>
            <div><h2 className="font-semibold text-sm">Informasi Akun</h2><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Preferensi dasar pengguna</p></div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between"><span style={{ color: 'var(--text-muted)' }}>Nama pengguna</span><strong>Admin</strong></div>
            <div className="flex items-center justify-between"><span style={{ color: 'var(--text-muted)' }}>Email</span><strong>admin@peatwatch.id</strong></div>
            <div className="flex items-center justify-between"><span style={{ color: 'var(--text-muted)' }}>ID Pengguna</span><strong>ADMIN-001</strong></div>
          </div>
        </section>

        <section className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--brand-pale)' }}><Bell size={18} style={{ color: 'var(--brand-mid)' }} /></div>
            <div><h2 className="font-semibold text-sm">Notifikasi</h2><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Atur cara menerima peringatan</p></div>
          </div>
          <SettingToggle label="Notifikasi sistem" checked={notifications} onChange={() => setNotifications(value => !value)} />
          <SettingToggle label="Notifikasi Telegram" checked={telegram} onChange={() => setTelegram(value => !value)} icon={MessageCircle} />
        </section>

        <section className="card lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--brand-pale)' }}><LockKeyhole size={18} style={{ color: 'var(--brand-mid)' }} /></div>
            <div><h2 className="font-semibold text-sm">Keamanan</h2><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Jaga keamanan akun PEATWATCH</p></div>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg p-3" style={{ background: 'var(--bg)' }}>
            <div className="flex items-center gap-3"><KeyRound size={17} style={{ color: 'var(--brand-mid)' }} /><div><p className="text-sm font-semibold">Password</p><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Terakhir diubah 30 hari lalu</p></div></div>
            <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white" style={{ background: 'var(--brand-mid)' }}><Save size={14} /> Change Password</button>
          </div>
        </section>
      </div>
    </div>
  )
}

function SettingToggle({ label, checked, onChange, icon: Icon = Bell }: { label: string; checked: boolean; onChange: () => void; icon?: typeof Bell }) {
  return (
    <label className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0 cursor-pointer">
      <span className="flex items-center gap-2 text-sm"><Icon size={15} style={{ color: 'var(--text-muted)' }} />{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ accentColor: 'var(--brand-mid)' }} />
    </label>
  )
}
