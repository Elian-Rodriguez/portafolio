import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds an animated gradient hairline border. */
  bordered?: boolean
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, bordered = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-3xl glass-strong shadow-soft',
        bordered && 'border-gradient',
        className,
      )}
      {...props}
    />
  ),
)
GlassCard.displayName = 'GlassCard'
