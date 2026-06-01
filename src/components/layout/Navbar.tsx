import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { navLinks } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'

const ids = navLinks.map((l) => l.id)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const lenis = useLenis()

  function go(id: string) {
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, lenis])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <nav className="glass-strong flex w-full max-w-3xl items-center justify-between gap-2 rounded-full py-2 pl-3 pr-2 shadow-soft">
          {/* Brand */}
          <button
            onClick={() => go('inicio')}
            className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3"
            aria-label="Inicio"
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-iris to-aqua text-sm font-bold text-white shadow-glow-iris">
              E
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-ink sm:block">
              Elian<span className="text-iris">.</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300',
                    active === l.id ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {active === l.id ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => go('contacto')}
              className="hidden rounded-full bg-gradient-to-r from-iris to-aqua px-4 py-1.5 text-sm font-medium text-white shadow-glow-iris transition-transform duration-300 hover:-translate-y-0.5 lg:block"
            >
              Hablemos
            </button>
            <button
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-white/5 md:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-bg/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="glass-strong absolute inset-x-4 top-4 rounded-3xl p-6 shadow-soft"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display font-semibold text-ink">Menú</span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-white/5"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.04 }}
                  >
                    <button
                      onClick={() => go(l.id)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-lg font-medium transition-colors',
                        active === l.id ? 'bg-white/5 text-ink' : 'text-muted hover:text-ink',
                      )}
                    >
                      {l.label}
                      <span className="font-mono text-xs text-faint">0{i + 1}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
