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
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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

      {/* Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10 md:p-10">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-5xl bg-[#050505] border border-white/10 shadow-[0_0_50px_rgba(239,68,68,0.2)] rounded-2xl overflow-hidden flex flex-col">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 md:top-4 md:right-4 text-white/70 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors z-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6 bg-[#050505] border-t border-white/5">
               <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight line-clamp-1">{title}</h3>
               <p className="text-red-500 font-bold text-sm tracking-widest uppercase mt-2">{views} Views • Rieng TV</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
