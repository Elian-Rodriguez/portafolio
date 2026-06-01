import { useEffect } from 'react'
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion'

/**
 * Global pointer position as spring-smoothed motion values (no re-renders).
 * Ideal for cursor glow and parallax/tilt effects.
 */
export function usePointer(
  stiffness = 140,
  damping = 22,
): { x: MotionValue<number>; y: MotionValue<number> } {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness, damping, mass: 0.4 })
  const sy = useSpring(y, { stiffness, damping, mass: 0.4 })

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', handler, { passive: true })
    return () => window.removeEventListener('pointermove', handler)
  }, [x, y])

  return { x: sx, y: sy }
}
