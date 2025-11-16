"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Cricket Bats",
    description: "Professional grade bats for all formats",
    image: "/professional-cricket-bat.png",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    name: "Shoes",
    description: "High-performance cricket footwear",
    image: "/cricket-shoes-athletic.jpg",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: 3,
    name: "Protective Gear",
    description: "Pads, gloves, and safety equipment",
    image: "/cricket-protective-gear.jpg",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 4,
    name: "Uniforms",
    description: "Premium cricket kits and apparel",
    image: "/cricket-uniform-kit.jpg",
    color: "from-pink-500 to-pink-600",
  },
]

const products = [
  {
    id: 1,
    name: "Elite Pro Bat",
    price: "$299",
    rating: 4.8,
    reviews: 124,
    image: "/professional-cricket-bat.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Performance Shoes",
    price: "$149",
    rating: 4.6,
    reviews: 89,
    image: "/cricket-shoes-performance.jpg",
    badge: "New",
  },
  {
    id: 3,
    name: "Pro Batting Gloves",
    price: "$89",
    rating: 4.7,
    reviews: 156,
    image: "/cricket-batting-gloves.png",
    badge: null,
  },
  {
    id: 4,
    name: "Complete Kit Bag",
    price: "$199",
    rating: 4.5,
    reviews: 67,
    image: "/cricket-kit-bag.jpg",
    badge: "Sale",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Categories */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Shop by Category</h2>
            <Link
              href="/categories"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative overflow-hidden rounded-xl h-64 md:h-72 cursor-pointer"
              >
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm md:text-base">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Products</h2>
            <Link
              href="/products"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="relative overflow-hidden rounded-lg bg-muted mb-4 h-56 sm:h-64">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {product.badge}
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-primary">{product.price}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
