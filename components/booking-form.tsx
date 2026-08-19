'use client'

import { useEffect } from 'react'

export function BookingForm() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-border bg-card p-6">
      <h2 className="mb-6 font-serif text-2xl font-bold text-center text-foreground">Programări Old Forge (Ștefan Suciu) - Baia Mare
      </h2>
      <p>
        Tel. +40 747 626 001
      </p>
    </div>
  )
}