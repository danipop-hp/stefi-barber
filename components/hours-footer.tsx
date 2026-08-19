import { MapPin, Phone, Clock, Scissors } from 'lucide-react'

const HOURS = [
  { day: 'Luni – Vineri', time: '09:00 – 18:00' },
  { day: 'Sâmbătă', time: '09:00 – 15:00' },
  { day: 'Duminică', time: 'Închis' },
]

export function HoursSection() {
  return (
    <section id="program" className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-border">
          <img
            src="/images/barber-tools.png"
            alt="Unelte de frizerie premium așezate pe o suprafață închisă la culoare"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            Program & Contact
          </span>
          <h2 className="mt-3 text-balance font-serif text-4xl font-bold sm:text-5xl">
            Te așteptăm în salon
          </h2>

          <ul className="mt-8 divide-y divide-border/60 border-y border-border/60">
            {HOURS.map((h) => (
              <li
                key={h.day}
                className="flex items-center justify-between py-3.5"
              >
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                  {h.day}
                </span>
                <span className="font-medium">{h.time}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3 text-muted-foreground">
            <p className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
              Str. Victoriei nr. 12, București
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
              +40 720 000 000
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Scissors className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-serif font-semibold">
            Ștefi<span className="text-primary"> Barber</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ștefi Barber. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  )
}
