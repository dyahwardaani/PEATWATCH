import { useState } from 'react'
import type { Page } from './data/mockData'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import MonitoringPage from './pages/MonitoringPage'
import EarlyWarningPage from './pages/EarlyWarningPage'
import HistoryDataPage from './pages/HistoryDataPage'
import MapPage from './pages/MapPage'
import TelegramPage from './pages/TelegramPage'
import SystemPage from './pages/SystemPage'
import AboutPage from './pages/AboutPage'
import ProfilePage from './pages/ProfilePage'
import AccountSettingsPage from './pages/AccountSettingsPage'

export default function App() {
  const [page, setPage] = useState<Page>('login')

  if (page === 'login') {
    return <LoginPage onLogin={() => setPage('dashboard')} />
  }

  return (
    <div className="app-shell flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      <Sidebar activePage={page} onNavigate={setPage} onLogout={() => setPage('login')} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onNavigate={setPage} onLogout={() => setPage('login')} />
        <main className="app-main flex-1 overflow-y-auto p-4 md:p-6">
          {page === 'dashboard'      && <DashboardPage onNavigate={setPage} />}
          {page === 'monitoring'     && <MonitoringPage />}
          {page === 'early-warning'  && <EarlyWarningPage />}
          {page === 'history'        && <HistoryDataPage />}
          {page === 'map'            && <MapPage />}
          {page === 'telegram'       && <TelegramPage />}
          {page === 'system'         && <SystemPage />}
          {page === 'about'          && <AboutPage />}
          {page === 'profile'        && <ProfilePage />}
          {page === 'account-settings' && <AccountSettingsPage />}
        </main>
      </div>
    </div>
  )
}
