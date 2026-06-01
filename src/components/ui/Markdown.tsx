import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

const components: Components = {
  p: ({ node, ...props }) => (
    <p className="leading-relaxed text-muted [&:not(:first-child)]:mt-3" {...props} />
  ),
  strong: ({ node, ...props }) => <strong className="font-semibold text-ink" {...props} />,
  em: ({ node, ...props }) => <em className="text-ink/90" {...props} />,
  a: ({ node, ...props }) => (
    <a
      className="text-aqua underline underline-offset-2 transition-colors hover:text-iris-soft"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  ul: ({ node, ...props }) => (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-iris" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-muted marker:text-iris" {...props} />
  ),
  li: ({ node, ...props }) => <li className="pl-1" {...props} />,
  code: ({ node, ...props }) => (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-aqua" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="mt-4 font-display text-lg font-semibold text-ink" {...props} />
  ),
}

export function Markdown({ children, className }: { children?: string; className?: string }) {
  if (!children) return null
  return (
    <div className={cn('text-sm', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
