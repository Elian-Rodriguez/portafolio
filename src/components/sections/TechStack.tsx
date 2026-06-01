import type { CSSProperties } from 'react'
import { Code } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Marquee } from '@/components/ui/Marquee'
import { useContentful } from '@/hooks/useContentful'
import { getTechImages, cfImage } from '@/lib/contentful'
import { fallbackTech } from '@/data/site'

interface TechItem {
  key: string
  img?: string
  label: string
}

function TechChip({ item, size = 'md' }: { item: TechItem; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'h-14 w-14' : 'h-16 w-16'
  return (
    <div
      className={`group/chip relative grid ${dim} shrink-0 place-items-center rounded-2xl glass shadow-soft transition-all duration-300 hover:scale-110 hover:border-iris/50`}
    >
      {item.img ? (
        <img
          src={item.img}
          alt={item.label}
          className="h-1/2 w-1/2 object-contain"
          loading="lazy"
        />
      ) : (
        <span className="px-1 text-center font-mono text-[10px] font-medium leading-tight text-ink">
          {item.label}
        </span>
      )}
      {item.img ? (
        <span className="pointer-events-none absolute -bottom-8 z-10 whitespace-nowrap rounded-md bg-panel px-2 py-1 text-xs text-muted opacity-0 shadow-soft transition-opacity duration-200 group-hover/chip:opacity-100">
          {item.label}
        </span>
      ) : null}
    </div>
  )
}

function Orbit({
  items,
  radiusPct,
  duration,
  reverse,
}: {
  items: TechItem[]
  radiusPct: number
  duration: number
  reverse?: boolean
}) {
  const spin: CSSProperties = {
    animation: `spin-slow ${duration}s linear infinite`,
    animationDirection: reverse ? 'reverse' : 'normal',
  }
  const counter: CSSProperties = {
    animation: `spin-slow ${duration}s linear infinite`,
    animationDirection: reverse ? 'normal' : 'reverse',
  }
  return (
    <div className="absolute inset-0" style={spin}>
      {items.map((item, i) => {
        const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2
        const left = 50 + Math.cos(angle) * radiusPct
        const top = 50 + Math.sin(angle) * radiusPct
        return (
          <div
            key={item.key}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <div style={counter}>
              <TechChip item={item} size="sm" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function TechStack() {
  const { data } = useContentful('techImages', getTechImages, [])

  const items: TechItem[] = data.length
    ? data.map((img, i) => ({
        key: img.title || `tech-${i}`,
        img: cfImage(img.url, { w: 96 }) ?? img.url,
        label: img.title || 'Tecnología',
      }))
    : fallbackTech.map((t) => ({ key: t, label: t }))

  const inner = items.slice(0, 5)
  const outer = items.slice(5, 13)

  return (
    <Section id="stack">
      <SectionHeading
        align="center"
        className="mx-auto items-center"
        eyebrow="Stack tecnológico"
        title="Tecnologías con las que construyo"
        description="Las herramientas que uso a diario para diseñar, construir y desplegar software backend moderno."
      />

      {/* Orbital (desktop) */}
      <div className="mt-16 hidden md:block">
        <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{ width: '56%', height: '56%' }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
            style={{ width: '92%', height: '92%' }}
          />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-pulse-glow grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-iris to-aqua shadow-glow-iris">
              <Code className="h-9 w-9 text-white" />
            </div>
          </div>

          {inner.length ? <Orbit items={inner} radiusPct={28} duration={34} /> : null}
          {outer.length ? <Orbit items={outer} radiusPct={46} duration={48} reverse /> : null}
        </div>
      </div>

      {/* Marquees (all sizes) */}
      <div className="mt-14 space-y-5 md:mt-20">
        <Marquee speed={42}>
          {items.map((it) => (
            <TechChip key={`a-${it.key}`} item={it} />
          ))}
        </Marquee>
        <Marquee speed={52} reverse>
          {items.map((it) => (
            <TechChip key={`b-${it.key}`} item={it} />
          ))}
        </Marquee>
      </div>
    </Section>
  )
}
