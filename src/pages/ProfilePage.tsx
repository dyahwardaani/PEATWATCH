import { useState } from 'react'
import { CalendarDays, CheckCircle2, Mail, Pencil, Phone, Save, UserRound, X } from 'lucide-react'

const avatarUrl = 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_1.png'

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('Admin')
  const [email, setEmail] = useState('admin@peatwatch.id')
  const [phone, setPhone] = useState('0812 3456 7890')
  const [role, setRole] = useState('Administrator Sistem')

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold">Profil Saya</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Informasi akun dan data pengguna</p>
      </div>

      <div className="card max-w-3xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-5">
          <div className="flex items-center gap-4">
            <img src={avatarUrl} alt="Admin profile avatar" className="w-20 h-20 rounded-full object-cover" style={{ background: '#DDF3E7' }} />
            <div>
              <h2 className="text-lg font-bold">{name}</h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{role}</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium" style={{ color: 'var(--brand-light)' }}>
                <CheckCircle2 size={14} /> Aktif
              </div>
            </div>
          </div>
          {!editing && (
            <button onClick={() => setEditing(true)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white" style={{ background: 'var(--brand-mid)' }}>
              <Pencil size={14} /> Edit Profil
            </button>
          )}
        </div>

        {editing ? (
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5" onSubmit={event => { event.preventDefault(); setEditing(false) }}>
            <label className="text-xs font-semibold">Nama Lengkap
              <input value={name} onChange={event => setName(event.target.value)} className="mt-1.5 w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm outline-none" />
            </label>
            <label className="text-xs font-semibold">Email
              <input type="email" value={email} onChange={event => setEmail(event.target.value)} className="mt-1.5 w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm outline-none" />
            </label>
            <label className="text-xs font-semibold">Nomor Telepon
              <input value={phone} onChange={event => setPhone(event.target.value)} className="mt-1.5 w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm outline-none" />
            </label>
            <label className="text-xs font-semibold">Jabatan
              <input value={role} onChange={event => setRole(event.target.value)} className="mt-1.5 w-full rounded-lg border border-[var(--border)] px-3 py-2.5 text-sm outline-none" />
            </label>
            <div className="md:col-span-2 flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setEditing(false)} className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                <X size={14} /> Batal
              </button>
              <button type="submit" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white" style={{ background: 'var(--brand-mid)' }}>
                <Save size={14} /> Simpan Perubahan
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
            <ProfileDetail icon={UserRound} label="Nama" value={name} />
            <ProfileDetail icon={BriefcaseIcon} label="Jabatan" value={role} />
            <ProfileDetail icon={Mail} label="Email" value={email} />
            <ProfileDetail icon={UserRound} label="ID Pengguna" value="ADMIN-001" />
            <ProfileDetail icon={CheckCircle2} label="Status Akun" value="Aktif" valueColor="var(--brand-light)" />
            <ProfileDetail icon={CalendarDays} label="Tanggal Bergabung" value="12 Januari 2024" />
          </div>
        )}
      </div>
    </div>
  )
}

function ProfileDetail({ icon: Icon, label, value, valueColor }: { icon: typeof UserRound; label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg p-3" style={{ background: 'var(--bg)' }}>
      <Icon size={17} style={{ color: 'var(--brand-mid)' }} />
      <div>
        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{label}</p>
        <p className="text-sm font-semibold mt-0.5" style={{ color: valueColor || 'var(--text)' }}>{value}</p>
      </div>
    </div>
  )
}

function BriefcaseIcon(props: { size?: number }) {
  return <UserRound {...props} />
}
