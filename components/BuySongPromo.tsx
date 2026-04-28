import Link from 'next/link'

export default function BuySongPromo() {
  return (
    <section className="bg-gradient-to-r from-primary to-orange-600 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Exclusive Music Available Now
            </h2>
            <p className="text-white/90 text-lg mb-6">
              Purchase your favorite tracks from our curated catalog. Support your favorite artists directly and own the music you love.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-white">High-quality audio formats</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-white">Download to keep forever</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-white">Support independent artists</span>
              </div>
            </div>
            <Link href="/albums" className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors text-lg">
              Browse Catalog
            </Link>
          </div>
          <div className="bg-white/10 rounded-xl aspect-square flex items-center justify-center text-8xl">
            🎵
          </div>
        </div>
      </div>
    </section>
  )
}
