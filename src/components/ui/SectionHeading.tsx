import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-aqua">
            <span className="h-px w-8 bg-gradient-to-r from-aqua to-transparent" />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
