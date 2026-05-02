'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    let targetScroll = window.scrollY
    let currentScroll = window.scrollY
    let animationId: number | null = null
    let lastWheelTime = 0

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      lastWheelTime = Date.now()
      // Reduce scroll speed by multiplying delta by 0.4
      targetScroll += e.deltaY * 0.4
      targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight))

      if (!animationId) {
        animateScroll()
      }
    }

    const animateScroll = () => {
      const diff = targetScroll - currentScroll
      currentScroll += diff * 0.15 // Smooth easing

      window.scrollTo(0, currentScroll)

      // Continue animation if there's still a difference or recent wheel events
      if (Math.abs(diff) > 0.5 || Date.now() - lastWheelTime < 100) {
        animationId = requestAnimationFrame(animateScroll)
      } else {
        animationId = null
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return null
}
