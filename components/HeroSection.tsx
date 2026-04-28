import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden border-b border-border">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/KarteloandMiracleBaby.jpg"
          alt="Kartelo and Miracle Baby"
          fill
          priority
          className="object-cover object-top"
          quality={90}
        />
        {/* Dark overlay to maintain the dark theme */}
        <div className="absolute inset-0 bg-black/75 bg-gradient-to-t from-background via-black/50 to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight text-balance uppercase drop-shadow-xl">
            Welcome to <span className="text-primary drop-shadow-[0_0_15px_rgba(255,107,53,0.5)]">RIENG Radio</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto text-balance font-medium drop-shadow">
            The pulse of Kenyan youth culture. Sheng, comedy, podcasts, and the sickest live mixes. 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all text-lg shadow-lg shadow-primary/20 hover:-translate-y-1">
              Tune In Live
            </button>
            <button className="bg-black/50 backdrop-blur-md border-2 border-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/20 transition-all text-lg hover:-translate-y-1">
              Explore RIENGFLIX
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
