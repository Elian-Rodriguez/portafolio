import { Server, Boxes, Container, Database, GitBranch, Gauge, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { GlassCard } from '@/components/ui/GlassCard'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { useContentful } from '@/hooks/useContentful'
import { getProfile, getProjects, getTechImages } from '@/lib/contentful'
import {
  YEARS_CODING,
  fallbackProjects,
  fallbackTech,
  focusAreas,
  profileFallback,
  type FocusArea,
} from '@/data/site'

const iconMap: Record<FocusArea['icon'], LucideIcon> = {
  server: Server,
  boxes: Boxes,
  container: Container,
  database: Database,
  gitBranch: GitBranch,
  gauge: Gauge,
  shield: ShieldCheck,
}

export function About() {
  const { data: profile } = useContentful('profile', getProfile, null)
  const { data: projects } = useContentful('projects', getProjects, [])
  const { data: techs } = useContentful('techImages', getTechImages, [])

  const data = profile ?? profileFallback
  const projectCount = projects.length || fallbackProjects.length
  const techCount = techs.length || fallbackTech.length

  const stats = [
    { label: 'Proyectos', value: projectCount, suffix: '+' },
    { label: 'Tecnologías', value: techCount, suffix: '+' },
    { label: 'Años codeando', value: YEARS_CODING, suffix: '+' },
  ]

  return (
    <Section id="sobre-mi">
      <SectionHeading
        eyebrow="Sobre mí"
        title={
          <>
            Ingeniería backend con <span className="text-gradient">mentalidad de producto</span>
          </>
        }
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Narrative + stats */}
        <div className="flex flex-col">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">{data.descripcion}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 leading-relaxed text-muted">
              Disfruto convertir requisitos complejos en arquitecturas limpias y mantenibles. Me
              obsesiona el detalle: APIs predecibles, código tipado, contenedores reproducibles y una
              gran experiencia tanto para quien consume como para quien mantiene el sistema.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.15 + i * 0.08}>
                <div className="glass rounded-2xl p-4 text-center sm:p-5">
                  <div className="text-gradient font-display text-3xl font-bold sm:text-4xl">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-muted sm:text-sm">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Focus areas */}
        <div className="grid gap-4 sm:grid-cols-2">
          {focusAreas.map((f, i) => {
            const Icon = iconMap[f.icon]
            return (
              <Reveal key={f.title} delay={i * 0.08} className="h-full">
                <GlassCard className="group h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-iris/30 to-aqua/20 text-iris-soft transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
                </GlassCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
