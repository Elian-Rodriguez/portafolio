import type {
  Certification,
  Course,
  Experience,
  Profile,
  Project,
} from '@/lib/contentful-types'

export interface NavLink {
  id: string
  label: string
}

export const navLinks: NavLink[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'stack', label: 'Stack' },
  { id: 'credenciales', label: 'Credenciales' },
  { id: 'contacto', label: 'Contacto' },
]

export type SocialIcon = 'github' | 'linkedin' | 'mail' | 'tryhackme'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/Elian-Rodriguez', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/elian-eduardo-rodriguez-benitez-a9a514213/',
    icon: 'linkedin',
  },
  { label: 'TryHackMe', href: 'https://tryhackme.com/p/coguarhack', icon: 'tryhackme' },
]

/** Rotating roles shown under the hero name. */
export const heroRoles = [
  'Desarrollador Backend',
  'Python · FastAPI',
  'Cloud · Azure & Docker',
  'Ciberseguridad & DevOps',
]

/** Used when Contentful is unavailable so the site never renders empty. */
export const profileFallback: Profile = {
  nombre: 'Elian Rodríguez',
  apellido: 'Desarrollador Backend Python',
  descripcion:
    'Desarrollador backend enfocado en Python. Diseño y construyo APIs y servicios escalables con FastAPI, contenerizados con Docker y desplegados en la nube (Azure, Kubernetes), con una fuerte mentalidad de seguridad.',
}

export interface FocusArea {
  icon: 'server' | 'boxes' | 'container' | 'database' | 'gitBranch' | 'gauge' | 'shield'
  title: string
  description: string
}

export const focusAreas: FocusArea[] = [
  {
    icon: 'server',
    title: 'Backend & APIs',
    description: 'APIs REST robustas y bien documentadas con Python y FastAPI, pensadas para escalar.',
  },
  {
    icon: 'container',
    title: 'Cloud & DevOps',
    description: 'Despliegues en Azure con Docker y Kubernetes; entornos reproducibles de extremo a extremo.',
  },
  {
    icon: 'database',
    title: 'Datos',
    description: 'Modelado y análisis de datos con SQL, Supabase y pandas.',
  },
  {
    icon: 'shield',
    title: 'Ciberseguridad',
    description: 'Mentalidad de seguridad y práctica constante en retos de TryHackMe.',
  },
]

/**
 * Fallback timeline used until an `experiencia` content type exists in Contentful.
 * Replace these by adding entries in Contentful (see README) — they're examples.
 */
export const seedExperience: Experience[] = [
  {
    id: 'seed-1',
    puesto: 'Desarrollador Backend Python',
    empresa: 'Proyectos profesionales',
    periodo: '2023 — Presente',
    descripcion:
      'Construcción de APIs y servicios backend con **Python** y **FastAPI**, contenerizados con **Docker** y desplegados en **Azure / Kubernetes**. Enfoque en código limpio, seguridad y rendimiento.',
    tecnologias: ['Python', 'FastAPI', 'Docker', 'Azure', 'Kubernetes'],
    orden: 1,
  },
  {
    id: 'seed-2',
    puesto: 'Desarrollo & Datos',
    empresa: 'Aplicaciones y servicios',
    periodo: '2022 — 2023',
    descripcion:
      'Integración de servicios backend con bases de datos en **Supabase** y procesamiento de datos con **pandas**, conectando interfaces web con APIs y headless CMS.',
    tecnologias: ['Python', 'Supabase', 'pandas', 'REST APIs'],
    orden: 2,
  },
  {
    id: 'seed-3',
    puesto: 'Formación & Ciberseguridad',
    empresa: 'Aprendizaje continuo',
    periodo: '2021 — 2022',
    descripcion:
      'Bases sólidas en programación y fundamentos de nube (**Azure AZ-900**), con práctica constante de ciberseguridad en **TryHackMe**.',
    tecnologias: ['Python', 'Azure', 'Linux', 'TryHackMe'],
    orden: 3,
  },
]

/** Curated stat for the About section. */
export const YEARS_CODING = 3

/** Technologies shown in the orbital stack when Contentful has no logos yet. */
export const fallbackTech = [
  'Python',
  'FastAPI',
  'Docker',
  'Kubernetes',
  'Azure',
  'Supabase',
  'pandas',
  'PostgreSQL',
  'Git',
  'Linux',
  'REST APIs',
  'SQL',
]

/**
 * Demo content shown only when the matching Contentful entries are empty.
 * Your real Contentful data always takes precedence (see README).
 */
export const fallbackProjects: Project[] = [
  {
    id: 'demo-1',
    nombre: 'API de E-commerce',
    problema: 'Centralizar catálogo, carrito, pagos y pedidos en una API escalable.',
    descripcion:
      'Backend modular con **NestJS** que expone una API REST documentada, con autenticación JWT, manejo de pedidos y pasarela de pagos. Contenerizado con **Docker**.',
    fecha: '2024',
    tecnologias: ['NestJS', 'PostgreSQL', 'Docker', 'JWT'],
    repoUrl: 'https://github.com/Elian-Rodriguez',
  },
  {
    id: 'demo-2',
    nombre: 'Microservicio de Autenticación',
    problema: 'Gestión de identidad reutilizable para varios productos.',
    descripcion:
      'Servicio de autenticación y autorización con roles, refresh tokens y rate-limiting. Diseñado con arquitectura limpia y pruebas automatizadas.',
    fecha: '2024',
    tecnologias: ['Node.js', 'TypeScript', 'Redis', 'JWT'],
    repoUrl: 'https://github.com/Elian-Rodriguez',
  },
  {
    id: 'demo-3',
    nombre: 'Dashboard en tiempo real',
    problema: 'Visualizar métricas de negocio al instante.',
    descripcion:
      'Aplicación full-stack con **React** y WebSockets para métricas en vivo, alimentada por un backend en Node.js y una base de datos NoSQL.',
    fecha: '2023',
    tecnologias: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
    repoUrl: 'https://github.com/Elian-Rodriguez',
  },
  {
    id: 'demo-4',
    nombre: 'Portafolio Headless',
    problema: 'Contenido editable sin tocar el código.',
    descripcion:
      'Sitio personal con contenido gestionado vía **Contentful** y un frontend moderno con animaciones y 3D.',
    fecha: '2023',
    tecnologias: ['React', 'Contentful', 'Three.js', 'Tailwind'],
    repoUrl: 'https://github.com/Elian-Rodriguez',
  },
]

export const fallbackCertifications: Certification[] = [
  {
    id: 'cert-1',
    nombre: 'Desarrollo Backend con Node.js',
    fecha: '2024',
    empresa: 'Formación online',
  },
  {
    id: 'cert-2',
    nombre: 'NestJS: APIs Profesionales',
    fecha: '2024',
    empresa: 'Formación online',
  },
  {
    id: 'cert-3',
    nombre: 'Docker & Contenedores',
    fecha: '2023',
    empresa: 'Formación online',
  },
]

export const fallbackCourses: Course[] = [
  {
    id: 'course-1',
    nombre: 'Arquitectura de Software',
    institucion: 'Formación online',
    fecha: '2024',
    descripcion: 'Patrones de diseño, arquitectura limpia y principios SOLID.',
  },
  {
    id: 'course-2',
    nombre: 'Bases de Datos Avanzadas',
    institucion: 'Formación online',
    fecha: '2023',
    descripcion: 'Modelado, optimización de consultas y escalabilidad.',
  },
  {
    id: 'course-3',
    nombre: 'TypeScript Profesional',
    institucion: 'Formación online',
    fecha: '2023',
    descripcion: 'Tipado avanzado, genéricos y patrones para aplicaciones robustas.',
  },
  {
    id: 'course-4',
    nombre: 'DevOps con Docker',
    institucion: 'Formación online',
    fecha: '2023',
    descripcion: 'Contenedores, imágenes, redes y despliegues reproducibles.',
  },
]

/* ===================== Ciberseguridad ===================== */

export const securityMotto = 'Porque con poco se puede hacer mucho.'

export const tryhackme = {
  user: 'coguarhack',
  profile: 'https://tryhackme.com/p/coguarhack',
  badge: 'https://tryhackme-badges.s3.amazonaws.com/coguarhack.png',
}

export interface SecurityArea {
  icon: 'radar' | 'workflow' | 'lock' | 'bug' | 'scanLine' | 'fish'
  title: string
  description: string
  tools: string[]
}

export const securityAreas: SecurityArea[] = [
  {
    icon: 'radar',
    title: 'SOC & Blue Team',
    description:
      'Monitoreo, detección y respuesta a incidentes con visibilidad centralizada en SIEM.',
    tools: ['SIEM', 'Exabeam', 'Triage'],
  },
  {
    icon: 'workflow',
    title: 'SOAR & Automatización',
    description:
      'Orquestación de respuesta: recibir alertas, analizar y ejecutar acciones automáticas con Python.',
    tools: ['Python', 'Shuffle', 'Tracecat', 'n8n', 'Siemplify'],
  },
  {
    icon: 'lock',
    title: 'DevSecOps & Cloud Security',
    description:
      'Seguridad integrada en CI/CD y en la nube (AWS, Azure, GCP) con contenedores endurecidos.',
    tools: ['AWS', 'Azure', 'GCP', 'Docker'],
  },
  {
    icon: 'bug',
    title: 'Detección & Honeypots',
    description:
      'IDS/IPS y trampas que aprenden del atacante para alimentar el SIEM y los playbooks.',
    tools: ['Suricata', 'Snort', 'Cowrie', 'Conpot'],
  },
  {
    icon: 'scanLine',
    title: 'Gestión de Vulnerabilidades',
    description: 'Ciclo detectar → priorizar → parchar → validar, con parcheo automatizado.',
    tools: ['Nessus', 'OpenVAS', 'Nuclei', 'Ansible'],
  },
  {
    icon: 'fish',
    title: 'Ingeniería Social & Concienciación',
    description:
      'Simulaciones de phishing y cultura de seguridad: el usuario entrenado es la mejor defensa.',
    tools: ['GoPhish', 'King Phisher'],
  },
]

export interface SecurityCert {
  nombre: string
  emisor: string
}

export const securityCerts: SecurityCert[] = [
  { nombre: 'SOC Level 1', emisor: 'TryHackMe' },
  { nombre: 'Security Engineer', emisor: 'TryHackMe' },
  { nombre: 'DevSecOps', emisor: 'TryHackMe' },
  { nombre: 'SOAR Developer', emisor: 'Google Cloud Security' },
  { nombre: 'Cloud Security Fundamentals', emisor: 'Palo Alto Networks' },
  { nombre: 'SOAR Fundamentals (Siemplify)', emisor: 'Udemy' },
]

export const securityTools = [
  'Python',
  'SOAR',
  'SIEM',
  'Suricata',
  'Snort',
  'Honeypots',
  'Nessus',
  'OpenVAS',
  'Nuclei',
  'Tenable',
  'Ansible',
  'Automox',
  'pfSense',
  'Fortinet',
  'Palo Alto',
  'GoPhish',
  'Linux',
  'AWS',
  'Azure',
  'GCP',
]

