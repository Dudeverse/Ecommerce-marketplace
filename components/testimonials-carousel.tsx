"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const testimonials = [
  {
    quote: "Every piece I've ordered feels like it was made with actual care. The ceramics are alive with imperfection.",
    name: "Amara L.",
    stars: 5,
  },
  {
    quote: "Finally a place where conscious and beautiful are the same thing. I never want to shop anywhere else.",
    name: "Theo K.",
    stars: 5,
  },
  {
    quote: "The linen throw I ordered looks even more beautiful now that it's been washed a dozen times. That's intentional design.",
    name: "Margot V.",
    stars: 5,
  },
  {
    quote: "Packaging, shipping, materials — every detail reflects the values they stand for. Remarkable.",
    name: "Suki R.",
    stars: 5,
  },
  {
    quote: "Havenhues has replaced every big box retailer in my life. Slow, beautiful, and worth it.",
    name: "Jonas B.",
    stars: 5,
  },
]

const VISIBLE = 3
const INTERVAL_MS = 5000
const TRANSITION_MS = 600

export function TestimonialsCarousel() {
  const [offset, setOffset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const pauseRef = useRef(false)

  const total = testimonials.length
  const tripled = [...testimonials, ...testimonials, ...testimonials]

  const shift = useCallback(
    (dir: 1 | -1 = 1) => {
      if (isAnimating) return
      setIsAnimating(true)
      setOffset((prev) => prev + dir)
      setTimeout(() => {
        setIsAnimating(false)
        setOffset((prev) => {
          if (prev >= total) return prev - total
          if (prev <= -total) return prev + total
          return prev
        })
      }, TRANSITION_MS + 20)
    },
    [isAnimating, total]
  )

  useEffect(() => {
    const id = setInterval(() => {
      if (!pauseRef.current) shift(1)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [shift])

  const TILE_W = 100 / VISIBLE
  const translateX = -(total + offset) * TILE_W

  return (
    <section
      className="w-full py-20 overflow-hidden"
      aria-label="Testimonials"
      onMouseEnter={() => { setIsPaused(true); pauseRef.current = true }}
      onMouseLeave={() => { setIsPaused(false); pauseRef.current = false }}
    >
      <h2 className="text-center text-foreground font-light tracking-[0.18em] uppercase text-sm mb-14">
        You said it best
      </h2>

      {/* Track */}
      <div className="overflow-hidden px-4">
        <div
          className="flex"
          style={{
            width: `${(tripled.length / VISIBLE) * 100}%`,
            transform: `translateX(${translateX}%)`,
            transition: isAnimating
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
              : "none",
          }}
        >
          {tripled.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-5"
              style={{ width: `${100 / tripled.length}%` }}
            >
              <article className="bg-card px-8 py-10 flex flex-col gap-5 h-full">
                {/* Stars */}
                <div className="flex gap-1" aria-label={`${t.stars} stars`}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <span
                      key={si}
                      aria-hidden="true"
                      style={{ color: "var(--celadon)", fontSize: "0.75rem" }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="text-foreground font-serif font-light italic leading-relaxed flex-1"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.05rem",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Name */}
                <p className="text-foreground/40 text-[9px] font-light tracking-[0.2em] uppercase">
                  {t.name}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-10">
        {testimonials.map((_, i) => {
          const normOffset = ((offset % total) + total) % total
          const active = i === normOffset
          return (
            <button
              key={i}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => {
                const diff = i - ((offset % total) + total) % total
                if (diff !== 0) shift(diff > 0 ? 1 : -1)
              }}
              className="transition-all duration-500"
              style={{
                width: active ? 18 : 5,
                height: 2,
                background: active ? "var(--foreground)" : "var(--border)",
                borderRadius: 1,
              }}
            />
          )
        })}
      </div>
    </section>
  )
}
