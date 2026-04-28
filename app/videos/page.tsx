'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

// Data Sets
const mainHeroVideo = {
  id: '3bdhwSoeZ9g',
  title: 'Sing Ama Pilipili | Kartelo ft. Modesto',
  desc: 'One of RIENGFLIX’s absolute biggest public hits. A wild Pilipili-style studio episode with Kartelo and Modesto that takes zero prisoners and pushes the boundaries of raw radio.',
  badge: 'Blockbuster Hit',
  image: '/VidsHero.png' // <-- Download your image to the "public" folder and change this name to match (e.g., '/my-hero-pic.jpg')
}

const theSeriesVideos = [
  {
    id: 'OUFm3s1wn48',
    title: 'ANSWER AMA PILIPILI | Miracle Baby in Tears',
    desc: 'A high-performing RIENG Radio episode built around the answer-or-bite format.',
    duration: '22:15'
  },
  {
    id: 'SlagKsO_xAU',
    title: 'MISTARI AMA PILIPILI | Kartelo vs. Miracle Baby',
    desc: 'Legendary installment focusing strictly on song lyrics. One of the most watched sessions.',
    duration: '18:40'
  },
  {
    id: 'DrdbQ1I-aIA',
    title: 'Rieng Radio Reunion | How Big Dreams Die',
    desc: 'Reunion-style episode with the core crew; an intensely strong returning format.',
    duration: '45:10'
  },
  {
    id: '-DMoaDCixNo',
    title: 'Rieng Radio Reggae Session Ep 1 | Mc Shalkido',
    desc: 'The reggae session video that cements the brand’s culture-heavy reputation.',
    duration: '1:10:05'
  }
]

const theSeriesRow2 = [
  {
    id: 'yaiNt80SjiM',
    title: '"Miracle Baby Aliteka Karao" | Police Brutality',
    desc: 'A raw, honest podcast episode where Kartelo and Miracle Baby tackle the serious issue of police brutality in the streets.',
    duration: '69K Views'
  },
  {
    id: 'M9tIVvCgowg',
    title: '"Kuimpress Madame Ni Ngumu" | Heartbreaks',
    desc: 'Kartelo and Modesto discuss relationships, heartbreaks, and the difficulties of navigating romance in the city.',
    duration: '65K Views'
  },
  {
    id: 'DrdbQ1I-aIA',
    title: 'Rieng Radio Reunion | How Big Dreams Die',
    desc: 'A massive milestone episode featuring the core trio reuniting to speak frankly about the struggles of the entertainment industry.',
    duration: '107K Views'
  },
  {
    id: 'JeFwy18F1mA',
    title: 'Reggae Session Vol. 2 | MC Shalkido & DJ C4',
    desc: 'The second installment of their successful live mix series. A heavy Reggae and Dancehall set curated by DJ C4.',
    duration: '34K Views'
  }
]

const socialDrops = [
  {
    platform: 'YouTube',
    videoId: 'q5KpAN3Wg0s',
    title: 'DRYSPELL SI FUNNY',
    desc: 'A classic, honest, and hilarious conversation episode featuring Modesto and Kartelo getting real about street life.',
    image: 'https://img.youtube.com/vi/q5KpAN3Wg0s/hqdefault.jpg',
    color: 'bg-red-600',
    aspect: 'aspect-[4/5]'
  },
  {
    platform: 'Facebook',
    title: 'Basic Needs Za Kayole',
    desc: 'Branded social video post tied directly to Kartelo and Modesto.',
    url: 'https://www.facebook.com/karteloofficialke/videos/1152025615168295/',
    image: '/KarteloandMiracleBaby.jpg',
    color: 'bg-blue-600',
    aspect: 'aspect-square'
  },
  {
    platform: 'YouTube',
    videoId: 'v9Nor4dkT0M',
    title: 'Pilipili Primary School Edition',
    desc: 'Another massive spin-off of their famous Pilipili challenge, this time doing primary school trivia. High comedy value.',
    image: 'https://img.youtube.com/vi/v9Nor4dkT0M/hqdefault.jpg',
    color: 'bg-red-600',
    aspect: 'aspect-[4/5]'
  },
  {
    platform: 'Facebook',
    title: 'Tuko na episode mpya ya RIENG RADIO',
    desc: 'Promo post pushing the new RIENG Radio episodes out to the public.',
    url: 'https://www.facebook.com/karteloofficialke/posts/462573182194892/',
    image: '/Studio.jpg',
    color: 'bg-blue-600',
    aspect: 'aspect-square'
  },
  {
    platform: 'YouTube',
    videoId: '5iJXQA0JP28',
    title: 'JUA SHENG Episode 2',
    desc: 'A bite-sized segment testing modern Nairobi slang. Pure street culture and extremely fast-paced.',
    image: 'https://img.youtube.com/vi/5iJXQA0JP28/hqdefault.jpg',
    color: 'bg-red-600',
    aspect: 'aspect-[4/5]'
  }
]

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => setAnimateIn(true), 10)
    } else {
      document.body.style.overflow = 'unset'
      setAnimateIn(false)
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [activeVideo])

  const handleClose = () => {
    setAnimateIn(false)
    setTimeout(() => setActiveVideo(null), 400)
  }

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-red-500 selection:text-white">
      <Navbar />

      {/* 1. Massive Blockbuster Hero Section */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-end overflow-hidden group cursor-pointer" onClick={() => setActiveVideo(mainHeroVideo.id)}>
         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-1000 z-10 mix-blend-overlay pointer-events-none"></div>
         <Image 
           src={mainHeroVideo.image || `https://img.youtube.com/vi/${mainHeroVideo.id}/hqdefault.jpg`}
           alt={mainHeroVideo.title}
           fill
           unoptimized
           priority
           className="object-cover transform transition-transform duration-[20s] group-hover:scale-110"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent z-10 pointer-events-none opacity-80"></div>

         <div className="relative z-20 pointer-events-none w-full p-6 pt-24 md:p-12 lg:p-20 flex flex-col justify-end">
            <div className="max-w-3xl transform transition-transform duration-700 group-hover:-translate-y-4">
              <span className="inline-block bg-red-600 text-white font-black text-[10px] sm:text-xs px-3 py-1 uppercase tracking-[0.2em] mb-4 shadow-[0_0_30px_rgba(220,38,38,0.8)] border border-red-500">
                {mainHeroVideo.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight mb-4 pt-1 pb-2">
                Sing Ama<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 italic pr-6 inline-block">Pilipili</span>
              </h1>
              <p className="text-sm sm:text-base md:text-xl text-gray-300 font-medium max-w-2xl mb-6 line-clamp-3 md:line-clamp-none border-l-[3px] border-red-500 pl-4 md:pl-6">
                {mainHeroVideo.desc}
              </p>
              <button className="flex items-center gap-3 bg-white text-black hover:bg-red-600 hover:text-white transition-colors duration-300 px-6 py-3 md:px-8 md:py-4 rounded-full font-black uppercase tracking-widest pointer-events-auto text-xs md:text-sm group/btn">
                 <div className="w-8 h-8 md:w-10 md:h-10 bg-black text-white group-hover/btn:bg-white group-hover/btn:text-red-500 rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 md:w-5 md:h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 </div>
                 Play Episode
              </button>
            </div>
         </div>
      </section>

      {/* 2. Dual Horizontal Filmstrips / The Series */}
      <section className="py-24 relative z-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-red-500/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 z-0"></div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10 mb-12">
          <div className="flex items-end justify-between border-b border-white/10 pb-6">
             <div>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">The <span className="italic text-red-500 pr-4">Series</span></h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs md:text-sm mt-3 bg-white/5 inline-block px-3 py-1 border border-white/10 rounded">Rieng Radio Originals</p>
             </div>
             <span className="hidden md:block text-white/30 font-black uppercase tracking-[0.2em] animate-pulse">Now Streaming &rarr;</span>
          </div>
        </div>

        {/* Row 1: Marquee Left */}
        <div className="relative w-full flex overflow-hidden mb-6 sm:mb-8">
           <div className="marquee-left flex items-center min-w-max gap-6 sm:gap-8 px-3">
             {[...theSeriesVideos, ...theSeriesVideos, ...theSeriesVideos].map((vid, idx) => (
               <div 
                 key={`r1-${idx}`} 
                 onClick={() => setActiveVideo(vid.id)}
                 className="relative w-[320px] sm:w-[450px] md:w-[500px] aspect-video flex-shrink-0 rounded-3xl overflow-hidden group cursor-pointer border border-white/10 bg-black shadow-2xl hover:border-red-500/50 transition-colors"
               >
                  <Image 
                    src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                    alt={vid.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent mix-blend-overlay"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#050505] to-transparent">
                     <span className="bg-red-500/20 border border-red-500/50 text-red-500 text-[10px] uppercase font-black tracking-[0.2em] px-3 py-1.5 rounded-sm inline-block mb-4 backdrop-blur-md shadow-xl">
                       {vid.duration}
                     </span>
                     <h3 className="text-2xl font-bold text-white leading-snug line-clamp-2 md:line-clamp-1 group-hover:text-red-500 transition-colors uppercase tracking-tight">{vid.title}</h3>
                  </div>
                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                     <div className="w-20 h-20 bg-red-600/90 backdrop-blur-md rounded-full shadow-[0_0_50px_rgba(220,38,38,0.8)] flex items-center justify-center text-white border border-red-400/50">
                       <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                     </div>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Row 2: Marquee Right */}
        <div className="relative w-full flex overflow-hidden">
           <div className="marquee-right flex items-center min-w-max gap-6 sm:gap-8 px-3">
             {[...theSeriesRow2, ...theSeriesRow2, ...theSeriesRow2].map((vid, idx) => (
               <div 
                 key={`r2-${idx}`} 
                 onClick={() => setActiveVideo(vid.id)}
                 className="relative w-[320px] sm:w-[450px] md:w-[500px] aspect-video flex-shrink-0 rounded-3xl overflow-hidden group cursor-pointer border border-white/10 bg-black shadow-2xl hover:border-red-500/50 transition-colors"
               >
                  <Image 
                    src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                    alt={vid.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent mix-blend-overlay"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#050505] to-transparent">
                     <span className="bg-red-500/20 border border-red-500/50 text-red-500 text-[10px] uppercase font-black tracking-[0.2em] px-3 py-1.5 rounded-sm inline-block mb-4 backdrop-blur-md shadow-xl">
                       {vid.duration}
                     </span>
                     <h3 className="text-2xl font-bold text-white leading-snug line-clamp-2 md:line-clamp-1 group-hover:text-red-500 transition-colors uppercase tracking-tight">{vid.title}</h3>
                  </div>
                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                     <div className="w-20 h-20 bg-red-600/90 backdrop-blur-md rounded-full shadow-[0_0_50px_rgba(220,38,38,0.8)] flex items-center justify-center text-white border border-red-400/50">
                       <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                     </div>
                  </div>
               </div>
             ))}
           </div>
        </div>

      </section>

      {/* 3. The Digital Culture Vault (Masonry Layout) */}
      <section className="py-24 relative overflow-hidden bg-[#030303]">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px' }}></div>
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">
          
          <div className="mb-16 text-center max-w-4xl mx-auto border-t border-white/5 pt-20">
             <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 relative inline-block">
               The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500 italic pr-4">Streets</span>
             </h2>
             <p className="text-gray-400 font-bold md:text-xl border-l-[4px] border-blue-500 pl-6 text-left inline-block max-w-2xl bg-white/5 p-6 border-r border-y rounded-r-3xl">Raw untethered cuts straight from the timeline. Everything from viral TikTok challenges to behind the scenes studio chaos on Facebook and Instagram.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 auto-rows-auto">
            {socialDrops.map((drop, idx) => (
              <div 
                key={idx} 
                onClick={() => drop.videoId ? setActiveVideo(drop.videoId) : window.open(drop.url, '_blank')}
                className={`group relative overflow-hidden rounded-[2.5rem] ${drop.aspect} flex flex-col justify-end p-8 md:p-10 border border-white/10 hover:border-white/30 transition-all duration-500 shadow-2xl hover:-translate-y-4 cursor-pointer bg-black`}
              >
                {/* Embedded Image Background */}
                <Image 
                  src={drop.image}
                  alt={drop.title}
                  fill
                  unoptimized
                  className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 mix-blend-overlay pointer-events-none"
                />

                {/* Fallback pattern bg */}
                <div className={`absolute inset-0 ${drop.color} opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-10 pointer-events-none"></div>
                
                {/* Animated tech ring background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square border border-white/5 rounded-full group-hover:scale-110 transition-transform duration-[3s] pointer-events-none z-10"></div>

                <div className="relative z-20 pointer-events-none">
                   <div className="flex items-center gap-3 mb-6">
                     <span className={`w-3 h-3 rounded-full ${drop.color} shadow-[0_0_15px_currentColor] animate-pulse`}></span>
                     <span className="font-black text-white uppercase tracking-[0.2em] text-xs opacity-80 backdrop-blur border border-white/10 px-3 py-1 rounded">
                        {drop.platform === 'YouTube' ? 'Watch Episode' : `Watch on ${drop.platform}`}
                     </span>
                   </div>
                   <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-[1.1] uppercase tracking-tight group-hover:text-red-500 transition-all">{drop.title}</h3>
                   <p className="text-gray-400 text-sm md:text-base font-medium line-clamp-3">{drop.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Reusable YouTube Video Modal */}
      {activeVideo && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl" 
            onClick={handleClose}
          ></div>
          <div className={`relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_150px_rgba(220,38,38,0.2)] border border-white/10 z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${animateIn ? 'scale-100 translate-y-0' : 'scale-90 translate-y-16'}`}>
             <button 
                onClick={handleClose}
                className="absolute -top-16 right-0 md:top-6 md:right-6 w-14 h-14 bg-red-600/50 hover:bg-red-600 backdrop-blur-md rounded-full text-white flex items-center justify-center z-50 transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-500/50"
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
             <iframe 
               src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`} 
               className="w-full h-full"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             ></iframe>
          </div>
        </div>
      )}

      {/* Global override so horizontal scrollbar disappears strictly for the slider but mouse can still target it easily */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <Footer />
    </main>
  )
}
