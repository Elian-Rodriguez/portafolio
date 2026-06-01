import { useIsMobile } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ParticleField } from './ParticleField'

/** Global cinematic backdrop: grid + drifting gradient orbs + particles. */
export function Background() {
  const isMobile = useIsMobile()
  const reduced = usePrefersReducedMotion()
  const showParticles = !isMobile && !reduced

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Futuristic grid */}
      <div className="bg-grid bg-grid-fade absolute inset-0 opacity-60" />

      {/* Drifting neon orbs */}
      <div className="animate-aurora absolute -left-40 -top-32 h-[42rem] w-[42rem] rounded-full bg-iris/20 blur-[130px]" />
      <div className="animate-float-slow absolute right-[-12%] top-[18%] h-[32rem] w-[32rem] rounded-full bg-aqua/15 blur-[120px]" />
      <div className="animate-aurora absolute bottom-[-12%] left-[28%] h-[36rem] w-[36rem] rounded-full bg-flux/12 blur-[140px]" />

      {/* Particle layer (desktop) */}
      {showParticles ? <ParticleField className="absolute inset-0 h-full w-full opacity-70" /> : null}

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,6,11,0.55))]" />
    </div>
  )
}
