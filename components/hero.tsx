'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src="stefan-barber.jpeg"
          alt="Frizer profesionist tunzând un client într-un salon elegant"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* LOGO-ul: pe telefon în stânga sus (top-6 left-5), iar pe laptop în dreapta sus (md:top-28 md:right-24) */}
     <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: [0.7, 1, 0.7], 
          scale: 1 
        }}
        transition={{ 
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          default: { duration: 0.8, ease: "easeOut" }
        }}
        className="absolute top-4 left-4 z-25 pointer-events-none md:top-28 md:right-24 md:left-auto"
      >
        <div className="h-40 w-40 md:h-64 md:w-64 flex items-center justify-center">
          <img 
            src="/old-forge-logo.png" 
            alt="Old Forge Logo" 
            className="h-full w-full object-contain drop-shadow-2xl"
          />
        </div>
      </motion.div>
      
      {/* Conținutul text */}
      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 md:pt-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
            <Star className="h-3.5 w-3.5 fill-primary" aria-hidden="true" />
            Old Forge - Baia Mare
          </span>

          <h1 className="mt-6 text-balance font-serif text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Stilul tău,{' '}
            <span className="text-primary">definit cu precizie.</span>
          </h1>

          <p className="mt-6 max-w-md text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
            La Ștefan Suciu fiecare tuns este o experiență. Programează-te online
            în câteva secunde și primești confirmare instant, plus un reminder
            prin email.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="#programare"
              className="rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20"
            >
              Programează-te acum
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="#servicii"
              className="rounded-full border border-border px-7 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Vezi serviciile
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}