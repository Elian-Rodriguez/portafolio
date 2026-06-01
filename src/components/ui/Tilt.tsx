import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TiltProps {
  children: ReactNode
  className?: string
  max?: number
}

/** 3D perspective tilt that follows the pointer. Disabled on touch (no hover). */
export function Tilt({ children, className, max = 9 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 150, damping: 18 })

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch') return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  function reset() {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={cn('relative [transform-perspective:1000px]', className)}
    >
      {children}
    </motion.div>
  )
}
