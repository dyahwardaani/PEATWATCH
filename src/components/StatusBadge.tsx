import type { RiskLevel } from '../data/mockData'

export default function StatusBadge({ level }: { level: RiskLevel | string }) {
  const map: Record<string, string> = {
    Normal: 'badge-normal',
    Waspada: 'badge-waspada',
    Siaga: 'badge-siaga',
    Bahaya: 'badge-bahaya',
  }
  return <span className={map[level] ?? 'badge-normal'}>{level}</span>
}
