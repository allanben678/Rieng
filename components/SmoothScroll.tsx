'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    let isScrolling = false
    let scrollVelocity = 0
    let currentScroll = 0

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      scrollVelocity = e.deltaY * 0.3

      if (!isScrolling) {
        isScrolling = true
        animateScroll()
      }
    }

    const animateScroll = () => {
      currentScroll += scrollVelocity
      scrollVelocity *= 0.95

      window.scrollTo(0, currentScroll)

      if (Math.abs(scrollVelocity) > 0.5) {
        requestAnimationFrame(animateScroll)
      } else {
        isScrolling = false
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return null
}
