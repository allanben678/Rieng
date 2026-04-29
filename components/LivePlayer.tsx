'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function LivePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [tick, setTick] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const [currentShow, setCurrentShow] = useState({ title: 'Kenyan Old School', host: 'RIENG Radio', image: '/Shows1.jpg' })
  const [mounted, setMounted] = useState(false)

  // Determine current show based on time of day
  useEffect(() => {
    setMounted(true)
    const hour = new Date().getHours() // 0-23
    
    if (hour >= 5 && hour < 10) {
      setCurrentShow({ title: 'Kenyan Old School', host: 'RIENG Radio', image: '/Shows1.jpg' })
    } else if (hour >= 10 && hour < 15) {
      setCurrentShow({ title: 'Gengetone / Arbantone', host: 'RIENG Radio', image: '/Studio.jpg' })
    } else if (hour >= 15 && hour < 19) {
      setCurrentShow({ title: 'Reggae / Dancehall', host: 'RIENG Radio', image: '/Group.jpg' })
    } else if (hour >= 19 && hour < 23) {
      setCurrentShow({ title: 'Underground Kenyan HipHop', host: 'RIENG Radio', image: '/Bura.jpg' })
    } else if (hour >= 23 || hour < 3) {
      setCurrentShow({ title: 'Kenyan RnB', host: 'RIENG Radio', image: '/TeloandBura.jpg' })
    } else {
      setCurrentShow({ title: 'Gospel Kenya', host: 'RIENG Radio', image: '/Shows1.jpg' })
    }
  }, [])

  // Creates the animated wave effect for the visualizer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setTick((prev) => prev + 1)
      }, 120) // Update every 120ms for smooth/fast bounce
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(err => {
          console.error("Audio playback failed:", err)
        })
      }
    }
  }

  return (
    <section id="live-player" className="bg-background py-8 md:py-12 border-b border-border shadow-2xl relative z-20 scroll-mt-24">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/audio.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvYXVkaW8ubXAzIiwiaWF0IjoxNzc3Mzc2ODMxLCJleHAiOjE4MDg5MTI4MzF9.UqjT_9KjcAVZt_zmLObcoQdGUDJUcQRgJjhW6ZvZCy4" preload="none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#0a0a0a] overflow-hidden rounded-[2rem] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Subtle background glow rings */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Show Art / Thumbnail with glow */}
            <div className="relative w-full md:w-64 aspect-square flex-shrink-0">
              <div className={`absolute inset-0 bg-primary/20 blur-2xl rounded-full transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className={`relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}>
                 <Image 
                    src={mounted ? currentShow.image : '/KarteloandMiracleBaby.jpg'}
                    alt="Live Show Art"
                    fill
                    className="object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-5">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                      <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,1)]"></span>
                      <span className="text-xs font-bold text-white tracking-widest uppercase">Live Now</span>
                    </div>
                 </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left w-full">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full mb-6 relative">
                <span className="absolute inset-0 bg-primary/20 animate-ping rounded-full opacity-50"></span>
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] relative z-10">Now Broadcasting</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase drop-shadow-lg">
                {mounted ? currentShow.title : 'Kenyan Old School'}
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-400 mb-8 font-medium">
                Hosted by <span className="text-white font-bold">{mounted ? currentShow.host : 'Kartelo'}</span>
              </p>
              
              {/* Custom Player Controls */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-black/40 p-4 rounded-3xl border border-white/5 backdrop-blur-xl">
                <button
                  onClick={togglePlay}
                  className={`relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 transform outline-none flex-shrink-0 focus:outline-none ${
                    isPlaying 
                      ? 'bg-primary text-white scale-100 shadow-[0_0_40px_rgba(255,107,53,0.5)]' 
                      : 'bg-white text-black hover:scale-105 hover:bg-gray-200 shadow-xl'
                  }`}
                >
                  {/* Play/Pause Icon */}
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                  ) : (
                    <svg className="w-10 h-10 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>

                <div className="flex-1 w-full flex items-center justify-between gap-1.5 h-16 px-4">
                   {/* Audio Visualizer Bars */}
                   {[...Array(40)].map((_, i) => {
                     // Generate a dynamic height based on sine wave + random jitter mapping
                     const waveHeight = isPlaying 
                        ? 20 + (Math.sin(tick * 0.5 + i * 0.3) * 30) + (Math.random() * 50) 
                        : 10 + (i % 2 === 0 ? 5 : 0); // Flat-ish state when paused
                     
                     // Keep bounded
                     const heightPct = Math.min(100, Math.max(10, waveHeight));

                     return (
                       <div 
                          key={i} 
                          className="w-full max-w-[6px] bg-primary rounded-full transition-all duration-[120ms] ease-out"
                          style={{
                            height: `${heightPct}%`,
                            opacity: isPlaying ? (0.6 + Math.random() * 0.4) : 0.2,
                          }}
                       ></div>
                     )
                   })}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
