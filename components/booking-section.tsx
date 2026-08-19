import { BookingForm } from '@/components/booking-form'

export default function BookingSection() {
  return (
    <section
      id="programare"
      className="relative border-t border-border/60 py-24"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            Programare online
          </span>
          <h2 className="mt-3 text-balance font-serif text-4xl font-bold sm:text-5xl">
            Rezervă-ți locul în câteva secunde
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Completează formularul după selectarea serviciului, alege ziua și ora care ți se potrivesc, iar
            noi ne ocupăm de rest.
            (Vezi mai sus serviciile oferite și prețurile aferente pentru a face alegerea potrivită.)
          </p>
        </div>
        <BookingForm />
      </div>
    </section>
  )
}
