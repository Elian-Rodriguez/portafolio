import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-medium text-muted backdrop-blur-sm transition-colors duration-300 hover:border-iris/40 hover:text-ink',
        className,
      )}
      {...props}
    />
  )
}
