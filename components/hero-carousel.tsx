"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    src: "/images/hero-1.jpg",
    headline: "The beauty of\nimperfect things",
    sub: "Hand-thrown. Earth-made. Quietly considered.",
  },
  {
    src: "/images/hero-2.jpg",
    headline: "Where nature\nand living meet",
    sub: "Curated for the mindful home and body.",
  },
  {
    src: "/images/hero-3.jpg",
    headline: "Slow down.\nChoose well.",
    sub: "Every material chosen with intention.",
  },
]

const INTERVAL = 6000

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = useCallback(
    (idx: number) => {
      if (fading) return
      setFading(true)
      setTimeout(() => {
        setCurrent(idx)
        setVisible(idx)
        setFading(false)
      }, 900)
    },
    [fading]
  )

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  useEffect(() => {
    const id = setInterval(() => {
      next()
    }, INTERVAL)
    return () => clearInterval(id)
  }, [next])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(420px, 68vh, 820px)" }}
      aria-label="Hero carousel"
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== visible}
          className="absolute inset-0 transition-opacity"
          style={{
            opacity: i === visible ? (fading ? 0 : 1) : 0,
            transitionDuration: "1800ms",
            transitionTimingFunction: "ease",
            zIndex: i === visible ? 1 : 0,
          }}
        >
          <Image
            src={slide.src}
            alt={slide.headline.replace("\n", " ")}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          {/* Gentle dark veil */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-foreground/10 to-transparent" />

          {/* Text */}
          <div className="absolute inset-0 flex flex-col justify-end pb-20 pl-14 gap-5">
            <h1
              className="text-background font-serif font-light leading-tight text-balance whitespace-pre-line"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {slide.headline}
            </h1>
            <p className="text-background/80 text-sm font-light tracking-widest max-w-xs">
              {slide.sub}
            </p>
            <div className="mt-2">
              <a
                href="/shop"
                className="inline-block border border-celadon text-background text-xs font-light tracking-[0.22em] uppercase px-7 py-3 hover:bg-celadon/20 transition-colors duration-500"
                style={{ color: "var(--celadon)" }}
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Arrow controls */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 text-background/70 hover:text-background transition-colors p-2"
      >
        <ChevronLeft className="w-7 h-7" strokeWidth={1} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 text-background/70 hover:text-background transition-colors p-2"
      >
        <ChevronRight className="w-7 h-7" strokeWidth={1} />
      </button>

      {/* Dots */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"
        role="tablist"
        aria-label="Slide indicators"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="transition-all duration-500"
            style={{
              width: i === current ? 20 : 6,
              height: 2,
              background: i === current
                ? "var(--celadon)"
                : "rgba(255,255,255,0.45)",
              borderRadius: 1,
            }}
          />
        ))}
      </div>
    </section>
  )
}
