'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function VideoCard({
  title,
  videoId,
  views,
  badge,
}: {
  title: string
  videoId: string
  views: string
  badge: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => setAnimateIn(true), 10)
    } else {
      document.body.style.overflow = 'unset'
      setAnimateIn(false)
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setAnimateIn(false)
    setTimeout(() => setIsOpen(false), 400)
  }

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="group relative bg-[#050505] border border-white/5 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] transition-all duration-300 flex flex-col cursor-pointer"
      >
        <div className="relative aspect-video w-full overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
          <Image 
            src={thumbnailUrl} 
            alt={title} 
            fill 
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-14 h-14 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] transform transition-transform group-hover:scale-110">
              <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm z-20 shadow-lg">
            {badge}
          </div>
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-sm z-20 flex items-center gap-1 shadow-lg">
             <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 15.828v-7.656l6 3.828-6 3.828z"/></svg>
             {views}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1 transform transition-transform duration-300 bg-[#050505]">
          <h3 className="text-base font-bold text-gray-200 group-hover:text-white transition-colors leading-snug line-clamp-2">
            {title}
          </h3>
        </div>
      </div>

      {/* Cinematic Video Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${animateIn ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl"
            onClick={handleClose}
          />

          {/* Modal */}
          <div
            className={`relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(239,68,68,0.25)] border border-white/10 z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${animateIn ? 'scale-100 translate-y-0' : 'scale-90 translate-y-16'}`}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 bg-black/50 hover:bg-red-600 backdrop-blur-md rounded-full text-white flex items-center justify-center z-20 transition-all border border-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}

