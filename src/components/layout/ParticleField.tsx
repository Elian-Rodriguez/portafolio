import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  c: string
  a: number
}

/** Lightweight drifting particle field on a canvas (desktop only). */
export function ParticleField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const colors = ['124,92,255', '34,211,238', '233,76,255']
    const COUNT = 64
    const parts: Particle[] = []
    let w = 0
    let h = 0
    let raf = 0
    let running = true

    function resize() {
      w = canvas!.clientWidth
      h = canvas!.clientHeight
      canvas!.width = Math.floor(w * dpr)
      canvas!.height = Math.floor(h * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function init() {
      parts.length = 0
      for (let i = 0; i < COUNT; i++) {
        parts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.6 + 0.4,
          c: colors[i % colors.length],
          a: Math.random() * 0.5 + 0.15,
        })
      }
    }

    function tick() {
      ctx!.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        else if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        else if (p.y > h) p.y = 0
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${p.c},${p.a})`
        ctx!.fill()
      }
      if (running) raf = requestAnimationFrame(tick)
    }

    resize()
    init()
    tick()

    const onResize = () => {
      resize()
      init()
    }
    const onVisibility = () => {
      running = !document.hidden
      if (running) raf = requestAnimationFrame(tick)
      else cancelAnimationFrame(raf)
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
