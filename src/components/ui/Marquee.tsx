import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: ReactNode
  className?: string
  reverse?: boolean
  /** Seconds per loop. */
  speed?: number
}

export function Marquee({ children, className, reverse, speed = 38 }: MarqueeProps) {
  const style: CSSProperties = {
    animationDuration: `${speed}s`,
    animationDirection: reverse ? 'reverse' : undefined,
  }
  return (
    <div className={cn('mask-fade-x group relative flex overflow-hidden', className)}>
      <div
        className="animate-marquee flex shrink-0 items-center gap-6 pr-6 group-hover:[animation-play-state:paused]"
        style={style}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="animate-marquee flex shrink-0 items-center gap-6 pr-6 group-hover:[animation-play-state:paused]"
        style={style}
      >
        {children}
      </div>
    </div>
  )
}
