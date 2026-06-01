import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SmoothScroll } from '@/providers/SmoothScroll'
import { Seo } from '@/components/Seo'
import { Background } from '@/components/layout/Background'
import { CursorGlow } from '@/components/layout/CursorGlow'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Preloader } from '@/components/layout/Preloader'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { TechStack } from '@/components/sections/TechStack'
import { Credentials } from '@/components/sections/Credentials'
import { Contact } from '@/components/sections/Contact'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [loading, setLoading] = useState(!reduced)

  return (
    <>
      <Seo />

      <AnimatePresence>
        {loading ? <Preloader onDone={() => setLoading(false)} /> : null}
      </AnimatePresence>

      <Background />
      <CursorGlow />
      <ScrollProgress />

      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <TechStack />
          <Credentials />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  )
}
