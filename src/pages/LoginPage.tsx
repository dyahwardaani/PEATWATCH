import { useState } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'

interface Props { onLogin: () => void }

export default function LoginPage({ onLogin }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return localStorage.getItem('peatwatch-welcome-seen') !== 'true'
    } catch {
      return true
    }
  })
  const [showPw, setShowPw] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [registerError, setRegisterError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState('')

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    onLogin()
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setRegisterError('Konfirmasi password tidak cocok.')
      return
    }

    setRegisterError('')
    setRegisterSuccess('Akun berhasil didaftarkan. Silakan masuk.')
    setMode('login')
    setPassword('')
    setConfirmPassword('')
  }

  function switchMode(nextMode: 'login' | 'register') {
    setMode(nextMode)
    setRegisterError('')
    setRegisterSuccess('')
  }

  function dismissWelcome() {
    try {
      localStorage.setItem('peatwatch-welcome-seen', 'true')
    } catch {
    }
    setShowWelcome(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Hero */}
      <div className="hidden md:flex items-center justify-center w-1/2 relative overflow-hidden p-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=85')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}>
        {/* Deep green tint keeps the photograph legible beneath white type. */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(5,28,19,.62) 0%, rgba(10,54,35,.43) 42%, rgba(3,24,16,.9) 100%)',
          }} />
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(110deg, rgba(3,24,16,.66) 0%, rgba(8,56,36,.18) 58%, rgba(2,18,12,.35) 100%)',
            backdropFilter: 'blur(.35px)',
          }} />
        <div className="absolute bottom-0 left-0 right-0 h-56"
          style={{ background: 'linear-gradient(to top, rgba(2,18,12,.88), rgba(4,30,20,.28) 58%, transparent)' }} />

        {/* Brand */}
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="flex flex-col items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl tracking-widest"><span className="hero-highlight">PEATWATCH</span></h1>
              <p className="text-green-300 text-xs tracking-wider">Peatland <span className="hero-highlight">Early Warning System</span></p>
            </div>
          </div>
          <p className="text-green-100 text-sm mt-6 mx-auto max-w-xs leading-relaxed opacity-80">
            Bersama menjaga lahan gambut untuk masa depan yang lebih aman.
          </p>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center bg-[var(--bg)] p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex md:hidden items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--brand)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <span className="font-bold text-xl" style={{ color: 'var(--brand)' }}>PEATWATCH</span>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-1">{mode === 'login' ? 'Selamat Datang' : 'Buat Akun'}</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              {mode === 'login'
                ? 'Masuk untuk mengakses sistem monitoring dan peringatan dini karhutla.'
                : 'Daftar untuk mulai menggunakan sistem monitoring dan peringatan dini karhutla.'}
            </p>

            {registerSuccess && mode === 'login' && (
              <p className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700" role="status">
                {registerSuccess}
              </p>
            )}

            <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="text-xs font-semibold block mb-1.5">Nama Lengkap</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="masukkan nama lengkap"
                    required
                    className="w-full border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': 'var(--brand-light)' } as React.CSSProperties} />
                </div>
              )}
              <div>
                <label className="text-xs font-semibold block mb-1.5">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="masukkan email anda"
                  required
                  className="w-full border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 transition-all"
                  style={{ '--tw-ring-color': 'var(--brand-light)' } as React.CSSProperties} />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="masukkan password"
                    required
                    className="w-full border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm outline-none pr-10" />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2">
                    {showPw ? <EyeOff size={15} style={{ color: 'var(--text-muted)' }} />
                      : <Eye size={15} style={{ color: 'var(--text-muted)' }} />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="text-xs font-semibold block mb-1.5">Konfirmasi Password</label>
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="ulangi password"
                    required
                    className="w-full border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm outline-none" />
                  {registerError && <p className="mt-1.5 text-xs text-red-600" role="alert">{registerError}</p>}
                </div>
              )}

              {mode === 'login' && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                    className="rounded" style={{ accentColor: 'var(--brand)' }} />
                  <span className="text-xs">Ingat saya</span>
                </label>
              )}

              <button type="submit"
                className="w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-all active:scale-[.98]"
                style={{ background: 'var(--brand)' }}>
                {mode === 'login' ? 'Masuk' : 'Daftar'}
              </button>

              {mode === 'login' && (
                <>
                  <div className="text-center">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>atau</span>
                  </div>
                  <button type="button" onClick={onLogin}
                    className="w-full py-2.5 rounded-lg text-sm font-medium border border-[var(--border)] hover:bg-[var(--bg)] transition-colors"
                    style={{ color: 'var(--brand)' }}>
                    Masuk dengan mode tamu
                  </button>
                </>
              )}

              <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
                <button type="button" onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                  className="font-semibold hover:underline" style={{ color: 'var(--brand)' }}>
                  {mode === 'login' ? 'Daftar' : 'Masuk'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>

      {showWelcome && (
        <div className="welcome-backdrop" role="presentation">
          <section className="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
            <button type="button" className="welcome-close" onClick={dismissWelcome} aria-label="Tutup dialog">
              <X size={18} />
            </button>
            <div className="welcome-icon" aria-hidden="true">
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <p className="welcome-kicker">Peatland <span className="welcome-highlight">Early Warning System</span></p>
            <h2 id="welcome-title">Selamat Datang di <span className="welcome-highlight">PeatWatch</span></h2>
            <p className="welcome-copy">Pantau kondisi lahan gambut dan dapatkan peringatan dini secara mudah.</p>
            <button type="button" className="welcome-primary" onClick={dismissWelcome}>
              Masuk ke PeatWatch
            </button>
          </section>
        </div>
      )}
    </div>
  )
}
