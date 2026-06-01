import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title?: string
  description?: string
}

/**
 * Lightweight dynamic SEO. The crawler-facing baseline (OG, Twitter, JSON-LD)
 * lives in index.html; this lets sections override title/description at runtime.
 */
export function Seo({ title, description }: SeoProps) {
  return (
    <Helmet>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
    </Helmet>
  )
}
