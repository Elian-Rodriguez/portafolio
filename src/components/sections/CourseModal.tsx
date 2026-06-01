import * as Dialog from '@radix-ui/react-dialog'
import { useRef } from 'react'
import { BadgeCheck, ExternalLink, X } from 'lucide-react'
import type { Course } from '@/lib/contentful-types'
import { cfImage } from '@/lib/contentful'
import { buttonVariants } from '@/components/ui/Button'

export function CourseModal({
  course,
  onClose,
}: {
  course: Course | null
  onClose: () => void
}) {
  // Keep last course visible during the close animation.
  const ref = useRef<Course | null>(course)
  if (course) ref.current = course
  const c = course ?? ref.current
  const media = c?.diploma ?? c?.imagen

  return (
    <Dialog.Root
      open={Boolean(course)}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[75] bg-bg/70 backdrop-blur-md data-[state=closed]:animate-[overlay-out_0.2s_ease] data-[state=open]:animate-[overlay-in_0.3s_ease]" />
        <Dialog.Content className="glass-strong fixed left-1/2 top-1/2 z-[80] max-h-[88vh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl shadow-soft focus:outline-none data-[state=closed]:animate-[dialog-out_0.2s_ease] data-[state=open]:animate-[dialog-in_0.4s_cubic-bezier(0.16,1,0.3,1)]">
          {c ? (
            <article>
              {/* Diploma media */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-iris/20 via-panel to-aqua/15">
                {media?.url ? (
                  <img
                    src={cfImage(media.url, { w: 1100 })}
                    alt={`Diploma — ${c.nombre}`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center">
                    <span className="font-display text-6xl font-bold text-white/20">
                      {c.nombre.charAt(0)}
                    </span>
                  </div>
                )}
                <Dialog.Close
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass text-ink transition-colors hover:bg-white/10"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" />
                </Dialog.Close>
              </div>

              {/* Body */}
              <div className="space-y-4 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {c.institucion ? (
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-aqua">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {c.institucion}
                      </span>
                    ) : null}
                    <Dialog.Title className="mt-2 font-display text-2xl font-bold leading-tight text-ink">
                      {c.nombre}
                    </Dialog.Title>
                  </div>
                  {c.fecha ? (
                    <span className="shrink-0 font-mono text-xs text-faint">{c.fecha}</span>
                  ) : null}
                </div>

                {c.descripcion ? (
                  <p className="text-base leading-relaxed text-muted">{c.descripcion}</p>
                ) : null}

                {c.url ? (
                  <div className="pt-1">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({ variant: 'glass', size: 'md' })}
                    >
                      Ver diploma
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                ) : null}

                <Dialog.Description className="sr-only">
                  Detalle del curso {c.nombre}
                </Dialog.Description>
              </div>
            </article>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
