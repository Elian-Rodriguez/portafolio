import { useState, type ChangeEvent, type FormEvent } from 'react'
import { BadgeCheck, Send } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { SocialGlyph } from '@/components/icons'
import { isTelegramConfigured, sendContactMessage } from '@/lib/telegram'
import { useSocials } from '@/hooks/useSocials'

type Status = 'idle' | 'sending' | 'success' | 'error'

const fields = [
  { name: 'name', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'tucorreo@ejemplo.com' },
  { name: 'phone', label: 'Teléfono', type: 'tel', placeholder: '+57 300 000 0000' },
] as const

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const socials = useSocials()

  function update(key: keyof typeof form) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }))
      if (status === 'success' || status === 'error') setStatus('idle')
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      await sendContactMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contacto">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: pitch + socials */}
        <div className="flex flex-col">
          <SectionHeading
            eyebrow="Contacto"
            title={
              <>
                ¿Tienes un proyecto <span className="text-gradient">en mente</span>?
              </>
            }
            description="Cuéntame qué quieres construir. Hablemos de backend, arquitectura o de cómo llevar tu idea a producción."
          />

          <div className="mt-8 flex flex-col gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-iris/50 hover:bg-white/[0.07]"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-iris/30 to-aqua/20 text-ink">
                    <SocialGlyph icon={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-ink">{s.label}</span>
                </span>
                <span className="font-mono text-sm text-faint transition-colors group-hover:text-aqua">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <GlassCard className="p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            {fields.map((f) => (
              <div key={f.name}>
                <label
                  htmlFor={f.name}
                  className="mb-1.5 block font-mono text-xs uppercase tracking-[0.15em] text-faint"
                >
                  {f.label}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  required={f.name !== 'phone'}
                  value={form[f.name]}
                  onChange={update(f.name)}
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none transition-colors duration-200 placeholder:text-faint focus:border-iris/60 focus:bg-white/[0.07]"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block font-mono text-xs uppercase tracking-[0.15em] text-faint"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={update('message')}
                placeholder="¿En qué te puedo ayudar?"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-ink outline-none transition-colors duration-200 placeholder:text-faint focus:border-iris/60 focus:bg-white/[0.07]"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={status === 'sending' || !isTelegramConfigured}
            >
              {status === 'sending' ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Enviando…
                </>
              ) : (
                <>
                  Enviar mensaje
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>

            {!isTelegramConfigured ? (
              <p className="text-center text-xs text-faint">
                El envío se activa al configurar las variables de Telegram (ver README).
              </p>
            ) : null}

            {status === 'success' ? (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                <BadgeCheck className="h-5 w-5 shrink-0" />
                ¡Gracias! Tu mensaje fue enviado. Te responderé pronto.
              </div>
            ) : null}
            {status === 'error' ? (
              <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
                Hubo un error al enviar. Inténtalo de nuevo o escríbeme por LinkedIn.
              </div>
            ) : null}
          </form>
        </GlassCard>
      </div>
    </Section>
  )
}
