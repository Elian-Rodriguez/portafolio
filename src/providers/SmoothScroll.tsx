import { useEffect, useRef, type ReactNode } from 'react'
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/** Keeps GSAP ScrollTrigger in sync with Lenis' smooth scroll position. */
function ScrollTriggerBridge() {
  useLenis(() => ScrollTrigger.update())
  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(update)
    }
  }, [reduced])

  // Honour reduced-motion: fall back to native scrolling.
  if (reduced) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
      ref={lenisRef}
    >
      <ScrollTriggerBridge />
      {children}
    </ReactLenis>
  )
}
