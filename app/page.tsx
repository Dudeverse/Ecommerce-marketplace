import { SiteHeader } from "@/components/site-header"
import { PromoBanner } from "@/components/promo-banner"
import { HeroCarousel } from "@/components/hero-carousel"
import { MissionStrip } from "@/components/mission-strip"
import { InfiniteSliderCarousel } from "@/components/infinite-slider-carousel"
import { FeaturedBrands } from "@/components/featured-brands"
import { BoundedProductCarousel } from "@/components/bounded-product-carousel"
import { EditorialBreaker } from "@/components/editorial-breaker"
import { ShopStyles } from "@/components/shop-styles"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { NewsletterSection } from "@/components/newsletter-section"
import { SiteFooter } from "@/components/site-footer"
import type { ProductCard } from "@/components/bounded-product-carousel"

// ── Data ────────────────────────────────────────────────────────────────────

const practiceTiles = [
  { src: "/images/practice-sustainable.jpg", label: "Sustainable" },
  { src: "/images/practice-organic.jpg", label: "Organic" },
  { src: "/images/practice-fairtrade.jpg", label: "Fair-Trade" },
  { src: "/images/practice-nontoxic.jpg", label: "Non-Toxic" },
  { src: "/images/practice-nomicro.jpg", label: "Non-Microplastics" },
]

const categoryTiles = [
  { src: "/images/cat-activewear.jpg", label: "Active Wear" },
  { src: "/images/cat-bathroom.jpg", label: "Bathroom" },
  { src: "/images/cat-undergarments.jpg", label: "Undergarments" },
  { src: "/images/cat-kitchen.jpg", label: "Kitchen" },
  { src: "/images/cat-furniture.jpg", label: "Furniture" },
]

const customerFavorites: ProductCard[] = [
  {
    src: "/images/product-rug.jpg",
    brand: "Bluey",
    name: "Fair Trade Rug",
    price: "$25",
  },
  {
    src: "/images/product-sneakers.jpg",
    brand: "Ary",
    name: "Rubber Sneakers",
    price: "$125",
  },
  {
    src: "/images/product-ceramic.jpg",
    brand: "Earthen",
    name: "Ceramic Pot",
    price: "$25",
  },
  {
    src: "/images/product-babyset.jpg",
    brand: "Jennie",
    name: "Organic Baby Set",
    price: "$25",
  },
]

const trendingProducts: ProductCard[] = [
  {
    src: "/images/trending-1.jpg",
    brand: "Wove",
    name: "Hand-Embroidered Tote",
    price: "$68",
    label: "Trending",
    labelColor: "celadon",
  },
  {
    src: "/images/trending-2.jpg",
    brand: "Lumé",
    name: "Beeswax Candle Set",
    price: "$42",
    label: "Trending",
    labelColor: "celadon",
  },
  {
    src: "/images/trending-3.jpg",
    brand: "Flock & Field",
    name: "Undyed Wool Throw",
    price: "$185",
    label: "Trending",
    labelColor: "celadon",
  },
  {
    src: "/images/trending-4.jpg",
    brand: "Rivulet",
    name: "Bamboo Glass Bottle",
    price: "$38",
    label: "Trending",
    labelColor: "celadon",
  },
]

const dealProducts: ProductCard[] = [
  {
    src: "/images/deal-1.jpg",
    brand: "Earthen",
    name: "Ceramic Plate Set",
    price: "$55",
    originalPrice: "$88",
    label: "Sale",
    labelColor: "clay",
  },
  {
    src: "/images/deal-2.jpg",
    brand: "Herbivore",
    name: "Botanical Skincare",
    price: "$34",
    originalPrice: "$58",
    label: "Sale",
    labelColor: "clay",
  },
  {
    src: "/images/deal-3.jpg",
    brand: "Spun",
    name: "Hand-Spun Wool Yarn",
    price: "$19",
    originalPrice: "$32",
    label: "Sale",
    labelColor: "clay",
  },
  {
    src: "/images/deal-4.jpg",
    brand: "Soften",
    name: "Linen Pillow Covers",
    price: "$28",
    originalPrice: "$48",
    label: "Sale",
    labelColor: "clay",
  },
]

// ── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      <SiteHeader />

      <PromoBanner />

      <HeroCarousel />

      <MissionStrip />

      <InfiniteSliderCarousel
        heading="Shop by Practice"
        tiles={practiceTiles}
        visibleCount={4}
      />

      <div
        className="w-full"
        style={{ borderTop: "1px solid var(--border)" }}
      />

      <InfiniteSliderCarousel
        heading="Top Categories"
        tiles={categoryTiles}
        visibleCount={4}
      />

      <FeaturedBrands />

      <BoundedProductCarousel
        heading="Customer Favorites"
        products={customerFavorites}
        visibleCount={4}
      />

      <EditorialBreaker />

      <BoundedProductCarousel
        heading="Trending Now"
        products={trendingProducts}
        visibleCount={4}
      />

      <BoundedProductCarousel
        heading="Shop Deals"
        products={dealProducts}
        visibleCount={4}
      />

      <ShopStyles />

      <TestimonialsCarousel />

      <NewsletterSection />

      <SiteFooter />
    </main>
  )
}
