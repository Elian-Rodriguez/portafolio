import { Bug, ExternalLink, Fish, Lock, Radar, ScanLine, ShieldCheck, Terminal, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { GlassCard } from '@/components/ui/GlassCard'
import { Marquee } from '@/components/ui/Marquee'
import { buttonVariants } from '@/components/ui/Button'
import {
  securityAreas,
  securityCerts,
  securityMotto,
  securityTools,
  tryhackme,
  type SecurityArea,
} from '@/data/site'

const iconMap: Record<SecurityArea['icon'], LucideIcon> = {
  radar: Radar,
  workflow: Workflow,
  lock: Lock,
  bug: Bug,
  scanLine: ScanLine,
  fish: Fish,
}

export function Security() {
  return (
    <Section id="seguridad">
      <SectionHeading
        eyebrow="Ciberseguridad"
        title={
          <>
            Seguridad <span className="text-gradient">ofensiva &amp; defensiva</span>
          </>
        }
        description="Especialista en ciberseguridad en Indra. Construyo defensa práctica —SOC, SOAR, DevSecOps y automatización con Python— bajo una idea simple: con poco se puede hacer mucho."
      />

      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Terminal whoami + motto */}
        <Reveal className="h-full">
          <div className="glass flex h-full flex-col justify-center rounded-2xl p-6 font-mono text-sm">
            <div className="flex items-center gap-1.5 text-faint">
              <Terminal className="h-4 w-4" /> ~/coguarhack
            </div>
            <div className="mt-4">
              <span className="text-aqua">elian@indra</span>
              <span className="text-faint">:</span>
              <span className="text-iris-soft">~</span>
              <span className="text-faint">$ </span>
              <span className="text-ink">whoami</span>
            </div>
            <div className="mt-1 text-muted">
              → Especialista en Ciberseguridad · Blue Team · SOAR · DevSecOps
            </div>
            <div className="mt-4">
              <span className="text-aqua">elian@indra</span>
              <span className="text-faint">:~$ </span>
              <span className="text-ink">cat lema.txt</span>
            </div>
            <p className="text-gradient mt-2 font-display text-xl font-semibold leading-snug">
              «{securityMotto}»
              <span className="animate-blink ml-1 inline-block h-5 w-2 translate-y-0.5 bg-aqua align-middle" />
            </p>
          </div>
        </Reveal>

        {/* TryHackMe live badge */}
        <Reveal delay={0.12} className="h-full">
          <div className="glass-strong border-gradient flex h-full flex-col overflow-hidden rounded-2xl shadow-soft">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-rose-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-xs text-faint">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                tryhackme · perfil en vivo
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center p-5">
              <img
                src={tryhackme.badge}
                alt="Badge de TryHackMe — coguarhack"
                loading="lazy"
                className="w-full rounded-lg"
              />
              <a
                href={tryhackme.profile}
                target="_blank"
                rel="noreferrer"
                className={`mt-4 w-full ${buttonVariants({ variant: 'glass', size: 'md' })}`}
              >
                Ver perfil en TryHackMe
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Focus areas */}
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {securityAreas.map((a, i) => {
          const Icon = iconMap[a.icon]
          return (
            <Reveal key={a.title} delay={(i % 3) * 0.08} className="h-full">
              <GlassCard className="group h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-iris/30 to-aqua/20 text-iris-soft transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {a.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          )
        })}
      </div>

      {/* Security certifications */}
      <div className="mt-14">
        <Reveal>
          <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-aqua">
            Certificaciones de seguridad
          </h3>
        </Reveal>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {securityCerts.map((c, i) => (
            <Reveal key={c.nombre} delay={(i % 3) * 0.06}>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:border-iris/40">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-iris/30 to-aqua/20 text-aqua">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{c.nombre}</p>
                  <p className="text-xs text-muted">{c.emisor}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Tools marquee */}
      <div className="mt-12">
        <Marquee speed={42}>
          {securityTools.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm text-muted"
            >
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  )
}
