import { Scissors } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Scissors className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-wide">
            Ștefi<span className="text-primary"> Barber</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#servicii" className="transition-colors hover:text-foreground">
            Servicii
          </a>
          <a href="#program" className="transition-colors hover:text-foreground">
            Program
          </a>
          <a href="#programare" className="transition-colors hover:text-foreground">
            Programare
          </a>
        </nav>

        <a
          href="#programare"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Programează-te
        </a>
      </div>
    </header>
  )
}
