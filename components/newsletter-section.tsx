"use client"

import { useState } from "react"
import Image from "next/image"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <section className="grid grid-cols-2 w-full" aria-label="Newsletter signup">
      {/* Left image */}
      <div className="relative overflow-hidden" style={{ minHeight: 420 }}>
        <Image
          src="/images/newsletter-texture.jpg"
          alt="Handmade ceramic vessel on linen"
          fill
          className="object-cover"
          sizes="50vw"
        />
      </div>

      {/* Right — form */}
      <div className="bg-background flex flex-col justify-center px-16 py-16 gap-8">
        <div className="flex flex-col gap-3">
          <h2
            className="text-foreground font-serif font-light leading-tight text-balance"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Join the Havenhues Community
          </h2>
          <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-sm">
            Quiet updates on new arrivals, conscious brands, and seasonal stories — nothing rushed.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-sm">
            <div className="flex flex-col gap-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-transparent text-foreground placeholder:text-foreground/30 text-sm font-light pb-2 focus:outline-none"
                style={{
                  borderBottom: "1px solid var(--foreground)",
                  borderRadius: 0,
                }}
              />
            </div>
            <button
              type="submit"
              className="w-fit bg-foreground text-background text-xs font-light tracking-[0.2em] uppercase px-8 py-3 hover:bg-foreground/80 transition-colors duration-400"
            >
              Join
            </button>
          </form>
        ) : (
          <p
            className="text-foreground font-serif font-light italic"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem" }}
          >
            Thank you for joining us.
          </p>
        )}
      </div>
    </section>
  )
}
