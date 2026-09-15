import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { sensors } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'
import type { RiskLevel } from '../data/mockData'

const dotColor: Record<RiskLevel, string> = {
  Normal: '#2FA66A',
  Waspada: '#EAB308',
  Siaga: '#F59E0B',
  Bahaya: '#DC2626',
}

export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: [-0.1256, 109.1256],
      zoom: 13,
      zoomControl: true,
      attributionControl: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    sensors.forEach(sensor => {
      const [latitude, longitude] = sensor.koordinat.split(',').map(Number)
      const color = dotColor[sensor.status]
      const markerIcon = L.divIcon({
        className: 'peatwatch-map-marker',
        html: `<span style="display:block;width:30px;height:30px;background:${color};border:3px solid #fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(23,53,44,.3)"><span style="display:block;width:8px;height:8px;margin:8px;background:#fff;border-radius:50%"></span></span>`,
        iconSize: [30, 38],
        iconAnchor: [15, 38],
        popupAnchor: [0, -34],
      })
      const popup = `
        <div style="min-width:180px;font-family:Inter,sans-serif;color:#17352C">
          <strong style="font-size:13px">${sensor.id}</strong>
          <div style="font-size:11px;color:#6B8178;margin-top:3px">${sensor.lokasi}</div>
          <div style="font-size:11px;color:#6B8178;margin-top:6px;line-height:1.6">
            Kelembapan Tanah: 42%<br />Suhu Tanah: 31.5°C<br />Asap: 12 ppm
          </div>
          <div style="margin-top:7px;font-size:10px;font-weight:700;color:${color}">Status: ${sensor.status.toUpperCase()}</div>
          <div style="font-size:10px;color:#6B8178;margin-top:3px">Update: ${sensor.update}</div>
        </div>`

      L.marker([latitude, longitude], { icon: markerIcon })
        .addTo(map)
        .bindPopup(popup)
    })

    return () => map.remove()
  }, [])

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold">Peta Lokasi</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Lokasi sensor dan kondisi area monitoring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        {/* Map */}
        <div className="card lg:col-span-2 p-0 overflow-hidden">
          <div ref={mapContainerRef} className="relative w-full" style={{ height: 380 }} aria-label="Peta lokasi sensor" />

          <div className="relative -mt-[380px] pointer-events-none" style={{ height: 380 }}>
            {/* Legend */}
            <div className="absolute top-3 right-3 bg-white rounded-xl p-3 shadow-lg border border-[var(--border)]">
              <p className="text-[10px] font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Legenda Status</p>
              {(['Normal', 'Waspada', 'Siaga', 'Bahaya'] as RiskLevel[]).map(s => (
                <div key={s} className="flex items-center gap-2 mb-1.5 last:mb-0">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: dotColor[s] }} />
                  <span className="text-xs">{s}</span>
                </div>
              ))}
            </div>

          </div>
          </div>

        {/* Legend panel */}
        <div className="card">
          <h3 className="font-semibold text-sm mb-4">Ringkasan Sensor</h3>
          <div className="space-y-3">
            {sensors.map(s => (
              <div key={s.id} className="p-3 rounded-xl border" style={{ borderColor: dotColor[s.status] + '50', background: dotColor[s.status] + '08' }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold">{s.id}</span>
                  <StatusBadge level={s.status} />
                </div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.lokasi}</p>
                <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>{s.koordinat}</p>
                <p className="text-[10px] mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>Update: {s.update}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sensor Table */}
      <div className="card">
        <h3 className="font-semibold text-sm mb-4">Daftar Sensor</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['ID Sensor', 'Lokasi', 'Koordinat', 'Status', 'Terakhir Update'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sensors.map((s) => (
                <tr key={s.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)]">
                  <td className="py-2.5 px-3 text-xs font-bold" style={{ color: 'var(--brand)' }}>{s.id}</td>
                  <td className="py-2.5 px-3 text-xs">{s.lokasi}</td>
                  <td className="py-2.5 px-3 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{s.koordinat}</td>
                  <td className="py-2.5 px-3"><StatusBadge level={s.status} /></td>
                  <td className="py-2.5 px-3 text-xs">{s.update}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
