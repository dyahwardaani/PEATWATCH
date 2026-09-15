import { LayoutDashboard, Activity, AlertTriangle, History, MapPin, Send, Cpu, Info, LogOut } from 'lucide-react'
import type { Page } from '../data/mockData'

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'monitoring', label: 'Monitoring', icon: Activity },
  { id: 'early-warning', label: 'Early Warning', icon: AlertTriangle },
  { id: 'history', label: 'Histori Data', icon: History },
  { id: 'map', label: 'Peta Lokasi', icon: MapPin },
  { id: 'telegram', label: 'Telegram', icon: Send },
  { id: 'system', label: 'Sistem', icon: Cpu },
  { id: 'about', label: 'Tentang', icon: Info },
]

interface Props {
  activePage: Page
  onNavigate: (p: Page) => void
}

export default function Sidebar({ activePage, onNavigate }: Props) {
  return (
    <aside className="flex flex-col h-screen overflow-y-auto"
      style={{
        width: 'var(--sidebar-w)',
        minWidth: 'var(--sidebar-w)',
        background: '#0B3D2E',
        borderRight: '1px solid rgba(255,255,255,.08)',
      }}>
      {/* Logo */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,.12)' }}>
            <LeafIcon />
          </div>
          <span className="font-bold text-[15px] tracking-wide text-white">PEATWATCH</span>
        </div>
        <p className="text-[10px] leading-tight ml-10" style={{ color: '#B7D8C8' }}>Peatland Early Warning System</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-3 space-y-0.5">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activePage === id
          return (
            <button key={id} onClick={() => onNavigate(id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left"
              style={{
                background: active ? '#176B4D' : 'transparent',
                color: active ? '#fff' : '#D6E7DF',
              }}>
              <Icon size={16} />
              {label}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left hover:bg-white/10"
          style={{ color: '#D6E7DF' }}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  )
}

function LeafIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}
