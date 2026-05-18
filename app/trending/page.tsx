'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

const trendingItems = [
  {
    id: '01',
    category: 'Music',
    title: 'Sean MMG ft. Khaligraph - Personality',
    link: 'https://www.youtube.com/watch?v=Z_wW2ywe04w',
    videoId: 'Z_wW2ywe04w',
    image: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/Sean_Ming.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvU2Vhbl9NaW5nLmpwZyIsImlhdCI6MTc3OTA4MDEwMCwiZXhwIjoxODEwNjE2MTAwfQ.43uPrestpCOyq7MjOppzoKL190MIO44Cs6FlzcQCf08',
    excerpt: 'Sean MMG and Khaligraph Jones deliver a hard-hitting street anthem packed with raw energy and sharp bars.',
    stats: 'Trending Now'
  },
  {
    id: '02',
    category: 'Music',
    title: 'Mejja ft. Fik Fameica - Siaka',
    link: 'https://youtu.be/hcAV2lxaT2E?si=0pRJNVFJth1N0T-M',
    videoId: 'hcAV2lxaT2E',
    image: '/Siaka2.png',
    excerpt: 'The biggest cross-border collaboration of the year. Mejja links up with Fik Fameica to deliver an absolute street anthem that has already taken over the airwaves in Kenya and Uganda.',
    stats: '1.2M Views'
  },
  {
    id: '03',
    category: 'Entertainment',
    title: 'Singer Naomi Kihuha’s $90 [Sh13K] grocery bill: What it buys in Kenya vs. U.S.',
    link: 'https://www.pulse.co.ke/entertainment',
    image: '/Naomi.jpg',
    excerpt: 'A viral breakdown of the cost of living that has the entire timeline debating. Naomi exposes the huge differences in purchasing power between continents.',
    stats: 'Read Time: 5 Min'
  },
  {
    id: '04',
    category: 'Creators',
    title: 'The cost of the gold rush: How TikTok is reshaping Kenya',
    link: 'https://www.pulse.co.ke/story/the-cost-of-the-gold-rush-how-tiktok-is-reshaping-kenya-2026042412282549816',
    image: '/Tiktok2.jpg',
    excerpt: 'TikTok is changing the economic landscape for young creatives in Kenya, but are the financial gains coming at a hidden cultural cost?',
    stats: 'Read Time: 6 Min'
  },
  {
    id: '05',
    category: 'Culture',
    title: 'Behind stage names, real identities powering Kenya\'s music scene',
    link: 'https://www.the-star.co.ke/sasa/entertainment/2026-04-20-behind-stage-names-real-identities-powering-kenyas-music-scene',
    image: '/Kaligraph.jpg',
    excerpt: 'From Gengetone groups to solo rap acts, we unpack the real names and untold origin stories of the artists running the local music industry right now.',
    stats: 'Read Time: 5 Min'
  }
]

export default function TrendingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('');
  const [animateIn, setAnimateIn] = useState(false);
  const topTrend = trendingItems[0];
  const restTrends = trendingItems.slice(1);

  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      document.body.style.overflow = 'unset';
      setAnimateIn(false);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isVideoModalOpen]);

  const handleOpenModal = (videoId: string, title: string) => {
    setActiveVideoId(videoId);
    setActiveVideoTitle(title);
    setIsVideoModalOpen(true);
  };

  const handleCloseModal = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setIsVideoModalOpen(false);
      setActiveVideoId(null);
      setActiveVideoTitle('');
    }, 400);
  };

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Massive Hero Section for #1 Trend */}
      <section className="relative pt-8 md:pt-10 pb-12 md:pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Context & Text */}
            <div className="flex-1 order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                 <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]">No. 1 Trending</span>
                 <span className="text-primary text-[10px] font-black px-3 py-1 uppercase tracking-widest border border-primary/30">{topTrend.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-[1.1] relative">
                {topTrend.title}
              </h1>
              <p className="text-base md:text-lg text-gray-400 font-medium mb-6 max-w-2xl border-l-[6px] border-white/10 pl-6">
                {topTrend.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-6">
                <button 
                  onClick={() => topTrend.videoId ? handleOpenModal(topTrend.videoId, topTrend.title) : window.open(topTrend.link, '_blank')}
                  className="bg-primary hover:bg-white text-white hover:text-black transition-all shadow-[0_0_20px_rgba(255,107,53,0.3)] font-black uppercase text-sm tracking-widest px-8 py-4 rounded-full flex items-center gap-2 w-max"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  {topTrend.videoId ? 'Watch Video' : 'Listen Now'}
                </button>
                <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">{topTrend.stats}</span>
              </div>
            </div>

            {/* Massive Hero Image */}
            <div className="flex-1 w-full order-1 lg:order-2">
              <div className="relative w-full aspect-square md:aspect-[5/4] lg:aspect-square">
                 <div className="absolute inset-0 bg-primary/30 blur-[100px] rounded-full scale-75 translate-y-10 z-0"></div>
                 <div className="absolute -inset-4 bg-gradient-to-tr from-white/5 to-transparent border border-white/10 rounded-[2.5rem] z-10 pointer-events-none mix-blend-overlay"></div>
                 <div className="relative w-full h-full rounded-3xl overflow-hidden z-20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                   <Image 
                     src={topTrend.image}
                     alt={topTrend.title}
                     fill
                     className="object-cover"
                     priority
                   />
                 </div>
                 {/* Decorative huge number */}
                 <div className="absolute -bottom-16 -left-8 md:-left-16 text-[150px] md:text-[250px] font-black text-white border-white/10 opacity-[0.03] leading-none z-0 pointer-events-none select-none">
                   01
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="w-full overflow-hidden bg-primary py-4 border-y border-white/10 flex whitespace-nowrap">
        <div className="marquee-left flex items-center min-w-max">
           {[...Array(8)].map((_, i) => (
             <span key={i} className="text-black font-black uppercase md:text-lg tracking-[0.3em] mx-6 flex items-center gap-6">
               HOT THIS WEEK <span className="w-2 h-2 bg-black rounded-full"></span> 
               RIENG CHARTS <span className="w-2 h-2 bg-black rounded-full"></span>
               VIRAL TOPICS <span className="w-2 h-2 bg-black rounded-full"></span>
             </span>
           ))}
        </div>
      </div>

      {/* The Hot List / Rows */}
      <section className="py-24 relative overflow-hidden bg-[#030303]">
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -mb-64 -ml-64"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-12 border-b border-white/5 pb-8 inline-block pr-12">The<br/><span className="text-primary italic">Viral List.</span></h2>
           
           <div className="flex flex-col">
             {restTrends.map((trend) => (
               trend.videoId ? (
               <button
                 key={trend.id}
                 onClick={() => handleOpenModal(trend.videoId!, trend.title)}
                 className="group flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 py-10 border-b border-white/5 hover:border-primary/30 transition-colors relative text-left w-full"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                 
                 {/* Large Number */}
                 <div className="text-5xl md:text-7xl font-black text-white/5 group-hover:text-primary/30 transition-colors pointer-events-none w-16 md:w-24 flex-shrink-0 relative z-10">
                   {trend.id}
                 </div>

                 {/* Image */}
                 <div className="relative w-full md:w-56 h-56 md:h-36 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 z-10 border border-white/5">
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay"></div>
                   <Image 
                     src={trend.image}
                     alt={trend.title}
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                 </div>

                 {/* Content */}
                 <div className="flex-1 md:pr-4 z-10">
                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-3 border border-primary/20 bg-primary/5 px-2 py-0.5 rounded-sm inline-block shadow-inner">{trend.category}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-200 group-hover:text-white transition-colors line-clamp-2 mb-3">
                      {trend.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-500 font-medium line-clamp-2 group-hover:text-gray-400 transition-colors">
                       {trend.excerpt}
                    </p>
                 </div>

                 {/* Play / Arrow */}
                 <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full border border-white/10 text-white/50 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-[0_0_25px_rgba(255,107,53,0.4)] transition-all duration-300 transform group-hover:scale-110 flex-shrink-0 z-10">
                   <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 </div>
               </button>
               ) : (
               <a 
                 key={trend.id} 
                 href={trend.link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 py-10 border-b border-white/5 hover:border-primary/30 transition-colors relative"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                 
                 {/* Large Number */}
                 <div className="text-5xl md:text-7xl font-black text-white/5 group-hover:text-primary/30 transition-colors pointer-events-none w-16 md:w-24 flex-shrink-0 relative z-10">
                   {trend.id}
                 </div>

                 {/* Image */}
                 <div className="relative w-full md:w-56 h-56 md:h-36 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 z-10 border border-white/5">
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay"></div>
                   <Image 
                     src={trend.image}
                     alt={trend.title}
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                 </div>

                 {/* Content */}
                 <div className="flex-1 md:pr-4 z-10">
                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-3 border border-primary/20 bg-primary/5 px-2 py-0.5 rounded-sm inline-block shadow-inner">{trend.category}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-200 group-hover:text-white transition-colors line-clamp-2 mb-3">
                      {trend.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-500 font-medium line-clamp-2 group-hover:text-gray-400 transition-colors">
                       {trend.excerpt}
                    </p>
                 </div>

                 {/* Action / Arrow */}
                 <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full border border-white/10 text-white/50 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-[0_0_25px_rgba(255,107,53,0.4)] transition-all duration-300 transform group-hover:scale-110 flex-shrink-0 z-10">
                   <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </div>
               </a>
               )
              ))}
           </div>
        </div>
      </section>

      {/* Video Modal Overlay */}
      {isVideoModalOpen && activeVideoId && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
          <div 
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl" 
            onClick={handleCloseModal}
          ></div>
          <div className={`relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,107,53,0.3)] border border-white/10 z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${animateIn ? 'scale-100 translate-y-0' : 'scale-90 translate-y-16'}`}>
             <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 bg-black/50 hover:bg-primary backdrop-blur-md rounded-full text-white flex items-center justify-center z-20 transition-all border border-white/10"
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
             <iframe 
               src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`} 
               title={activeVideoTitle}
               className="w-full h-full"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             ></iframe>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
