import { motion } from 'framer-motion'
import { usePointer } from '@/hooks/usePointer'
import { useIsMobile } from '@/hooks/useMediaQuery'

/** Soft neon glow that trails the pointer (desktop only). */
export function CursorGlow() {
  const isMobile = useIsMobile()
  const { x, y } = usePointer(170, 24)

  if (isMobile) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 -z-[5]"
    >
      <div className="h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris/10 blur-[90px]" />
    </motion.div>
  )
}
