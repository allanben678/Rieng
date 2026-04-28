'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shows', label: 'Shows' },
    { href: '/trending', label: 'Trending' },
    { href: '/videos', label: 'Videos' },
    { href: '/albums', label: 'Albums' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex-shrink-0">
              <Image
                src="/logo.png"
                alt="RIENG Radio Logo"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg sm:text-2xl font-black text-white tracking-tight uppercase hidden sm:inline">
              RIENG<span className="text-primary">FLIX</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Link href="#live-player" className="hidden sm:inline-block bg-primary text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm sm:text-base">
              Listen Now
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-primary text-white'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="#live-player" onClick={() => setIsOpen(false)} className="w-full block text-center bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Listen Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
