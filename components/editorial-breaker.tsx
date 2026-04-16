import Image from "next/image"

export function EditorialBreaker() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(320px, 52vh, 600px)" }}
      aria-label="Editorial section"
    >
      <Image
        src="/images/editorial-breaker.jpg"
        alt="Cracked clay earth with moss — living well starts with choosing well"
        fill
        className="object-cover"
        sizes="100vw"
      />
      {/* Subtle veil */}
      <div className="absolute inset-0 bg-foreground/25" />

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p
          className="text-background font-serif font-light italic text-center text-balance px-8"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(1.4rem, 3.2vw, 2.8rem)",
            letterSpacing: "0.04em",
          }}
        >
          Living well starts with choosing well.
        </p>
      </div>
    </section>
  )
}
