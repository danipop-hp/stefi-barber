'use client'

import { Scissors, Sparkles, Users } from 'lucide-react'
import { motion } from 'framer-motion'

// Iconiță de mașină de tuns / trimmer profesional (pentru contur și barbă)
const TrimmerIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Lama mașinii de tuns sus */}
    <path d="M7 2h10v3H7z" />
    {/* Corpul aparatului */}
    <rect x="8" y="5" width="8" height="15" rx="2" />
    {/* Butonul sau detaliul de pe mâner */}
    <line x1="12" y1="9" x2="12" y2="13" />
    {/* Cablul sau baza */}
    <path d="M12 20v2" />
  </svg>
)

const SERVICES = [
  {
    icon: Scissors,
    title: 'Tuns',
    price: '60 lei',
    duration: '40 min',
    description: 'Tuns adaptat formei feței, cu finisaj curat și styling profesional.',
    link: 'https://calendly.com/dannyhort664/stefi-barber-tuns-clasic-modern?background_color=121212&text_color=c5a059&primary_color=c5a059&hide_landing_page_details=1',
  },
  {
    icon: Sparkles,
    title: 'Tuns cu Barbă',
    price: '90 lei',
    duration: '60 min',
    description: 'Conturare, tundere și îngrijire completă pentru un look impecabil.',
    link: 'https://calendly.com/dannyhort664/stefi-barber-tuns?background_color=121212&text_color=c5a059&primary_color=c5a059&hide_landing_page_details=1',
  },
  {
    icon: Users,
    title: 'Pachet Tată-Fiu',
    price: '100 lei',
    duration: '60 min',
    description: 'Experiența perfectă de tuns împreună, rapid și într-o atmosferă relaxată.',
    link: 'https://calendly.com/dannyhort664/stefi-barber-pachet-complet?background_color=121212&text_color=c5a059&primary_color=c5a059&hide_landing_page_details=1',
  },
  {
    icon: TrimmerIcon,
    title: 'Tuns Barbă (contur/retuș)',
    price: '40 lei',
    duration: '15 min',
    description: 'Aranjare rapidă și precisă pentru o barbă mereu îngrijită.',
    link: 'https://calendly.com/dannyhort664/tefi-barber-tuns-barba?background_color=121212&text_color=c5a059&primary_color=c5a059&hide_landing_page_details=1',
  },
]

export function Services() {
  const openCalendlyPopup = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      ;(window as any).Calendly.initPopupWidget({ url: url })
    }
  }

  return (
    <section id="servicii" className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center md:text-left max-w-2xl">
        <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 text-center">
          SERVICII PROFESIONALE — SUCIU ȘTEFAN GABRIEL
        </span>
        <h2 className="mt-4 text-balance font-serif text-4xl font-bold sm:text-5xl text-foreground">
          Alege experiența potrivită
        </h2>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.title}
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                boxShadow: "0 25px 40px -15px rgba(197, 160, 89, 0.15)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              onClick={() => openCalendlyPopup(service.link)}
              className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/90 backdrop-blur-md p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:border-primary/60 hover:bg-gradient-to-b hover:from-card hover:to-primary/[0.04]"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/20 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary border border-primary/20 shadow-inner">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground bg-secondary px-3 py-1.5 rounded-full border border-border/50">
                    {service.duration}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>

             <div className="mt-8 pt-5 border-t border-border/60 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground block">Preț</span>
              <span className="font-serif text-2xl font-bold text-primary">
              {service.price}
            </span>
            </div>

  
          <span className="text-xs font-semibold uppercase tracking-wider text-primary opacity-100 translate-x-0 md:opacity-0 md:-translate-x-3 md:transition-all md:duration-300 md:group-hover:opacity-100 md:group-hover:translate-x-0">
            Rezervă →
          </span>
        </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}