import { ArrowUp } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { SocialGlyph } from '@/components/icons'
import { navLinks } from '@/data/site'
import { useSocials } from '@/hooks/useSocials'

const year = new Date().getFullYear()

export function Footer() {
  const lenis = useLenis()
  const socials = useSocials()

  function go(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function toTop() {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-iris/60 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-iris to-aqua text-base font-bold text-white shadow-glow-iris">
                E
              </span>
              <span className="font-display text-lg font-semibold text-ink">Elian Rodríguez</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Ingeniero de software · Backend, arquitectura moderna y experiencias web premium.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-iris/50 hover:text-ink"
                >
                  <SocialGlyph icon={s.icon} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Navegación</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.slice(1).map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Contacto</h3>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm text-muted">Disponible para proyectos</span>
            </div>
            <button
              onClick={() => go('contacto')}
              className="mt-4 block text-sm text-muted transition-colors hover:text-ink"
            >
              Enviar un mensaje →
            </button>
          </div>
        </div>

        {/* Watermark */}
        <div className="pointer-events-none mt-14 select-none text-center" aria-hidden="true">
          <span className="bg-gradient-to-b from-white/[0.08] to-transparent bg-clip-text font-display text-[20vw] font-bold leading-none text-transparent md:text-[13rem]">
            ELIAN
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-sm text-faint">
            © {year} Elian Rodríguez Benítez · Hecho con React, Three.js & Contentful.
          </p>
          <button
            onClick={toTop}
            className="group flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            Volver arriba
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-iris/50">
              <ArrowUp className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
