'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import PaymentModal from '@/components/PaymentModal'

// ─── For Sale ────────────────────────────────────────────────────────────────
const songsForSale = [
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
    fileName: 'Rieng-Remix.mp3'
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
    fileName: 'Chupa-Ku-Chupa.mp3'
  }
]

// ─── Album Reviews ────────────────────────────────────────────────────────────
const reviews = [
  {
    albumTitle: 'Victims of Madness 2.0',
    artist: 'Wakadinali',
    rating: '5.0',
    review: 'A relentless, high-octane sequel that doubles down on everything that made the original a cult classic. Wakadinali are untouchable right now.',
    genre: 'Drill / Gengetone',
    year: '2024'
  },
  {
    albumTitle: '40 & Four-Tune (EP)',
    artist: 'Sanaipei Tande',
    rating: '4.5',
    review: "A beautifully curated EP that showcases Sanaipei's vocal range and artistic maturity. Every track hits different. A timeless collection.",
    genre: 'Afro-Soul / R&B',
    year: '2024'
  },
  {
    albumTitle: 'To Whom It May Concern',
    artist: 'Nyashinski',
    rating: '5.0',
    review: 'Nyashinski delivers his most personal record yet. Layers of introspection, melody and sharp lyricism make this unmissable from start to finish.',
    genre: 'Afropop / Hip-Hop',
    year: '2024'
  },
]

// ─── Genres Ticker ────────────────────────────────────────────────────────────
const genreTags = ['Gengetone', 'Drill', 'Bongo', 'Afrobeats', 'Reggae', 'Dancehall', 'Sheng', 'Arbantone', 'R&B', 'Hip-Hop', 'Afro-Soul', 'Trap']

// ─── Animated Counter Hook ────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const step = target / (duration / 16)
        let current = 0
        const timer = setInterval(() => {
          current += step
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

// ─── Stat Card Component ──────────────────────────────────────────────────────
function StatCard({ value, suffix, label, color }: { value: number; suffix: string; label: string; color: string }) {
  const { count, ref } = useCounter(value)
  return (
    <div ref={ref} className={`group relative bg-[#080808] border border-white/5 rounded-[1.5rem] p-8 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,107,53,0.08)]`}>
      <div className={`absolute top-0 right-0 w-32 h-32 ${color} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity rounded-full pointer-events-none`}></div>
      <p className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-2">
        {count.toLocaleString()}<span className="text-primary">{suffix}</span>
      </p>
      <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">{label}</p>
    </div>
  )
}

// ─── Waveform Bar ──────────────────────────────────────────────────────────────
function WaveformBars() {
  return (
    <div className="flex items-end gap-[3px] h-8">
      {[3,6,9,5,8,4,10,7,3,9,6,4,8,5,10,3,7,9,4,6].map((h, i) => (
        <div
          key={i}
          className="w-1 bg-primary rounded-full opacity-70"
          style={{
            height: `${h * 10}%`,
            animation: `wave ${0.6 + (i % 5) * 0.15}s ease-in-out ${i * 0.05}s infinite alternate`
          }}
        />
      ))}
    </div>
  )
}

export default function AlbumsPage() {
  const [hoveredSong, setHoveredSong] = useState<number | null>(null)
  const [selectedSong, setSelectedSong] = useState<typeof songsForSale[0] | null>(null)

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 blur-[140px] rounded-full pointer-events-none"></div>
        {/* Animated lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent w-full"
              style={{ top: `${20 + i * 20}%`, animation: `slideLine ${3 + i}s ease-in-out ${i * 0.5}s infinite alternate` }}></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-end">
            <div className="flex-1">
              <p className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-primary inline-block"></span>
                RIENG MUSIC STORE
              </p>
              <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
                Albums<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 italic pr-4">&amp; Songs</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-medium border-l-4 border-primary pl-6">
                Expert breakdowns on the most important Kenyan projects dropping right now — plus exclusive RIENG tracks you can own.
              </p>
            </div>
            {/* Live waveform visual */}
            <div className="flex flex-col items-end gap-4">
              <div className="bg-[#080808] border border-white/5 rounded-2xl px-6 py-5 flex items-center gap-5">
                <div className="flex flex-col">
                  <span className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">Now Streaming</span>
                  <span className="text-white font-black text-sm">Rieng Radio Live</span>
                </div>
                <WaveformBars />
              </div>
              <div className="flex gap-3">
                <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">2 Tracks Available</span>
                <span className="bg-white/5 border border-white/10 text-white/50 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">3 Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GENRE TICKER ── */}
      <div className="w-full overflow-hidden bg-[#080808] border-y border-white/5 py-4 flex whitespace-nowrap">
        <div className="marquee-left flex items-center min-w-max">
          {[...genreTags, ...genreTags, ...genreTags, ...genreTags].map((tag, i) => (
            <span key={i} className="text-white/30 font-black uppercase tracking-[0.3em] text-xs mx-6 flex items-center gap-6">
              {tag} <span className="w-1.5 h-1.5 bg-primary/50 rounded-full inline-block"></span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard value={24} suffix="K+" label="Monthly Listeners" color="bg-primary" />
            <StatCard value={2} suffix="" label="Exclusive Tracks" color="bg-primary" />
            <StatCard value={3} suffix="" label="Album Reviews" color="bg-orange-500" />
          </div>
        </div>
      </section>

      {/* ── BUY SONGS ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="flex items-end justify-between mb-16 border-b border-white/5 pb-10">
            <div>
              <span className="text-primary font-black uppercase tracking-[0.4em] text-xs block mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-primary inline-block"></span>
                Exclusive Drops
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Buy <span className="italic text-primary pr-2">Tracks</span></h2>
            </div>
            <div className="hidden md:flex flex-col items-end gap-2">
              <span className="text-white/20 font-black uppercase tracking-widest text-xs border border-white/10 px-4 py-2">{songsForSale.length} Available</span>
              <span className="text-white/10 text-xs font-bold">M-Pesa integration coming soon</span>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {songsForSale.map((song, idx) => (
              <div
                key={song.id}
                onMouseEnter={() => setHoveredSong(song.id)}
                onMouseLeave={() => setHoveredSong(null)}
                className="group relative flex flex-col md:flex-row border border-white/8 hover:border-primary/40 rounded-[2rem] overflow-hidden transition-all duration-700 hover:shadow-[0_0_80px_rgba(255,107,53,0.12)] bg-[#080808]"
              >
                {/* Left image */}
                <div className="relative w-full md:w-72 lg:w-96 aspect-[4/3] md:aspect-auto flex-shrink-0 overflow-hidden">
                  <Image
                    src={song.image}
                    alt={song.title}
                    fill
                    className="object-cover transition-transform duration-[3s] group-hover:scale-115 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080808] hidden md:block pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent md:hidden pointer-events-none"></div>
                  <span className="absolute top-5 left-5 bg-primary text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest shadow-[0_0_20px_rgba(255,107,53,0.5)]">
                    {song.tag}
                  </span>
                  <span className="absolute bottom-4 right-4 text-[90px] font-black text-white/5 leading-none select-none pointer-events-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Right info */}
                <div className="flex flex-col justify-between flex-1 p-8 md:p-10 lg:p-14">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                      <span className="text-primary/60 font-bold uppercase tracking-[0.3em] text-[10px] border border-primary/20 px-3 py-1 rounded-full">{song.genre}</span>
                      <span className="text-white/20 font-bold uppercase tracking-[0.3em] text-[10px] border border-white/10 px-3 py-1 rounded-full">{song.bpm}</span>
                      <span className="text-white/20 font-bold uppercase tracking-[0.3em] text-[10px] border border-white/10 px-3 py-1 rounded-full">{song.duration}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
                      {song.title}
                    </h3>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mb-8">{song.feat}</p>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl border-l-[3px] border-white/10 group-hover:border-primary/40 pl-5 transition-colors duration-300">
                      {song.desc}
                    </p>
                  </div>

                  {/* Animated waveform when hovered */}
                  <div className={`mt-6 transition-all duration-500 ${hoveredSong === song.id ? 'opacity-100 h-10' : 'opacity-0 h-0 overflow-hidden'}`}>
                    <WaveformBars />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-10 pt-8 border-t border-white/5">
                    <div>
                      <p className="text-white/30 font-bold uppercase tracking-widest text-[10px] mb-1">Price</p>
                      <p className="text-4xl md:text-5xl font-black text-white tracking-tighter group-hover:text-primary transition-colors duration-700">{song.price}</p>
                    </div>
                    <button
                      onClick={() => setSelectedSong(song)}
                      className="relative bg-primary hover:bg-white text-white hover:text-black transition-all duration-300 px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm flex items-center gap-3 shadow-[0_0_30px_rgba(255,107,53,0.2)] hover:shadow-[0_0_40px_rgba(255,107,53,0.4)]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBMIT YOUR MUSIC CTA ── */}
      <section className="py-20 relative overflow-hidden bg-[#030303] border-y border-white/5">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/3 rounded-full animate-[spin_30s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/5 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-xs block mb-6">Artists / Producers</span>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
            Want Your<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 italic pr-4">Track Here?</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            We're selectively opening the store to Kenyan independent artists. If your sound is real, raw, and Nairobi-bred — slide into our DMs and let's talk distribution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="mailto:music@riengradio.co.ke"
              className="group bg-primary hover:bg-white text-white hover:text-black transition-all duration-300 px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm flex items-center gap-3 shadow-[0_0_30px_rgba(255,107,53,0.3)]"
            >
              <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Submit Your Track
            </a>
            <span className="text-white/20 font-bold text-sm">or find us on Instagram @riengradio</span>
          </div>
        </div>
      </section>

      {/* ── ALBUM REVIEWS ── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="flex items-end justify-between mb-16 border-b border-white/5 pb-10">
            <div>
              <span className="text-primary font-black uppercase tracking-[0.4em] text-xs block mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-primary inline-block"></span>
                The Breakdown
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">Album <span className="italic text-primary pr-2">Reviews</span></h2>
            </div>
            <p className="hidden md:block text-gray-500 font-bold text-sm max-w-xs text-right leading-relaxed">Expert breakdowns on the most important Kenyan projects dropping right now.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="group relative bg-[#050505] hover:bg-[#080808] transition-all duration-500 p-8 md:p-10 lg:p-12 flex flex-col justify-between gap-8 cursor-default"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-primary/40 font-black uppercase tracking-[0.3em] text-[9px]">{rev.genre}</span>
                    <span className="text-white/10 font-black text-xs">{rev.year}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-[1.1] mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {rev.albumTitle}
                  </h3>
                  <p className="text-gray-500 font-bold text-xs uppercase tracking-[0.2em] mb-6">{rev.artist}</p>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 italic">"{rev.review}"</p>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5 group-hover:border-primary/10 transition-colors duration-500">
                  <span className="text-white/20 font-black text-xs uppercase tracking-widest">RIENG Rating</span>
                  <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                    <span className="text-white font-black text-sm">{rev.rating}<span className="text-gray-500 font-bold">/5</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Extra review teaser */}
          <div className="mt-6 border border-white/5 rounded-[2rem] p-8 md:p-10 flex items-center justify-between gap-6 bg-[#080808] group hover:border-primary/20 transition-all duration-500">
            <div>
              <p className="text-white/20 font-black uppercase tracking-widest text-xs mb-2">More Reviews Dropping</p>
              <p className="text-white font-black text-2xl md:text-3xl uppercase tracking-tight">Coming This Week<span className="text-primary">.</span></p>
            </div>
            <div className="flex-shrink-0 w-14 h-14 rounded-full border border-white/10 group-hover:border-primary/40 flex items-center justify-center transition-colors duration-500">
              <svg className="w-6 h-6 text-white/20 group-hover:text-primary transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* ── PAYMENT MODAL ── */}
      <PaymentModal
        isOpen={!!selectedSong}
        onClose={() => setSelectedSong(null)}
        song={selectedSong}
      />

      {/* Keyframe Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wave {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
        @keyframes slideLine {
          from { opacity: 0.3; transform: translateX(-5%); }
          to   { opacity: 0.8; transform: translateX(5%); }
        }
      ` }} />

      <Footer />
    </main>
  )
}
