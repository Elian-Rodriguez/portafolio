import * as Dialog from '@radix-ui/react-dialog'
import { useRef } from 'react'
import { ExternalLink, X } from 'lucide-react'
import type { Project } from '@/lib/contentful-types'
import { cfImage } from '@/lib/contentful'
import { Markdown } from '@/components/ui/Markdown'
import { Badge } from '@/components/ui/Badge'
import { buttonVariants } from '@/components/ui/Button'
import { GithubIcon } from '@/components/icons'

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  // Keep last project visible during the close animation.
  const ref = useRef<Project | null>(project)
  if (project) ref.current = project
  const p = project ?? ref.current

  return (
    <Dialog.Root
      open={Boolean(project)}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[75] bg-bg/70 backdrop-blur-md data-[state=closed]:animate-[overlay-out_0.2s_ease] data-[state=open]:animate-[overlay-in_0.3s_ease]" />
        <Dialog.Content className="glass-strong fixed left-1/2 top-1/2 z-[80] max-h-[88vh] w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl shadow-soft focus:outline-none data-[state=closed]:animate-[dialog-out_0.2s_ease] data-[state=open]:animate-[dialog-in_0.4s_cubic-bezier(0.16,1,0.3,1)]">
          {p ? (
            <article>
              {/* Media */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {p.imagen?.url ? (
                  <img
                    src={cfImage(p.imagen.url, { w: 1000 })}
                    alt={p.nombre}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-iris/30 via-panel to-aqua/20">
                    <span className="font-display text-6xl font-bold text-white/20">
                      {p.nombre.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/30 to-transparent" />
                <Dialog.Close
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass text-ink transition-colors hover:bg-white/10"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" />
                </Dialog.Close>
                <div className="absolute inset-x-6 bottom-4">
                  {p.fecha ? <span className="font-mono text-xs text-aqua">{p.fecha}</span> : null}
                  <Dialog.Title className="font-display text-2xl font-bold text-ink sm:text-3xl">
                    {p.nombre}
                  </Dialog.Title>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-5 p-6 sm:p-8">
                {p.tecnologias?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {p.tecnologias.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                ) : null}

                {p.problema ? (
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
                      El reto
                    </h4>
                    <div className="mt-2 text-base">
                      <Markdown>{p.problema}</Markdown>
                    </div>
                  </div>
                ) : null}

                {p.descripcion ? (
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
                      La solución
                    </h4>
                    <div className="mt-2 text-base">
                      <Markdown>{p.descripcion}</Markdown>
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-3 pt-2">
                  {p.repoUrl ? (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({ variant: 'glass', size: 'md' })}
                    >
                      <GithubIcon className="h-4 w-4" />
                      Repositorio
                    </a>
                  ) : null}
                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({ variant: 'primary', size: 'md' })}
                    >
                      Ver en vivo
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>

                <Dialog.Description className="sr-only">
                  Detalles del proyecto {p.nombre}
                </Dialog.Description>
              </div>
            </article>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
