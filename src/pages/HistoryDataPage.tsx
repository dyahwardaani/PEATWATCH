import { useState } from 'react'
import { Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { historyData } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'

const PAGE_SIZE = 10

export default function HistoryDataPage() {
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [startDate, setStartDate] = useState('2024-09-01')
  const [endDate, setEndDate] = useState('2024-09-13')

  const filtered = statusFilter === 'Semua' ? historyData
    : historyData.filter(d => d.status === statusFilter)

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold">Histori Data</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Data hasil pemantauan sensor</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white transition-all"
          style={{ background: 'var(--brand)' }}>
          <Download size={14} />
          Download Data
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Dari:</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
              className="border border-[var(--border)] rounded-lg px-3 py-1.5 text-xs outline-none bg-white" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Sampai:</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
              className="border border-[var(--border)] rounded-lg px-3 py-1.5 text-xs outline-none bg-white" />
          </div>
          <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
            className="border border-[var(--border)] rounded-lg px-3 py-1.5 text-xs outline-none bg-white cursor-pointer">
            {['Semua', 'Normal', 'Waspada', 'Siaga', 'Bahaya'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg text-white"
            style={{ background: 'var(--brand-mid)' }}>
            <Filter size={12} />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Tanggal', 'Waktu', 'Suhu (°C)', 'Kel. Udara (%)', 'Kel. Tanah (%)', 'Asap (ppm)', 'Status'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map((row) => (
                <tr key={row.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)] transition-colors">
                  <td className="py-2.5 px-3 text-xs">{row.tanggal}</td>
                  <td className="py-2.5 px-3 text-xs font-medium">{row.waktu}</td>
                  <td className="py-2.5 px-3 text-xs">{row.suhu}</td>
                  <td className="py-2.5 px-3 text-xs">{row.kelUdara}</td>
                  <td className="py-2.5 px-3 text-xs">{row.kelTanah}</td>
                  <td className="py-2.5 px-3 text-xs">{row.asap}</td>
                  <td className="py-2.5 px-3"><StatusBadge level={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border)]">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Menampilkan {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} data
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-[var(--border)] disabled:opacity-40 hover:bg-[var(--bg)]">
              <ChevronLeft size={13} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium border transition-colors"
                style={{
                  background: page === p ? 'var(--brand)' : 'transparent',
                  color: page === p ? '#fff' : 'var(--text)',
                  borderColor: page === p ? 'var(--brand)' : 'var(--border)',
                }}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-7 h-7 rounded-lg flex items-center justify-center border border-[var(--border)] disabled:opacity-40 hover:bg-[var(--bg)]">
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
