import Link from 'next/link'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import LivePlayer from '@/components/LivePlayer'
import ShowCard from '@/components/ShowCard'
import MediaCard from '@/components/MediaCard'
import VideoCard from '@/components/VideoCard'
import ReviewCard from '@/components/ReviewCard'
import BuySongPromo from '@/components/BuySongPromo'
import SectionTitle from '@/components/SectionTitle'
import Footer from '@/components/Footer'
import PartnersSlider from '@/components/PartnersSlider'

const dailyShows = [
  {
    title: 'Kenyan Old School',
    host: 'RIENG Radio',
    schedule: 'Daily | 5:00 AM - 10:00 AM',
    description: 'Journey through the greatest hits from 2000s to 2004/5 Kenyan music. Featuring e Sir, Mr. Lenny, Kleptomaniax, and Dux Vultures.',
    image: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/shows/KenyanOldSchool.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvc2hvd3MvS2VueWFuT2xkU2Nob29sLmpwZyIsImlhdCI6MTc3NzUwODgwMSwiZXhwIjoxODA5MDQ0ODAxfQ.5FR3q4quQCmHSW1WyQ-x0YjE0M04o2sQt2zs4u3_Fa0',
  },
  {
    title: 'Gengetone / Arbantone',
    host: 'RIENG Radio',
    schedule: 'Daily | 10:00 AM - 3:00 PM',
    description: 'The hardest beats and hottest flows from the Gengetone and Arbantone scenes. Pure energy from Kenya&apos;s underground.',
    image: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/shows/Gengetone.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvc2hvd3MvR2VuZ2V0b25lLmpwZyIsImlhdCI6MTc3NzUwODgzNSwiZXhwIjoxODA5MDQ0ODM1fQ.edECFW-1vDOXHHpQ7emyRfNPyDjDnbOAD5sdKAHuUcI',
  },
  {
    title: 'Reggae / Dancehall',
    host: 'RIENG Radio',
    schedule: 'Daily | 3:00 PM - 7:00 PM',
    description: 'Unwind with smooth reggae vibes and infectious dancehall rhythms. Island sounds dominate the airwaves.',
    image: 'https://dkmdvhzdixefykoojhgt.supabase.co/storage/v1/object/sign/Mp3/shows/Raggae.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NTUxYTk2MC04YjVhLTRkNjEtOTJkMS1jMjVkNWNlY2IxMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNcDMvc2hvd3MvUmFnZ2FlLmpwZyIsImlhdCI6MTc3NzUwODg2MywiZXhwIjoxODA5MDQ0ODYzfQ.SeGa4aX2eKNLyVjBQk-PmFDK-0ICQQDBv6dlbJe096I',
  },
]

const trendingContent = [
  {
    category: 'Music',
    title: 'Mejja ft. Fik Fameica - Siaka [Official Video]',
    link: 'https://youtu.be/hcAV2lxaT2E?si=0pRJNVFJth1N0T-M',
    image: '/Siaka.jpg',
  },
  {
    category: 'Entertainment',
    title: 'Singer Naomi Kihuha’s $90 [Sh13K] grocery bill: What it buys in Kenya vs. U.S.',
    link: 'https://www.pulse.co.ke/entertainment',
    image: '/Naomi.jpg',
  },
  {
    category: 'Creators',
    title: 'From Nairobi kitchens to NYC tables: Kenyan creators shine on TikTok’s global list',
    link: 'https://www.the-star.co.ke/news/2026-02-26-kenyan-creators-shine-on-tiktoks-global-list',
    image: '/Tiktok.jpg',
  },
]

const riengVideos = [
  {
    title: 'Sing Ama Pilipili | Kartelo ft. Modesto',
    videoId: 'RCUEd7LaHKY',
    views: '379K',
    badge: 'Trending',
  },
  {
    title: 'Rieng Radio Reggae Session Episode 1 | Mc Shalkido And Dj C4',
    videoId: '-DMoaDCixNo',
    views: '80K',
    badge: 'Live Mix',
  },
  {
    title: '9 Minutes Of Miracle Baby Speaking English',
    videoId: 'SlagKsO_xAU',
    views: '69K',
    badge: "Editor's Pick",
  },
]

const riengReviews = [
  {
    albumTitle: 'Victims of Madness 2.0',
    artist: 'Wakadinali',
    rating: '5.0',
  },
  {
    albumTitle: '40 & Four-Tune (EP)',
    artist: 'Sanaipei Tande',
    rating: '4.5',
  },
  {
    albumTitle: 'To Whom It May Concern',
    artist: 'Nyashinski',
    rating: '4.8',
  },
]



export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Live Player Section */}
      <LivePlayer />

      {/* Featured Shows Preview */}
      <section className="bg-background py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">The <span className="text-primary italic">Line-Up</span></h2>
              <p className="text-gray-400 font-medium md:text-lg">The most lethal daily schedule on Kenyan airwaves.</p>
            </div>
            <Link href="/shows" className="text-primary hover:text-accent font-semibold transition-colors">View All →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyShows.map((show, index) => (
              <ShowCard key={index} {...show} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners Slider Section */}
      <PartnersSlider />

      {/* Trending Now Section */}
      <section className="bg-background py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">Trending <span className="text-primary italic">Now</span></h2>
              <p className="text-gray-400 font-medium md:text-lg">The hottest stories and tracks dominating Kenyan culture.</p>
            </div>
            <Link href="/trending" className="text-primary hover:text-accent font-semibold transition-colors uppercase tracking-widest text-sm">View All →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingContent.map((item, index) => (
              <MediaCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Buy Song Promo Section */}
      <BuySongPromo />

      {/* Featured Videos Preview */}
      <section className="bg-card py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-1.5 rounded-full mb-6 relative">
                 <span className="absolute inset-0 bg-red-500/20 animate-ping rounded-full opacity-50"></span>
                 <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]"></span>
                 <span className="text-xs font-black uppercase tracking-[0.2em] relative z-10">77K+ Subscribers</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">RIENG <span className="text-red-500 italic">TV</span></h2>
              <p className="text-gray-400 font-medium md:text-lg max-w-2xl">The wildest games, live sets, and moments that defined Kenyan culture.</p>
            </div>
            <a href="https://www.youtube.com/@RiengRadio" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-white font-extrabold transition-colors uppercase tracking-widest text-sm bg-red-500/10 px-8 py-4 rounded-full border border-red-500/20 hover:bg-red-500 flex-shrink-0 flex items-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              Subscribe on YouTube
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {riengVideos.map((video, index) => (
              <VideoCard key={index} {...video} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Album Reviews Preview */}
      {/* Featured Album Reviews Preview */}
      <section className="bg-background py-16 md:py-20 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -mt-48 -mr-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.4em] text-primary uppercase mb-2">The Breakdown</p>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">Album <span className="text-primary italic">Reviews</span></h2>
              <p className="text-gray-400 font-medium md:text-lg max-w-2xl">Expert breakdowns on the most important Kenyan projects dropping right now.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {riengReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
