import { useEffect, useRef, useState } from 'react'
import { Bell, Search, ChevronDown, X, UserRound, Settings, LogOut } from 'lucide-react'
import { recentActivity } from '../data/mockData'
import type { Page } from '../data/mockData'

interface Props {
  onNavigate: (page: Page) => void
  onLogout: () => void
}

const avatarUrl = 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_1.png'

export default function Header({ onNavigate, onLogout }: Props) {
  const [showNotif, setShowNotif] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showProfile) return
    function handleOutsideClick(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [showProfile])

  function openPage(page: Page) {
    setShowProfile(false)
    onNavigate(page)
  }

  return (
    <header className="flex items-center justify-between px-6 bg-white border-b border-[var(--border)] h-[60px] flex-shrink-0 relative z-20">
      {/* Search */}
      <div className="flex items-center gap-2 bg-[var(--bg)] rounded-lg px-3 py-1.5 w-60">
        <Search size={15} className="text-[var(--text-muted)]" />
        <input placeholder="Cari sesuatu..." className="bg-transparent text-sm outline-none w-full text-[var(--text)]"
          style={{ color: 'var(--text)' }} />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          Rabu, 13 September 2024 &nbsp;|&nbsp; <strong style={{ color: 'var(--text)' }}>14:28 WIB</strong>
        </span>

        {/* Notification */}
        <div className="relative">
          <button onClick={() => setShowNotif(v => !v)}
            className="w-8 h-8 rounded-lg bg-[var(--bg)] flex items-center justify-center relative hover:bg-[var(--brand-pale)] transition-colors">
            <Bell size={16} style={{ color: 'var(--text-muted)' }} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          </button>
          {showNotif && (
            <div className="absolute right-0 top-10 w-72 bg-white rounded-xl shadow-lg border border-[var(--border)] z-30">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
                <span className="font-semibold text-sm">Notifikasi</span>
                <button onClick={() => setShowNotif(false)}><X size={14} style={{ color: 'var(--text-muted)' }} /></button>
              </div>
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-[var(--border)] last:border-0">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                  <div>
                    <p className="text-xs font-medium">{a.text}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button type="button" onClick={() => setShowProfile(value => !value)} aria-expanded={showProfile}
            className="flex items-center gap-2 hover:bg-[var(--bg)] rounded-lg px-2 py-1 transition-colors">
            <img
            src={avatarUrl}
            alt="Admin profile avatar"
            className="w-10 h-10 rounded-full object-cover"
            style={{ background: '#DDF3E7' }}
            />
            <span className="text-sm font-medium">Admin</span>
            <ChevronDown size={13} style={{ color: 'var(--text-muted)' }} />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-[calc(100%+8px)] z-40 w-72 rounded-xl border border-[var(--border)] bg-white p-2 shadow-xl">
              <div className="flex items-center gap-3 px-3 py-3">
                <img src={avatarUrl} alt="Admin profile avatar" className="w-12 h-12 rounded-full object-cover" style={{ background: '#DDF3E7' }} />
                <div><p className="text-sm font-bold">Admin</p><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Administrator</p></div>
              </div>
              <div className="my-1 border-t border-[var(--border)]" />
              <button onClick={() => openPage('profile')} className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-[var(--bg)]"><UserRound size={16} style={{ color: 'var(--brand-mid)' }} />Profil Saya</button>
              <button onClick={() => openPage('account-settings')} className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-[var(--bg)]"><Settings size={16} style={{ color: 'var(--brand-mid)' }} />Pengaturan Akun</button>
              <div className="my-1 border-t border-[var(--border)]" />
              <button onClick={() => { setShowProfile(false); setShowLogout(true) }} className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"><LogOut size={16} />Keluar</button>
            </div>
          )}
        </div>
      </div>

      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-xl border border-[var(--border)] bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4"><div><h2 className="font-semibold">Keluar dari PEATWATCH?</h2><p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>Anda akan kembali ke halaman masuk.</p></div><button onClick={() => setShowLogout(false)} aria-label="Tutup"><X size={17} style={{ color: 'var(--text-muted)' }} /></button></div>
            <div className="mt-5 flex justify-end gap-2"><button onClick={() => setShowLogout(false)} className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold">Batal</button><button onClick={onLogout} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white">Keluar</button></div>
          </div>
        </div>
      )}
    </header>
  )
}
