# Portafolio — Elian Rodríguez Benítez

Portafolio personal **premium, futurista e interactivo** de un ingeniero de software
enfocado en backend. Diseño cinematográfico oscuro con glassmorphism, neón sutil,
animaciones avanzadas y un hero con 3D. El contenido se gestiona desde **Contentful**
y el formulario de contacto envía los mensajes a **Telegram**.

> Rediseño completo (2026): se migró de Create React App a **Vite + React + TypeScript**.

## ✨ Stack

| Área | Tecnología |
| --- | --- |
| Build / Framework | **Vite 5** + **React 18** + **TypeScript** |
| Estilos | **Tailwind CSS v4** (tokens de diseño en CSS) |
| Animación | **Framer Motion** + **GSAP / ScrollTrigger** |
| Smooth scroll | **Lenis** (sincronizado con GSAP) |
| 3D | **Three.js** + **React Three Fiber** + **drei** (lazy, solo desktop) |
| UI accesible | **Radix UI** (Dialog), **class-variance-authority** |
| Carrusel | **Embla Carousel** |
| Contenido | **Contentful** (headless CMS) |
| Iconos | **lucide-react** + SVGs de marca propios |

## 🎨 Sistema de diseño — "Aurora Noir"

Definido como tokens en [`src/styles/globals.css`](src/styles/globals.css):

- **Fondo:** negro premium (`#05060b`) con orbes de gradiente a la deriva y grid futurista.
- **Neón:** iris `#7c5cff`, aqua `#22d3ee`, flux `#e94cff`, gold `#ffb547`.
- **Tipografía:** Space Grotesk (display), Inter (texto), JetBrains Mono (detalles).
- **Glassmorphism, glows neón, bordes con gradiente, partículas y microinteracciones.**
- Respeta `prefers-reduced-motion` y degrada el 3D/efectos en móvil para máxima fluidez.

## 🚀 Puesta en marcha

```bash
npm install
cp .env.example .env        # completa tus credenciales
npm run dev                 # http://localhost:5173
```

Scripts:

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo (Vite, HMR) |
| `npm run build` | Typecheck + build de producción a `dist/` |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | Chequeo de tipos (`tsc --noEmit`) |

## 🔑 Variables de entorno

Crea un archivo `.env` (ver [`.env.example`](.env.example)). Se aceptan **ambos
prefijos**: las nuevas `VITE_*` (recomendadas) o las antiguas `REACT_APP_*` (habilitadas
con `envPrefix` en `vite.config.ts`). Si defines ambas, tienen prioridad las `VITE_*`:

| Variable | Antes (CRA) | Descripción |
| --- | --- | --- |
| `VITE_CONTENTFUL_SPACE` | `REACT_APP_SPACE` | ID del espacio de Contentful |
| `VITE_CONTENTFUL_ENVIRONMENT` | `REACT_APP_ENVIRONMENT` | Entorno (normalmente `master`) |
| `VITE_CONTENTFUL_ACCESS_TOKEN` | `REACT_APP_ACCESS_TOKEN` | Token de entrega (CDA) |
| `VITE_TELEGRAM_BOT_TOKEN` | `REACT_APP_TELEGRAM_BOT_TOKEN` | Token del bot de Telegram |
| `VITE_TELEGRAM_CHAT_ID` | `REACT_APP_CHAT_TELEGRAM` | Chat ID destino |

> El sitio funciona aunque falten credenciales: muestra contenido de demostración
> que se reemplaza automáticamente por tus datos reales de Contentful.

> ⚠️ **Seguridad:** en una SPA el token de Telegram viaja al cliente (igual que en la
> versión anterior). Para producción endurecida, conviene mover el envío a una función
> serverless (Vercel/Netlify) y dejar el token en el servidor. La lógica está aislada en
> [`src/lib/telegram.ts`](src/lib/telegram.ts) para facilitarlo.

## 🗂️ Modelo de contenido en Contentful

Los content types existentes se mantienen. Campos usados:

- **`portafolieer`** (perfil): `nombre`, `apellido` (rol), `descripcionmi`, `foto`
- **`proyectos`**: `nombreproyecto`, `iconoproyecto`, `videoproyecto` (imagen), `problemaSolucionar` (markdown), `descripcionCurso` (markdown), `fechadeElaboracion`, `ulrlrepositorio`, `urlproductivo`, **`tecnologias`** *(nuevo, opcional)*
- **`cursos`**: `nombrecurso`, `imagenCertificado`, `descripcionCurso` (markdown), `fechaExpedicion`, `institucion`
- **`certificaciones`**: `nombreDeCertificacion`, `certificacionr`, `fechaDeEmisionCertificacion`, `idVerificacio`, `empresaFormadoraCertificacion`, `linkVerificacio`
- **`contactoImages`**: `imagenTecnologiaContacto` → se usan como logos del **stack orbital**

### Nuevos content types opcionales (recomendados)

Para que la sección **Experiencia** y los **tags de proyectos** muestren tus datos
reales en lugar del contenido de ejemplo, crea en Contentful:

**`experiencia`**
| Campo | Tipo | Notas |
| --- | --- | --- |
| `puesto` | Short text | Cargo |
| `empresa` | Short text | Empresa o contexto |
| `periodo` | Short text | Ej. `2023 — Presente` |
| `descripcion` | Long text | Admite **markdown** |
| `tecnologias` | Short text | Lista separada por comas |
| `logoEmpresa` | Media | Opcional |
| `orden` | Integer | Orden ascendente |

**`tecnologias`** en `proyectos`: Short text con los stacks separados por comas
(ej. `NestJS, PostgreSQL, Docker`).

## 🧱 Arquitectura

```
src/
  components/
    layout/      Navbar, Footer, Background, CursorGlow, ScrollProgress, Preloader, ParticleField
    sections/    Hero, About, Experience, Projects, ProjectModal, TechStack, Credentials, Contact
    three/       HeroScene (React Three Fiber, lazy)
    ui/          Button, Badge, GlassCard, Section, SectionHeading, Reveal, Tilt, Marquee, Markdown, AnimatedCounter
  hooks/         useContentful, useScrollTo, useActiveSection, useMediaQuery, usePointer, usePrefersReducedMotion
  lib/           contentful (cliente tipado), telegram, gsap, utils
  providers/     SmoothScroll (Lenis + GSAP)
  data/          site (navegación, redes, contenido de respaldo)
  styles/        globals.css (tokens del sistema de diseño)
```

## 🌐 Despliegue

Genera estáticos en `dist/`. Compatible con **Vercel**, **Netlify**, **Cloudflare
Pages** o cualquier hosting estático. Recuerda definir las variables `VITE_*` en el panel
del proveedor. SEO: meta tags, Open Graph, Twitter Card, JSON-LD (Schema.org Person),
`sitemap.xml` y `robots.txt` ya incluidos.
