import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image
                src="/logo.png"
                alt="RIENG Radio Logo"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-black text-white tracking-tight uppercase md:flex hidden">
              RIENG<span className="text-primary">FLIX</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/shows" className="text-foreground hover:text-primary transition-colors">Shows</Link>
            <Link href="/trending" className="text-foreground hover:text-primary transition-colors">Trending</Link>
            <Link href="/videos" className="text-foreground hover:text-primary transition-colors">Videos</Link>
            <Link href="/albums" className="text-foreground hover:text-primary transition-colors">Albums</Link>
          </div>

          <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            Listen Now
          </button>
        </div>
      </div>
    </nav>
  )
}
