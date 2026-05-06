'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

const dailyShows = [
  {
    title: 'Kenyan Old School',
    host: 'RIENG Radio',
    schedule: 'Weekdays | 5:00 AM - 10:00 AM',
    description: 'Journey through the greatest hits from 2000s to 2004/5 Kenyan music. Featuring e Sir, Mr. Lenny, Kleptomaniax, and Dux Vultures.',
    image: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/shows/KenyanOldSchool.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvc2hvd3MvS2VueWFuT2xkU2Nob29sLmpwZyIsImlhdCI6MTc3NzUwODgwMSwiZXhwIjoxODA5MDQ0ODAxfQ.5FR3q4quQCmHSW1WyQ-x0YjE0M04o2sQt2zs4u3_Fa0',
    color: 'from-orange-500/20 to-transparent',
    features: ['e Sir', 'Mr. Lenny', 'Kleptomaniax', 'Dux Vultures']
  },
  {
    title: 'Gengetone / Arbantone',
    host: 'RIENG Radio',
    schedule: 'Weekdays | 10:00 AM - 3:00 PM',
    description: 'The hardest beats and hottest flows from the Gengetone and Arbantone scenes. Pure energy from Kenya&apos;s underground.',
    image: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/shows/Gengetone.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvc2hvd3MvR2VuZ2V0b25lLmpwZyIsImlhdCI6MTc3NzUwODgzNSwiZXhwIjoxODA5MDQ0ODM1fQ.edECFW-1vDOXHHpQ7emyRfNPyDjDnbOAD5sdKAHuUcI',
    color: 'from-red-500/20 to-transparent',
    features: ['Live Gengetone', 'New Drops', 'Beat Breakdowns']
  },
  {
    title: 'Reggae / Dancehall',
    host: 'RIENG Radio',
    schedule: 'Weekdays | 11:00 PM - 3:00 AM',
    description: 'Unwind with smooth reggae vibes and infectious dancehall rhythms. Island sounds dominate the airwaves.',
    image: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/UpdatedShows/Reggae.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvVXBkYXRlZFNob3dzL1JlZ2dhZS5qcGciLCJpYXQiOjE3Nzc2MTg3MDMsImV4cCI6MTgwOTE1NDcwM30.rcWa7oHOxsnZG_cO-6TTAwpPYr147JuCiF8Dk6Ie13s',
    color: 'from-purple-500/20 to-transparent',
    features: ['Reggae Classics', 'Dancehall Hits', 'Dubplates']
  },
  {
    title: 'Underground Kenyan HipHop',
    host: 'RIENG Radio',
    schedule: 'Weekdays | 7:00 PM - 11:00 PM',
    description: 'Featuring Ukoo Flani, Walanguzi, Katapila, Moroko Kalahari, Virusi Mbaya, Shrap, and Wakadinali Drill.',
    image: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/UpdatedShows/Underground.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvVXBkYXRlZFNob3dzL1VuZGVyZ3JvdW5kLmpwZyIsImlhdCI6MTc3NzYxODc3OSwiZXhwIjoxODA5MTU0Nzc5fQ.6lJzUQFJSgdjCajfBQFKmJXnzMgJURDJmUXkRV4Fd8E',
    color: 'from-green-500/20 to-transparent',
    features: ['Ukoo Flani', 'Walanguzi', 'Wakadinali Drill', 'Shrap']
  },
  {
    title: 'Kenyan RnB',
    host: 'RIENG Radio',
    schedule: 'Weekdays | 3:00 PM - 7:00 PM',
    description: 'Smooth Kenyan RnB featuring Bensoul, Nviiri, Otile Brown, Kodong Clan, Sauti Sol, and more.',
    image: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/UpdatedShows/RnB.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvVXBkYXRlZFNob3dzL1JuQi5qcGciLCJpYXQiOjE3Nzc2MTg3NTIsImV4cCI6MTgwOTE1NDc1Mn0.bECtwTIvCNZwGLHi2HHKkopAqJtoHXeTQ8MdtUijntE',
    color: 'from-blue-500/20 to-transparent',
    features: ['Bensoul', 'Nviiri', 'Otile Brown', 'Sauti Sol']
  },
  {
    title: 'Gospel Kenya',
    host: 'RIENG Radio',
    schedule: 'Sundays | All Day + Daily | 3:00 AM - 5:00 AM',
    description: 'Spiritual awakening with Kenya&apos;s finest gospel music. Start your day with uplifting messages and powerful melodies.',
    image: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/UpdatedShows/Gospel.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvVXBkYXRlZFNob3dzL0dvc3BlbC5qcGciLCJpYXQiOjE3Nzc2MTg2OTAsImV4cCI6MTgwOTE1NDY5MH0.FiCgYciSVoTbmjsZ039KJG8_hlbPa18hY7rl10hUzrw',
    color: 'from-yellow-500/20 to-transparent',
    features: ['Gospel Hits', 'Spiritual Messages', 'Uplifting Vibes']
  },
  {
    title: 'SPORTS SHOW',
    host: 'Bura & Swat',
    schedule: 'Saturday | 8:00 AM - 12:00 PM',
    description: 'The ultimate sports breakdown. Hot takes, live analysis, and all the weekend action from local and international sports.',
    image: '/Bura.jpg',
    color: 'from-green-500/20 to-transparent',
    features: ['Live Sports Analysis', 'Athlete Interviews', 'Fantasy Football Talk']
  },
  {
    title: 'POLITICS SHOW',
    host: 'Boneye',
    schedule: 'Saturday | 3:00 PM - 7:00 PM',
    description: 'In-depth political interviews with leading politicians and presidential aspirants. No questions off-limits.',
    image: '/TeloandBura.jpg',
    color: 'from-blue-500/20 to-transparent',
    features: ['Political Interviews', 'Policy Discussions', 'Election Coverage']
  },
]

export default function ShowsPage() {
  const [currentHour, setCurrentHour] = useState(12)
  const [currentDay, setCurrentDay] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const now = new Date()
    setCurrentHour(now.getHours())
    setCurrentDay(now.getDay())
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Fixed Parallax Background */}
      <div className="fixed top-0 left-0 w-full h-[50vh] z-0 pointer-events-none">
        <Image 
          src="/Banner.jpg"
          alt="Parallax Background"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505]"></div>
      </div>

      {/* Massive Cinematic Header */}
      <section className="relative pt-24 pb-16 border-b border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 relative">
             The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 italic pr-6 inline-block drop-shadow-2xl">Line-Up</span>
           </h1>
           <p className="text-xl text-gray-300 font-medium max-w-2xl border-l-[6px] border-primary pl-6 shadow-2xl">
             No generic playlists. No automated loops. Just pure, unadulterated Kenyan culture broadcasted live from our studios 24/7.
           </p>
        </div>
      </section>

      {/* Shows List - Full Width Horizontal Rows Instead of Cards */}
      <section className="relative z-20 bg-[#050505]">
        {dailyShows.map((show, idx) => {
          
          let isLive = false;
          if (mounted) {
            if (show.title === 'Kenyan Old School' && currentHour >= 5 && currentHour < 10) isLive = true;
            if (show.title === 'Gengetone / Arbantone' && currentHour >= 10 && currentHour < 15) isLive = true;
            if (show.title === 'Reggae / Dancehall' && (currentHour >= 23 || currentHour < 3)) isLive = true;
            if (show.title === 'Underground Kenyan HipHop' && currentHour >= 19 && currentHour < 23) isLive = true;
            if (show.title === 'Kenyan RnB' && currentHour >= 15 && currentHour < 19) isLive = true;
            if (show.title === 'Gospel Kenya' && (currentDay === 0 || (currentHour >= 3 && currentHour < 5))) isLive = true;
            if (show.title === 'SPORTS SHOW' && currentDay === 6 && currentHour >= 8 && currentHour < 12) isLive = true;
            if (show.title === 'POLITICS SHOW' && currentDay === 6 && currentHour >= 15 && currentHour < 19) isLive = true;
          }

          return (
            <div key={idx} className={`relative border-b border-white/5 ${idx % 2 === 0 ? 'bg-[#080808]' : 'bg-[#050505]'}`}>
              {/* Dynamic subtle background glow per show */}
              <div className={`absolute inset-0 bg-gradient-to-r ${show.color} opacity-30 pointer-events-none hidden md:block`}></div>
              
              <div className="max-w-7xl auto mx-auto flex flex-col lg:flex-row min-h-[600px]">
                
               {/* Left/Right Text Content */}
                <div className={`flex-1 p-8 md:p-16 lg:p-24 flex flex-col justify-center relative z-10 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  {isLive && (
                    <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-1.5 rounded-full mb-8 w-max relative">
                       <span className="absolute inset-0 bg-red-500/20 rounded-full animate-ping opacity-60"></span>
                       <span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)]"></span>
                       <span className="text-xs font-black uppercase tracking-[0.2em] relative z-10">Live On Air</span>
                    </div>
                  )}
                  {!isLive && (
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-400 px-4 py-1.5 rounded-full mb-8 w-max">
                       <span className="text-xs font-black uppercase tracking-[0.2em]">{show.schedule}</span>
                    </div>
                  )}
                  
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">{show.title}</h2>
                  <p className="text-primary font-bold tracking-widest uppercase mb-8 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 14.5c-2.481 0-4.5-2.019-4.5-4.5S9.519 7.5 12 7.5s4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5zm0-7.5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z"/></svg>
                    Hosted by {show.host}
                  </p>
                  
                  <p className="text-gray-400 md:text-lg leading-relaxed mb-10 max-w-xl">
                    {show.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                     {show.features.map((feature, fIdx) => (
                       <span key={fIdx} className="bg-white/5 px-4 py-2 rounded-sm text-xs font-bold text-gray-300 uppercase tracking-[0.1em] border border-white/5 shadow-inner">
                         {feature}
                       </span>
                     ))}
                  </div>
                </div>

                {/* Left/Right Image Content */}
                <div className={`flex-1 relative min-h-[400px] overflow-hidden group ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-overlay"></div>
                   <Image 
                     src={show.image}
                     alt={show.title}
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                   />
                   {/* Gradient fade to seamlessly blend image edge with text side */}
                   <div className={`absolute inset-0 z-10 pointer-events-none ${idx % 2 !== 0 ? 'bg-gradient-to-t lg:bg-gradient-to-r' : 'bg-gradient-to-t lg:bg-gradient-to-l'} from-[#050505] via-transparent to-transparent opacity-100`}></div>
                </div>

              </div>
            </div>
          )
        })}
      </section>

      {/* Guest Mixes Banner Section */}
      <section className="bg-primary relative overflow-hidden py-24 md:py-32">
         {/* Dotted dark overlay pattern */}
         <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(#000 3px, transparent 3px)', backgroundSize: '24px 24px' }}></div>
         <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl">
               <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-none">Weekend <br/><span className="text-black italic">Takeovers.</span></h2>
               <p className="text-black font-black uppercase tracking-widest md:text-xl mb-10 border-l-4 border-black pl-5">Every weekend we hand the keys to the studio over to Kenya's hardest underground DJs for unfiltered, 4-hour live sets.</p>
               <a href="mailto:shows@riengradio.co.ke" className="inline-block bg-black hover:bg-white text-white hover:text-black font-black uppercase tracking-widest px-10 py-5 rounded-full transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-4 w-max">
                 Apply for a Guest Mix <span className="text-2xl">→</span>
               </a>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  )
}
