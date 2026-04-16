export function MissionStrip() {
  return (
    <section
      className="bg-background w-full flex items-center justify-center px-8 py-24"
      aria-label="Mission statement"
    >
      <blockquote
        className="text-center font-serif font-light italic text-foreground text-balance"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(1.3rem, 2.6vw, 2.1rem)",
          letterSpacing: "0.06em",
          maxWidth: "820px",
          lineHeight: 1.55,
        }}
      >
        Thoughtfully curated for conscious living — every product, every brand, every practice.
      </blockquote>
    </section>
  )
}
