/** Clean view-models derived from Contentful entries. */

export interface CfImage {
  url: string
  title: string
  width?: number
  height?: number
}

/** content_type: portafolieer (singleton) */
export interface Profile {
  nombre: string
  /** Used as the professional role/headline on the current site. */
  apellido: string
  descripcion: string
  foto?: CfImage
  cv?: string
  linkedin?: string
  github?: string
  tryhackme?: string
}

/** content_type: proyectos */
export interface Project {
  id: string
  nombre: string
  icono?: CfImage
  imagen?: CfImage
  problema?: string
  descripcion?: string
  fecha?: string
  repoUrl?: string
  liveUrl?: string
  /** Optional new field `tecnologias` in Contentful (array or comma list). */
  tecnologias?: string[]
}

/** content_type: cursos */
export interface Course {
  id: string
  nombre: string
  imagen?: CfImage
  descripcion?: string
  fecha?: string
  institucion?: string
}

/** content_type: certificaciones */
export interface Certification {
  id: string
  nombre: string
  imagen?: CfImage
  fecha?: string
  codigo?: string
  empresa?: string
  link?: string
}

/** content_type: experiencia (NEW — optional, falls back to seed data) */
export interface Experience {
  id: string
  puesto: string
  empresa: string
  periodo?: string
  descripcion?: string
  tecnologias?: string[]
  logo?: CfImage
  orden?: number
}
