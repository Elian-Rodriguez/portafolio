import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
}

/** Counts up from 0 to `value` the first time it scrolls into view. */
export function AnimatedCounter({
  value,
  duration = 1.8,
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(display)}
      {suffix}
    </span>
  )
}
