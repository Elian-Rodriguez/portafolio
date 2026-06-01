import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/contentful-types'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'
import { Tilt } from '@/components/ui/Tilt'
import { useContentful } from '@/hooks/useContentful'
import { getProjects, cfImage } from '@/lib/contentful'
import { fallbackProjects } from '@/data/site'
import { cn } from '@/lib/utils'
import { ProjectModal } from './ProjectModal'

function ProjectCard({
  project,
  featured,
  onOpen,
}: {
  project: Project
  featured?: boolean
  onOpen: () => void
}) {
  const img = project.imagen?.url
    ? cfImage(project.imagen.url, { w: featured ? 1100 : 720 })
    : undefined

  return (
    <Tilt className="h-full">
      <button
        onClick={onOpen}
        className="group glass-strong border-gradient block h-full w-full overflow-hidden rounded-3xl text-left shadow-soft transition-shadow duration-300 hover:shadow-float"
      >
        <div className={cn('relative overflow-hidden', featured ? 'aspect-[16/10] lg:aspect-[16/11]' : 'aspect-[16/10]')}>
          {img ? (
            <img
              src={img}
              alt={project.nombre}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-iris/30 via-panel to-aqua/20">
              <span className="font-display text-6xl font-bold text-white/20">
                {project.nombre.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />
          <div className="absolute right-4 top-4 grid h-10 w-10 -translate-y-1 place-items-center rounded-full glass text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="p-6">
          {project.fecha ? (
            <span className="font-mono text-xs text-faint">{project.fecha}</span>
          ) : null}
          <h3
            className={cn(
              'mt-1 font-display font-semibold text-ink transition-colors group-hover:text-iris-soft',
              featured ? 'text-2xl' : 'text-xl',
            )}
          >
            {project.nombre}
          </h3>
          {project.problema ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.problema}</p>
          ) : null}
          {project.tecnologias?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tecnologias.slice(0, featured ? 6 : 4).map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          ) : null}
        </div>
      </button>
    </Tilt>
  )
}

export function Projects() {
  const { data } = useContentful('projects', getProjects, [])
  const projects = data.length ? data : fallbackProjects
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <Section id="proyectos">
      <SectionHeading
        eyebrow="Trabajo seleccionado"
        title={
          <>
            Proyectos que <span className="text-gradient">resuelven problemas</span>
          </>
        }
        description="Una selección de proyectos backend y full-stack. Haz clic en cualquiera para ver el reto, la solución y el stack."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:[grid-auto-rows:1fr]">
        {projects.map((p, i) => (
          <Reveal
            key={p.id}
            delay={(i % 3) * 0.08}
            className={cn('h-full', i === 0 && 'sm:col-span-2 lg:row-span-2')}
          >
            <ProjectCard project={p} featured={i === 0} onOpen={() => setSelected(p)} />
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
