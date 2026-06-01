import { createClient } from 'contentful'
import type {
  CfImage,
  Certification,
  Course,
  Experience,
  Profile,
  Project,
} from './contentful-types'

const space = import.meta.env.VITE_CONTENTFUL_SPACE || import.meta.env.REACT_APP_SPACE
const accessToken =
  import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || import.meta.env.REACT_APP_ACCESS_TOKEN
const environment =
  import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || import.meta.env.REACT_APP_ENVIRONMENT || 'master'

export const isContentfulConfigured = Boolean(space && accessToken)

const client = isContentfulConfigured
  ? createClient({ space, accessToken, environment })
  : null

/** Normalize a Contentful asset into a clean image object (https-safe). */
function toImage(asset: any): CfImage | undefined {
  const file = asset?.fields?.file
  const url: string | undefined = file?.url
  if (!url) return undefined
  const https = url.startsWith('//') ? `https:${url}` : url.replace('http://', 'https://')
  const meta = file.details?.image
  return {
    url: https,
    title: asset.fields.title ?? '',
    width: meta?.width,
    height: meta?.height,
  }
}

/** Build an optimized Contentful Images API URL (webp + sizing). */
export function cfImage(
  url: string | undefined,
  opts: { w?: number; h?: number; q?: number; fit?: 'fill' | 'pad' | 'crop' | 'thumb' | 'scale' } = {},
): string | undefined {
  if (!url) return undefined
  try {
    const u = new URL(url)
    if (opts.w) u.searchParams.set('w', String(Math.round(opts.w)))
    if (opts.h) u.searchParams.set('h', String(Math.round(opts.h)))
    u.searchParams.set('q', String(opts.q ?? 78))
    u.searchParams.set('fm', 'webp')
    if (opts.fit) u.searchParams.set('fit', opts.fit)
    return u.toString()
  } catch {
    return url
  }
}

function asString(value: unknown): string | undefined {
  if (value == null) return undefined
  return typeof value === 'string' ? value : String(value)
}

/** Flatten a Contentful Rich Text document (or plain value) to plain text. */
function richTextToPlain(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.nodeType === 'text') return node.value ?? ''
  if (Array.isArray(node.content)) return node.content.map(richTextToPlain).join('')
  return ''
}

async function entries(contentType: string, order?: string): Promise<any[]> {
  if (!client) return []
  try {
    const query: Record<string, unknown> = { content_type: contentType, include: 2, limit: 200 }
    if (order) query.order = order
    const res = await client.getEntries(query as any)
    return res.items as any[]
  } catch (err) {
    console.error(`[contentful] failed to fetch "${contentType}"`, err)
    return []
  }
}

export async function getProfile(): Promise<Profile | null> {
  const items = await entries('portafolieer')
  const f = items[0]?.fields
  if (!f) return null
  return {
    nombre: f.nombre ?? '',
    apellido: f.apellido ?? '',
    descripcion: f.descripcionmi ?? '',
    foto: toImage(f.foto),
    cv: toImage(f.cv)?.url,
    linkedin: f.linkedin,
    github: f.githubperfil,
    tryhackme: f.linkTryHackme,
  }
}

export async function getProjects(): Promise<Project[]> {
  const items = await entries('proyectos')
  return items.map((it) => {
    const f = it.fields
    const tech = Array.isArray(f.tecnologias)
      ? f.tecnologias
      : typeof f.tecnologias === 'string'
        ? f.tecnologias.split(',').map((s: string) => s.trim()).filter(Boolean)
        : undefined
    return {
      id: it.sys.id,
      nombre: f.nombreproyecto ?? 'Proyecto',
      icono: toImage(f.iconoproyecto),
      imagen: toImage(f.videoproyecto) ?? toImage(f.iconoproyecto),
      problema: asString(f.problemaSolucionar),
      descripcion: asString(f.descripcionCurso),
      fecha: asString(f.fechadeElaboracion),
      repoUrl: f.ulrlrepositorio,
      liveUrl: f.urlproductivo,
      tecnologias: tech,
    }
  })
}

export async function getCourses(): Promise<Course[]> {
  const items = await entries('cursos')
  return items.map((it) => {
    const f = it.fields
    return {
      id: it.sys.id,
      nombre: f.nombrecurso ?? 'Curso',
      imagen: toImage(f.imagenCertificado),
      descripcion: asString(f.descripcionCurso),
      fecha: asString(f.fechaExpedicion),
      institucion: f.institucion,
    }
  })
}

export async function getCertifications(): Promise<Certification[]> {
  const items = await entries('certificaciones')
  return items.map((it) => {
    const f = it.fields
    return {
      id: it.sys.id,
      nombre: f.nombreDeCertificacion ?? 'Certificación',
      imagen: toImage(f.certificacionr),
      fecha: asString(f.fechaDeEmisionCertificacion),
      codigo: asString(f.idVerificacio),
      empresa: f.empresaFormadoraCertificacion,
      link: f.linkVerificacio,
    }
  })
}

export async function getTechImages(): Promise<CfImage[]> {
  const items = await entries('contactoImages')
  return items
    .map((it) => {
      const img = toImage(it.fields.imagenTecnologiaContacto)
      if (!img) return undefined
      return { ...img, title: it.fields.nombreLogo || img.title }
    })
    .filter((x): x is CfImage => Boolean(x))
}

/** content_type: experiencia. Resolves to [] if empty (falls back to seed). */
export async function getExperiences(): Promise<Experience[]> {
  const items = await entries('experiencia', '-sys.createdAt')
  return items.map((it) => {
    const f = it.fields
    const periodo = [richTextToPlain(f.fechainicio), richTextToPlain(f.fechafin)]
      .map((s) => s.trim())
      .filter(Boolean)
      .join(' — ')
    const descripcion = [
      asString(f.funciones),
      f.logros ? `**Logros:** ${asString(f.logros)}` : '',
    ]
      .filter(Boolean)
      .join('\n\n')
    return {
      id: it.sys.id,
      puesto: f.cargo ?? '',
      empresa: f.empresalaboral ?? '',
      periodo: periodo || undefined,
      descripcion: descripcion || undefined,
      logo: toImage(f.logo),
    }
  })
}
