import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download, Sparkles } from 'lucide-react'
import { SocialGlyph } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import { buttonVariants } from '@/components/ui/Button'
import { useScrollTo } from '@/hooks/useScrollTo'
import { useSocials } from '@/hooks/useSocials'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useContentful } from '@/hooks/useContentful'
import { getProfile, cfImage } from '@/lib/contentful'
import { heroRoles, profileFallback } from '@/data/site'
import avatarFallback from '@/assets/image.png'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

const heroStack = ['Python', 'FastAPI', 'Docker', 'Azure', 'Kubernetes', 'Supabase']

function AnimatedName({ text }: { text: string }) {
  const reduced = useReducedMotion()
  const words = text.split(' ')
  let index = 0
  return (
    <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-ink [text-wrap:balance] drop-shadow-[0_8px_40px_rgba(124,92,255,0.25)] sm:text-6xl md:text-7xl xl:text-[5.4rem]">
      {words.map((word, wi) => (
        <span key={wi} className="mr-[0.22em] inline-block">
          {word.split('').map((ch) => {
            const delay = 0.25 + index * 0.035
            index += 1
            return (
              <motion.span
                key={`${wi}-${index}`}
                className="inline-block"
                initial={{ y: reduced ? 0 : '0.9em', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {ch}
              </motion.span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}

function RoleRotator() {
  const [i, setI] = useState(0)
  const reduced = useReducedMotion()
  useEffect(() => {
    const id = window.setInterval(() => setI((p) => (p + 1) % heroRoles.length), 2600)
    return () => window.clearInterval(id)
  }, [])
  return (
    <span className="inline-flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className="text-gradient-flux animate-gradient"
          initial={{ y: reduced ? 0 : '0.55em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduced ? 0 : '-0.55em', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {heroRoles[i]}
        </motion.span>
      </AnimatePresence>
      <span className="animate-blink ml-1 inline-block h-[1em] w-[3px] translate-y-[0.12em] bg-aqua" />
    </span>
  )
}

function FloatingChip({
  label,
  className,
  delay = 0,
}: {
  label: string
  className?: string
  delay?: number
}) {
  return (
    <div
      className={`animate-float glass absolute hidden rounded-2xl px-3 py-1.5 font-mono text-xs text-ink shadow-soft lg:block ${className ?? ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {label}
    </div>
  )
}

export function Hero() {
  const scrollTo = useScrollTo()
  const isMobile = useIsMobile()
  const reduced = usePrefersReducedMotion()
  const enable3D = !isMobile && !reduced

  const { data: profile } = useContentful('profile', getProfile, null)
  const data = profile ?? profileFallback
  const socials = useSocials()
  const photo = data.foto?.url ? (cfImage(data.foto.url, { w: 720 }) ?? data.foto.url) : avatarFallback

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-20 pt-28 sm:pt-32"
    >
      {/* 3D scene (desktop only) */}
      {enable3D ? (
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      ) : null}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Text column */}
        <div className="flex flex-col items-start">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted"
          >
            <Sparkles className="h-3.5 w-3.5 text-aqua" />
            Disponible para nuevos proyectos
          </motion.span>

          <p className="mb-3 font-mono text-sm text-aqua">Hola, soy</p>
          <AnimatedName text={data.nombre} />

          <p className="mt-5 font-display text-2xl font-medium text-muted sm:text-3xl md:text-4xl">
            <RoleRotator />
          </p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg"
          >
            {data.descripcion}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" onClick={() => scrollTo('proyectos')}>
              Ver proyectos
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            {data.cv ? (
              <a
                href={data.cv}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: 'glass', size: 'lg' })}
              >
                Descargar CV
                <Download className="h-4 w-4" />
              </a>
            ) : (
              <Button variant="glass" size="lg" onClick={() => scrollTo('contacto')}>
                Hablemos
              </Button>
            )}
            <div className="ml-1 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-iris/50 hover:text-ink"
                >
                  <SocialGlyph icon={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Stack highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Stack</span>
            {heroStack.map((t) => (
              <span key={t} className="font-mono text-sm text-muted">
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Avatar column */}
        <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square w-60 sm:w-80 lg:w-full"
          >
            {/* Rotating conic glow */}
            <div className="animate-spin-slow absolute -inset-6 rounded-full bg-[conic-gradient(from_0deg,var(--color-iris),var(--color-aqua),var(--color-flux),var(--color-iris))] opacity-25 blur-2xl" />
            {/* Static gradient ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-iris/60 via-transparent to-aqua/50" />
            {/* Photo */}
            <div className="animate-float absolute inset-0 overflow-hidden rounded-full border border-white/10 bg-panel shadow-float">
              <img
                src={photo}
                alt={`${data.nombre} — ${data.apellido}`}
                width={720}
                height={720}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
            </div>

            {/* Floating tech chips */}
            <FloatingChip label="Python" className="-left-8 top-10" delay={0.2} />
            <FloatingChip label="FastAPI" className="-right-6 top-1/3" delay={1.1} />
            <FloatingChip label="Docker" className="bottom-10 -left-10" delay={0.7} />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo('sobre-mi')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-ink sm:flex"
        aria-label="Desplazarse hacia abajo"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.button>
    </section>
  )
}
