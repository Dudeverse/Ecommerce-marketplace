"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface ProductCard {
  src: string
  brand: string
  name: string
  price: string
  originalPrice?: string
  label?: string
  labelColor?: "celadon" | "clay"
}

interface BoundedProductCarouselProps {
  heading: string
  products: ProductCard[]
  visibleCount?: number
}

const TRANSITION_MS = 480

export function BoundedProductCarousel({
  heading,
  products,
  visibleCount = 4,
}: BoundedProductCarouselProps) {
  const [index, setIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)

  const maxIndex = Math.max(0, products.length - visibleCount)

  const go = useCallback(
    (dir: 1 | -1) => {
      if (isAnimating) return
      const next = Math.max(0, Math.min(maxIndex, index + dir))
      if (next === index) return
      setDirection(dir)
      setIsAnimating(true)
      setIndex(next)
      setTimeout(() => setIsAnimating(false), TRANSITION_MS + 20)
    },
    [isAnimating, index, maxIndex]
  )

  const TILE_W = 100 / visibleCount
  const translateX = -index * TILE_W

  const atStart = index === 0
  const atEnd = index === maxIndex

  return (
    <section className="w-full py-20" aria-label={heading}>
      <h2 className="text-center text-foreground font-light tracking-[0.18em] uppercase text-sm mb-12">
        {heading}
      </h2>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous products"
          aria-disabled={atStart}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 transition-opacity duration-300"
          style={{ opacity: atStart ? 0 : 1, pointerEvents: atStart ? "none" : "auto" }}
        >
          <ChevronLeft className="w-5 h-5 text-foreground" strokeWidth={1} />
        </button>

        {/* Clip window */}
        <div className="overflow-hidden mx-12">
          <div
            className="flex"
            style={{
              width: `${(products.length / visibleCount) * 100}%`,
              transform: `translateX(${translateX}%)`,
              transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            }}
          >
            {products.map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / products.length}%` }}
              >
                <article className="bg-card group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={p.src}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes={`${Math.round(100 / visibleCount)}vw`}
                    />
                  </div>
                  <div className="pt-4 pb-6 px-1 flex flex-col gap-1">
                    {p.label && (
                      <span
                        className="text-[10px] font-light tracking-widest uppercase"
                        style={{
                          color:
                            p.labelColor === "celadon"
                              ? "var(--celadon)"
                              : "var(--clay)",
                        }}
                      >
                        {p.label}
                      </span>
                    )}
                    <p className="text-foreground/50 text-[9px] font-light tracking-[0.18em] uppercase">
                      {p.brand}
                    </p>
                    <h3
                      className="text-foreground font-serif font-light leading-snug"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "1.05rem",
                      }}
                    >
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {p.originalPrice && (
                        <span
                          className="text-foreground/35 text-xs font-light line-through"
                        >
                          {p.originalPrice}
                        </span>
                      )}
                      <span className="text-foreground/60 text-xs font-light">
                        {p.price}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => go(1)}
          aria-label="Next products"
          aria-disabled={atEnd}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 transition-opacity duration-300"
          style={{ opacity: atEnd ? 0 : 1, pointerEvents: atEnd ? "none" : "auto" }}
        >
          <ChevronRight className="w-5 h-5 text-foreground" strokeWidth={1} />
        </button>
      </div>
    </section>
  )
}
