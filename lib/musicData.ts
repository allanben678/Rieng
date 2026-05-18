// ─────────────────────────────────────────────────────────────────────────────
// RIENG Music Store — Single Source of Truth
// Add new songs here and they will automatically appear in:
//  • The Albums page  (buy / download section)
//  • The Videos page  (Music category in "Pick Your Channel")
// ─────────────────────────────────────────────────────────────────────────────

export const songsForSale = [
  {
    id: 1,
    title: 'Rieng Remix',
    feat: 'Boondocks Gang, VDJ Jones ft Kristoff, Rankaddah',
    desc: 'A high-energy Rieng remix bringing together heavy hitters in the Kenyan scene. Pure street vibes, catchy hooks, and nonstop party energy straight from Nairobi.',
    price: 'KES 150',
    priceNum: 150,
    genre: 'Gengetone / Remix',
    image: '/Rieng.png',
    tag: 'Hot 🔥',
    bpm: '138 BPM',
    duration: '3:42',
    downloadUrl: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/Rieng.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvUmllbmcubXAzIiwiaWF0IjoxNzc3MzY0NjAwLCJleHAiOjE4MDg5MDA2MDB9.Rz943gAjETn2D7jYgCgdQhIwNaBEunAuS_3UAe-A9aI',
    fileName: 'Rieng-Remix.mp3',
  },
  {
    id: 2,
    title: 'Chupa Ku Chupa',
    feat: 'ONLYONEDELO',
    desc: 'A viral street anthem with raw Sheng lyrics and infectious rhythm. "Chupa Ku Chupa" captures the chaotic, fun energy of the youth and club scene perfectly.',
    price: 'KES 150',
    priceNum: 150,
    genre: 'Sheng / Street Banger',
    image: '/ChupaKuChupa.png',
    tag: 'Viral 📈',
    bpm: '112 BPM',
    duration: '2:58',
    downloadUrl: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/ChupaKuChupa.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvQ2h1cGFLdUNodXBhLm1wMyIsImlhdCI6MTc3NzM2NDU3NCwiZXhwIjoxODA4OTAwNTc0fQ.D45gKgDVrVHaS9ubFNZKXgiip493462euMsjszUSGPI',
    fileName: 'Chupa-Ku-Chupa.mp3',
  },
]

// Derived type for convenience
export type Song = typeof songsForSale[0]
