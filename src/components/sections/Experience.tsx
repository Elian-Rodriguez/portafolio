import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { Markdown } from '@/components/ui/Markdown'
import { useContentful } from '@/hooks/useContentful'
import { getExperiences } from '@/lib/contentful'
import { seedExperience } from '@/data/site'

export function Experience() {
  const { data } = useContentful('experiences', getExperiences, [])
  const items = data.length ? data : seedExperience

  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 })

  return (
    <Section id="experiencia">
      <SectionHeading
        eyebrow="Trayectoria"
        title="Experiencia"
        description="Mi evolución como ingeniero: del aprendizaje continuo a la construcción de sistemas backend en producción."
      />

      <div ref={ref} className="relative mt-16">
        {/* Rail */}
        <div className="absolute bottom-1 left-[18px] top-1 w-px bg-white/10" />
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-1 left-[18px] top-1 w-px origin-top bg-gradient-to-b from-iris via-flux to-aqua"
        />

        <ul className="space-y-8 sm:space-y-10">
          {items.map((exp, i) => (
            <li key={exp.id} className="relative pl-12 sm:pl-16">
              <span className="absolute left-[18px] top-2 -translate-x-1/2">
                <span className="absolute -inset-1.5 animate-ping rounded-full bg-iris/30" />
                <span className="relative block h-3 w-3 rounded-full bg-gradient-to-br from-iris to-aqua ring-4 ring-bg" />
              </span>

              <Reveal delay={i * 0.05}>
                <GlassCard className="p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7">
                  <span className="font-mono text-xs text-aqua">{exp.periodo}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">{exp.puesto}</h3>
                  <p className="text-sm text-iris-soft">{exp.empresa}</p>
                  {exp.descripcion ? <Markdown className="mt-3">{exp.descripcion}</Markdown> : null}
                  {exp.tecnologias?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tecnologias.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  ) : null}
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
