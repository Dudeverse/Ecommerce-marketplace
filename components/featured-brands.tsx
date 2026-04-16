"use client"

import { useState, useEffect, useCallback, useRef } from "react"

const brands = [
  "Aesop", "Patagonia", "Avocado", "Allbirds", "Reformation",
  "Pela Case", "Meow Meow Tweet", "Bite Beauty", "Tentree", "Nau",
  "Prana", "Eileen Fisher", "Burt's Bees", "Dr. Bronner's", "Ilia Beauty",
]

const VISIBLE = 5
const INTERVAL_MS = 2200
const TRANSITION_MS = 600

export function FeaturedBrands() {
  const [offset, setOffset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const pausedRef = useRef(false)

  const tripledBrands = [...brands, ...brands, ...brands]

  const shift = useCallback(
    (dir: 1 | -1 = 1) => {
      if (isAnimating) return
      setIsAnimating(true)
      setOffset((prev) => prev + dir)
      setTimeout(() => {
        setIsAnimating(false)
        setOffset((prev) => {
          if (prev >= brands.length) return prev - brands.length
          if (prev <= -brands.length) return prev + brands.length
          return prev
        })
      }, TRANSITION_MS + 20)
    },
    [isAnimating]
  )

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) shift(1)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [shift])

  const handleManualClick = () => {
    pausedRef.current = true
    shift(1)
    setTimeout(() => {
      pausedRef.current = false
    }, 3000)
  }

  const TILE_W = 100 / VISIBLE
  const translateX = -(brands.length + offset) * TILE_W

  return (
    <section className="w-full py-20 bg-secondary/30" aria-label="Featured brands">
      <div className="text-center mb-2">
        <h2 className="text-foreground font-light tracking-[0.18em] uppercase text-sm">
          Brands We Love
        </h2>
        <p className="text-stone text-xs font-light tracking-wide mt-3"
          style={{ color: "var(--stone)" }}
        >
          850+ conscious brands, all in one place
        </p>
      </div>

      <div
        className="overflow-hidden mt-12 cursor-pointer"
        onClick={handleManualClick}
        role="button"
        tabIndex={0}
        aria-label="Click to advance brands"
        onKeyDown={(e) => e.key === "Enter" && handleManualClick()}
      >
        <div
          className="flex"
          style={{
            width: `${(tripledBrands.length / VISIBLE) * 100}%`,
            transform: `translateX(${translateX}%)`,
            transition: isAnimating
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
              : "none",
          }}
        >
          {tripledBrands.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: `${100 / tripledBrands.length}%` }}
            >
              <div className="px-8 py-6 flex items-center justify-center">
                <span
                  className="text-foreground/50 font-light tracking-widest text-xs uppercase whitespace-nowrap hover:text-foreground transition-colors duration-300"
                  style={{ letterSpacing: "0.16em" }}
                >
                  {brand}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
