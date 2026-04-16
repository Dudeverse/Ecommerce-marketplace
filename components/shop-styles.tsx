"use client"

import { useState } from "react"
import Image from "next/image"

const styles = [
  { label: "Minimalistic", src: "/images/style-minimalistic.jpg" },
  { label: "Leisurewear", src: "/images/style-leisurewear.jpg" },
  { label: "Athleisure", src: "/images/style-athleisure.jpg" },
  { label: "Individualistic", src: "/images/style-individualistic.jpg" },
  { label: "Street Wear", src: "/images/style-streetwear.jpg" },
  { label: "Classic & Business Casual", src: "/images/style-classic.jpg" },
]

export function ShopStyles() {
  const [selected, setSelected] = useState(0)

  return (
    <section className="w-full py-20 px-8" aria-label="Shop by style">
      <h2 className="text-center text-foreground font-light tracking-[0.18em] uppercase text-sm mb-12">
        Shop Styles
      </h2>

      {/* Featured image */}
      <div
        className="relative w-full overflow-hidden mb-8"
        style={{ height: "clamp(260px, 50vw, 580px)", maxHeight: 580 }}
      >
        {styles.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: i === selected ? 1 : 0,
              transitionDuration: "700ms",
              transitionTimingFunction: "ease",
              zIndex: i === selected ? 1 : 0,
            }}
            aria-hidden={i !== selected}
          >
            <Image
              src={s.src}
              alt={s.label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>
        ))}
      </div>

      {/* Chip row */}
      <div
        className="flex flex-wrap items-center justify-center gap-3"
        role="group"
        aria-label="Style filter"
      >
        {styles.map((s, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            aria-pressed={i === selected}
            className="px-5 py-2 text-xs font-light tracking-widest uppercase transition-all duration-300"
            style={{
              border: "1px solid var(--foreground)",
              background: i === selected ? "var(--foreground)" : "var(--background)",
              color: i === selected ? "var(--background)" : "var(--foreground)",
              letterSpacing: "0.14em",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </section>
  )
}
