import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PreloaderProps {
  onDone: () => void
}

export function Preloader({ onDone }: PreloaderProps) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let value = 0
    const id = window.setInterval(() => {
      value = Math.min(100, value + Math.random() * 16 + 7)
      setPct(Math.round(value))
      if (value >= 100) {
        window.clearInterval(id)
        window.setTimeout(onDone, 380)
      }
    }, 130)
    return () => window.clearInterval(id)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-bg"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative grid h-16 w-16 place-items-center">
          <span className="animate-spin-slow absolute inset-0 rounded-full border-2 border-transparent border-r-aqua border-t-iris" />
          <span className="text-gradient font-display text-xl font-bold">E</span>
        </div>
        <div className="font-mono text-sm tabular-nums text-muted">{pct}%</div>
        <div className="h-px w-40 overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-iris to-aqua"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
