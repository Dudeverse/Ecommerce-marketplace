"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Tile {
  src: string
  label: string
}

interface InfiniteSliderCarouselProps {
  heading: string
  tiles: Tile[]
  visibleCount?: number
}

export function InfiniteSliderCarousel({
  heading,
  tiles,
  visibleCount = 4,
}: InfiniteSliderCarouselProps) {
  const [offset, setOffset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // We build a tripled array so the infinite wrap works seamlessly
  const tripledTiles = [...tiles, ...tiles, ...tiles]
  const total = tiles.length

  const TILE_WIDTH = 100 / visibleCount // percent
  const TRANSITION_MS = 540

  const shift = useCallback(
    (direction: 1 | -1) => {
      if (isAnimating) return
      setIsAnimating(true)
      setOffset((prev) => prev + direction)

      setTimeout(() => {
        setIsAnimating(false)
        // Teleport without animation if we've drifted too far
        setOffset((prev) => {
          if (prev >= total) return prev - total
          if (prev <= -total) return prev + total
          return prev
        })
      }, TRANSITION_MS + 20)
    },
    [isAnimating, total]
  )

  // translateX in %, anchored to the middle set (offset = total gives us the start of the 2nd set)
  const translateX = -(total + offset) * TILE_WIDTH

  return (
    <section className="w-full py-16 overflow-hidden" aria-label={heading}>
      {/* Heading */}
      <h2
        className="text-center text-foreground font-light tracking-[0.18em] uppercase text-sm mb-10"
      >
        {heading}
      </h2>

      {/* Track wrapper */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => shift(-1)}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-foreground/50 hover:text-foreground transition-colors p-1"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1} />
        </button>

        {/* Clipping window */}
        <div className="overflow-hidden mx-12">
          {/* Sliding track */}
          <div
            ref={trackRef}
            className="flex"
            style={{
              width: `${(tripledTiles.length / visibleCount) * 100}%`,
              transform: `translateX(${translateX}%)`,
              transition: isAnimating
                ? `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
                : "none",
            }}
          >
            {tripledTiles.map((tile, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-3 group cursor-pointer"
                style={{ width: `${100 / tripledTiles.length}%` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={tile.src}
                    alt={tile.label}
                    fill
                    className="object-cover"
                    sizes={`${Math.round(100 / visibleCount)}vw`}
                  />
                </div>
                <p
                  className="text-foreground/70 text-xs font-light tracking-widest uppercase mt-3 pb-0.5 inline-block transition-all duration-300 group-hover:text-foreground"
                  style={{
                    borderBottom: "1px solid transparent",
                  }}
                >
                  <span
                    className="group-hover:border-celadon"
                    style={{
                      display: "inline-block",
                      borderBottom: "1px solid transparent",
                      transition: "border-color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.borderColor =
                        "var(--celadon)"
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.borderColor =
                        "transparent"
                    }}
                  >
                    {tile.label}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => shift(1)}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-foreground/50 hover:text-foreground transition-colors p-1"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1} />
        </button>
      </div>
    </section>
  )
}
