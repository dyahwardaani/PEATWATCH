export type RiskLevel = 'Normal' | 'Waspada' | 'Siaga' | 'Bahaya'
export type Page = 'login' | 'dashboard' | 'monitoring' | 'early-warning' | 'history' | 'map' | 'telegram' | 'system' | 'about' | 'profile' | 'account-settings'

export const currentSensor = {
  suhu: 31.5,
  kelUdara: 68,
  kelTanah: 42,
  asap: 12,
  riskLevel: 'Normal' as RiskLevel,
  lastUpdate: '14:28 WIB',
  date: 'Rabu, 13 September 2024',
}

export const chart24h = [
  { time: '00:00', suhu: 27.1, kelUdara: 78, kelTanah: 52, asap: 8 },
  { time: '02:00', suhu: 26.8, kelUdara: 80, kelTanah: 51, asap: 7 },
  { time: '04:00', suhu: 26.5, kelUdara: 82, kelTanah: 50, asap: 7 },
  { time: '06:00', suhu: 27.3, kelUdara: 79, kelTanah: 49, asap: 8 },
  { time: '08:00', suhu: 28.8, kelUdara: 74, kelTanah: 47, asap: 9 },
  { time: '10:00', suhu: 30.4, kelUdara: 70, kelTanah: 45, asap: 10 },
  { time: '12:00', suhu: 31.9, kelUdara: 65, kelTanah: 43, asap: 12 },
  { time: '14:00', suhu: 31.5, kelUdara: 68, kelTanah: 42, asap: 12 },
  { time: '16:00', suhu: 30.7, kelUdara: 70, kelTanah: 42, asap: 11 },
  { time: '18:00', suhu: 29.4, kelUdara: 73, kelTanah: 43, asap: 10 },
  { time: '20:00', suhu: 28.1, kelUdara: 76, kelTanah: 44, asap: 9 },
  { time: '22:00', suhu: 27.6, kelUdara: 79, kelTanah: 46, asap: 8 },
]

export const chart7d = [
  { time: '7 Sep', suhu: 29.2, kelUdara: 72, kelTanah: 48, asap: 10 },
  { time: '8 Sep', suhu: 30.5, kelUdara: 69, kelTanah: 46, asap: 11 },
  { time: '9 Sep', suhu: 33.2, kelUdara: 60, kelTanah: 38, asap: 22 },
  { time: '10 Sep', suhu: 35.1, kelUdara: 52, kelTanah: 30, asap: 45 },
  { time: '11 Sep', suhu: 34.8, kelUdara: 55, kelTanah: 32, asap: 38 },
  { time: '12 Sep', suhu: 32.4, kelUdara: 62, kelTanah: 38, asap: 18 },
  { time: '13 Sep', suhu: 31.5, kelUdara: 68, kelTanah: 42, asap: 12 },
]

export const recentActivity = [
  { time: '14:20', status: 'Normal', text: 'Kondisi normal terdeteksi', color: '#16A34A' },
  { time: '12:10', status: 'Waspada', text: 'Kelembaban tanah menurun', color: '#D97706' },
  { time: '10:30', status: 'Normal', text: 'Kondisi normal terdeteksi', color: '#16A34A' },
  { time: '08:05', status: 'Info', text: 'Sistem terhubung', color: '#3B82F6' },
]

export const historyData = [
  { id: 1, tanggal: '13 Sep 2024', waktu: '14:20', suhu: 31.5, kelUdara: 68, kelTanah: 42, asap: 12, status: 'Normal' as RiskLevel },
  { id: 2, tanggal: '13 Sep 2024', waktu: '14:10', suhu: 31.2, kelUdara: 67, kelTanah: 43, asap: 11, status: 'Normal' as RiskLevel },
  { id: 3, tanggal: '13 Sep 2024', waktu: '14:00', suhu: 31.8, kelUdara: 69, kelTanah: 45, asap: 10, status: 'Normal' as RiskLevel },
  { id: 4, tanggal: '13 Sep 2024', waktu: '13:50', suhu: 35.2, kelUdara: 55, kelTanah: 28, asap: 45, status: 'Siaga' as RiskLevel },
  { id: 5, tanggal: '13 Sep 2024', waktu: '13:40', suhu: 37.6, kelUdara: 48, kelTanah: 22, asap: 80, status: 'Bahaya' as RiskLevel },
  { id: 6, tanggal: '13 Sep 2024', waktu: '13:30', suhu: 36.5, kelUdara: 52, kelTanah: 25, asap: 62, status: 'Siaga' as RiskLevel },
  { id: 7, tanggal: '13 Sep 2024', waktu: '13:20', suhu: 33.1, kelUdara: 58, kelTanah: 34, asap: 32, status: 'Waspada' as RiskLevel },
  { id: 8, tanggal: '13 Sep 2024', waktu: '13:10', suhu: 31.9, kelUdara: 65, kelTanah: 39, asap: 18, status: 'Normal' as RiskLevel },
  { id: 9, tanggal: '13 Sep 2024', waktu: '13:00', suhu: 31.4, kelUdara: 67, kelTanah: 40, asap: 13, status: 'Normal' as RiskLevel },
  { id: 10, tanggal: '13 Sep 2024', waktu: '12:50', suhu: 31.5, kelUdara: 68, kelTanah: 42, asap: 12, status: 'Normal' as RiskLevel },
]

export const warningHistory = [
  { tanggal: '13 Sep 2024', waktu: '13:50', status: 'Siaga' as RiskLevel, pemicu: 'Suhu Tinggi', telegram: true },
  { tanggal: '13 Sep 2024', waktu: '10:20', status: 'Waspada' as RiskLevel, pemicu: 'Kelembaban tanah rendah', telegram: true },
  { tanggal: '12 Sep 2024', waktu: '18:10', status: 'Normal' as RiskLevel, pemicu: 'Kondisi kembali normal', telegram: false },
  { tanggal: '12 Sep 2024', waktu: '14:35', status: 'Waspada' as RiskLevel, pemicu: 'Asap terdeteksi', telegram: true },
  { tanggal: '11 Sep 2024', waktu: '11:15', status: 'Bahaya' as RiskLevel, pemicu: 'Suhu + Asap tinggi', telegram: true },
]

export const sensors = [
  { id: 'EWS-001', lokasi: 'Area Gambut A', koordinat: '-0.1234, 109.1234', status: 'Normal' as RiskLevel, update: '14:28 WIB', lat: 35, lng: 30 },
  { id: 'EWS-002', lokasi: 'Area Gambut B', koordinat: '-0.1256, 109.1256', status: 'Waspada' as RiskLevel, update: '14:20 WIB', lat: 55, lng: 55 },
  { id: 'EWS-003', lokasi: 'Area Gambut C', koordinat: '-0.1278, 109.1278', status: 'Siaga' as RiskLevel, update: '14:10 WIB', lat: 70, lng: 72 },
]
