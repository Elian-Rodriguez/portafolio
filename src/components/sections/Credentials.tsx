import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { BadgeCheck, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import type { Certification, Course } from '@/lib/contentful-types'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { GlassCard } from '@/components/ui/GlassCard'
import { useContentful } from '@/hooks/useContentful'
import { getCertifications, getCourses, cfImage } from '@/lib/contentful'
import { fallbackCertifications, fallbackCourses } from '@/data/site'

function CertCard({ c }: { c: Certification }) {
  const img = c.imagen?.url ? cfImage(c.imagen.url, { w: 640 }) : undefined
  return (
    <GlassCard className="group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      {img ? (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
          <img
            src={img}
            alt={c.nombre}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel/70 to-transparent" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-iris/30 to-aqua/20 text-aqua">
            <BadgeCheck className="h-5 w-5" />
          </span>
          {c.fecha ? <span className="font-mono text-xs text-faint">{c.fecha}</span> : null}
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">{c.nombre}</h3>
        {c.empresa ? <p className="mt-1 text-sm text-muted">{c.empresa}</p> : null}
        {c.codigo ? <p className="mt-1 font-mono text-xs text-faint">Cód: {c.codigo}</p> : null}
        <div className="mt-auto pt-4">
          {c.link ? (
            <a
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-iris-soft transition-colors hover:text-aqua"
            >
              Verificar credencial
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </div>
    </GlassCard>
  )
}

function CourseCard({ c }: { c: Course }) {
  const img = c.imagen?.url ? cfImage(c.imagen.url, { w: 640 }) : undefined
  return (
    <GlassCard className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
        {img ? (
          <img src={img} alt={c.nombre} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-iris/25 via-panel to-aqua/15">
            <span className="font-display text-5xl font-bold text-white/20">{c.nombre.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-display text-base font-semibold text-ink">{c.nombre}</h4>
        {c.institucion ? <p className="mt-1 text-sm text-iris-soft">{c.institucion}</p> : null}
        {c.fecha ? <p className="mt-0.5 font-mono text-xs text-faint">{c.fecha}</p> : null}
        {c.descripcion ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{c.descripcion}</p>
        ) : null}
      </div>
    </GlassCard>
  )
}

export function Credentials() {
  const { data: certData } = useContentful('certifications', getCertifications, [])
  const { data: courseData } = useContentful('courses', getCourses, [])
  const certs = certData.length ? certData : fallbackCertifications
  const courses = courseData.length ? courseData : fallbackCourses

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 3600, stopOnInteraction: false }),
  ])
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <Section id="credenciales">
      <SectionHeading
        eyebrow="Credenciales"
        title={
          <>
            Certificaciones &amp; <span className="text-gradient">formación</span>
          </>
        }
        description="Aprendizaje constante: certificaciones técnicas verificables y formación continua en backend, arquitectura y DevOps."
      />

      {/* Certifications */}
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 0.08} className="h-full">
            <CertCard c={c} />
          </Reveal>
        ))}
      </div>

      {/* Education carousel */}
      <div className="mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-aqua">
              Aprendizaje continuo
            </span>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Cursos &amp; formación
            </h3>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={prev}
              aria-label="Anterior"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-iris/50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-iris/50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <div className="-ml-4 flex">
            {courses.map((c) => (
              <div
                key={c.id}
                className="min-w-0 flex-[0_0_85%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <CourseCard c={c} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
