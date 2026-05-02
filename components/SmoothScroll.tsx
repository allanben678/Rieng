'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleWheel = (e: WheelEvent) => {
      // Reduce scroll speed by intercepting wheel events
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault()
        
        // Clear previous timeout to prevent queue buildup
        clearTimeout(scrollTimeout)
        
        // Apply reduced scroll speed (60% of original)
        const newScroll = window.scrollY + e.deltaY * 0.6
        window.scrollTo({
          top: newScroll,
          behavior: 'auto',
        })
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return null
}
