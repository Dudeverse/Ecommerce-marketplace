import Image from "next/image"

export function PromoBanner() {
  return (
    <section className="grid grid-cols-2 w-full" aria-label="Promotional banner">
      {/* Left — messaging */}
      <div className="bg-background flex flex-col justify-center px-16 py-14 gap-4">
        <h2
          className="text-foreground font-serif font-light leading-tight text-balance"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)",
            letterSpacing: "-0.01em",
          }}
        >
          Wellness &amp; Eco-Conscious Made
        </h2>
        <p className="text-muted-foreground text-sm font-light tracking-wide leading-relaxed max-w-xs">
          Discover brands that honour the earth, the maker, and the everyday ritual.
        </p>
        <p className="text-foreground text-xs font-light tracking-widest uppercase mt-2">
          Free Shipping Orders Over $150+
        </p>
      </div>

      {/* Right — sponsor ad */}
      <div className="relative bg-secondary overflow-hidden aspect-[4/3]">
        <Image
          src="/images/promo-product.jpg"
          alt="Conscious sponsor product"
          fill
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-foreground/10" />
        <span
          className="absolute bottom-5 right-6 text-[10px] font-light tracking-widest uppercase"
          style={{ color: "var(--clay)" }}
        >
          Conscious Sponsor
        </span>
      </div>
    </section>
  )
}
