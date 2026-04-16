"use client"

import { useState } from "react"
import { Search, ShoppingBag, ChevronDown } from "lucide-react"

const navLinks = [
  "New", "Women", "Men", "Beauty", "Shoes",
  "Accessories", "Kids", "Home", "Brands", "Kitchen",
]

export function SiteHeader() {
  const [cartCount] = useState(2)

  return (
    <header className="bg-background w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <span
            className="text-foreground font-serif text-2xl font-light leading-none select-none"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            h
          </span>
          <span
            className="text-foreground tracking-[0.18em] text-sm font-light uppercase"
            style={{ letterSpacing: "0.18em" }}
          >
            havenhues
          </span>
        </a>

        {/* Right controls */}
        <nav className="flex items-center gap-6" aria-label="Top navigation">
          <a
            href="/about"
            className="text-foreground text-xs font-light tracking-widest uppercase hover:opacity-60 transition-opacity"
          >
            About
          </a>
          <button className="flex items-center gap-1 text-foreground text-xs font-light tracking-widest uppercase hover:opacity-60 transition-opacity">
            Sign In
            <ChevronDown className="w-3 h-3" strokeWidth={1.2} />
          </button>
          <button
            aria-label="Search"
            className="text-foreground hover:opacity-60 transition-opacity"
          >
            <Search className="w-4 h-4" strokeWidth={1.2} />
          </button>
          <button
            aria-label={`Cart, ${cartCount} items`}
            className="relative text-foreground hover:opacity-60 transition-opacity"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.2} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-foreground text-background text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-light">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Nav bar */}
      <nav
        className="border-t border-border px-8 py-3 flex items-center justify-center gap-8"
        aria-label="Main navigation"
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={`/${link.toLowerCase()}`}
            className="text-foreground text-xs font-light tracking-[0.14em] uppercase whitespace-nowrap hover:opacity-50 transition-opacity"
          >
            {link}
          </a>
        ))}
      </nav>
    </header>
  )
}
