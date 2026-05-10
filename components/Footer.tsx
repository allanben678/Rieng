'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter an email')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Submit animation
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 overflow-hidden">
      {/* Background Banner Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/Banner.jpg"
          alt="Rieng Radio Banner"
          fill
          className="object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a]/70 to-[#030303]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 w-max">
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo.png"
                  alt="RIENGFLIX"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-widest">RIENG<span className="text-primary italic">FLIX</span></span>
            </Link>
            
            <p className="text-gray-400 text-sm mb-8 max-w-md leading-relaxed font-medium">
              The ultimate pulse of Kenyan culture. Watch live sets, listen to exclusive interviews, and get the hardest hits directly from the streets to your speakers.
            </p>
            
            <div>
               <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Join The Movement</h4>
               <form className="flex flex-col gap-2 max-w-sm" onSubmit={handleSubscribe}>
                  <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-full p-2">
                    <input 
                      type="email" 
                      placeholder="Enter your email..." 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-transparent px-4 text-sm text-white focus:outline-none placeholder:text-gray-600"
                    />
                    <button 
                      type="submit" 
                      disabled={submitted}
                      className={`text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                        submitted 
                          ? 'bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                          : 'bg-primary hover:bg-orange-600 shadow-[0_0_15px_rgba(255,107,53,0.3)]'
                      }`}
                    >
                      {submitted ? '✓ Subscribed' : 'Subscribe'}
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
               </form>
            </div>
          </div>
          
          {/* Content Links */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-sm mb-6">Explore</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-primary hover:translate-x-1 block transition-transform font-medium text-sm w-max">Live Sets</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary hover:translate-x-1 block transition-transform font-medium text-sm w-max">RIENG TV</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary hover:translate-x-1 block transition-transform font-medium text-sm w-max">Trending Now</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary hover:translate-x-1 block transition-transform font-medium text-sm w-max">Album Reviews</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-primary hover:translate-x-1 block transition-transform font-medium text-sm w-max">Submit Music</Link></li>
            </ul>
          </div>

          {/* Legal / Company Links */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-sm mb-6">Legal & Info</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-white hover:translate-x-1 block transition-transform font-medium text-sm w-max">About Us</Link></li>
              <li><a href="tel:+254114021853" className="text-gray-400 hover:text-white hover:translate-x-1 block transition-transform font-medium text-sm w-max">Contact Studio</a></li>
              <li><Link href="#" className="text-gray-400 hover:text-white hover:translate-x-1 block transition-transform font-medium text-sm w-max">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white hover:translate-x-1 block transition-transform font-medium text-sm w-max">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white hover:translate-x-1 block transition-transform font-medium text-sm w-max">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Socials & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 font-semibold text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} RIENG Radio. All rights reserved.
          </p>
          
          <div className="flex items-center gap-5">
            <a href="https://www.youtube.com/@RiengFlix" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-all hover:scale-125">
               <span className="sr-only">YouTube</span>
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
            <a href="https://www.instagram.com/riengradio_" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-all hover:scale-125">
               <span className="sr-only">Instagram</span>
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://x.com/Riengradio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-125">
               <span className="sr-only">X (Twitter)</span>
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.facebook.com/karteloofficialke/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-all hover:scale-125">
               <span className="sr-only">Facebook</span>
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
