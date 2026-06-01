import { useLenis } from 'lenis/react'

/** Returns a smooth-scroll function that uses Lenis when available. */
export function useScrollTo() {
  const lenis = useLenis()
  return (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
