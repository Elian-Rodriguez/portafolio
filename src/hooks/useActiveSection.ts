import { useEffect, useState } from 'react'

/** Tracks which section id is currently in the viewport band (scroll spy). */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')
  const key = ids.join(',')

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return active
}
