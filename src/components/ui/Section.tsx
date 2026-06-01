import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, className, children, ...props }, ref) => (
    <section
      ref={ref}
      id={id}
      className={cn('relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 md:py-32', className)}
      {...props}
    >
      {children}
    </section>
  ),
)
Section.displayName = 'Section'
