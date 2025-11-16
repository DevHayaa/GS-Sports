"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { ChevronRight, Home } from "lucide-react"

// Product data for all cricket categories
const cricketCategoryData: Record<string, { name: string; description: string; products: any[] }> = {
  bats: {
    name: "Cricket Bats",
    description: "Professional grade cricket bats for all formats",
    products: [
      { id: "bat-1", name: "Professional Cricket Bat", description: "High-quality English willow bat with superior balance", price: 8999, image: "/images/bat-category.jpg" },
      { id: "bat-2", name: "Tournament Bat", description: "Perfect for competitive play with enhanced power", price: 6499, image: "/images/bat-category.jpg" },
      { id: "bat-3", name: "Training Bat", description: "Ideal for practice sessions and skill development", price: 3999, image: "/images/bat-category.jpg" },
      { id: "bat-4", name: "Junior Cricket Bat", description: "Designed for young players with lightweight construction", price: 2499, image: "/images/bat-category.jpg" },
      { id: "bat-5", name: "Power Hitter Bat", description: "Maximum hitting power with premium willow", price: 9999, image: "/images/bat-category.jpg" },
      { id: "bat-6", name: "Classic Bat", description: "Traditional design and feel for classic players", price: 5999, image: "/images/bat-category.jpg" },
      { id: "bat-7", name: "Premium English Willow", description: "Top-tier English willow with perfect grain", price: 11999, image: "/images/bat-category.jpg" },
      { id: "bat-8", name: "Kashmir Willow Bat", description: "Affordable quality with Kashmir willow", price: 3499, image: "/images/bat-category.jpg" },
    ],
  },
  gloves: {
    name: "Batting Gloves",
    description: "Professional batting gloves for maximum protection",
    products: [
      { id: "glove-1", name: "Batting Gloves Pro", description: "Professional batting gloves with superior padding", price: 1999, image: "/images/gloves-category.jpg" },
      { id: "glove-2", name: "Wicket Keeper Gloves", description: "Specialized keeper gloves with extra protection", price: 2999, image: "/images/gloves-category.jpg" },
      { id: "glove-3", name: "Training Gloves", description: "Durable training gloves for practice sessions", price: 1499, image: "/images/gloves-category.jpg" },
      { id: "glove-4", name: "Fielding Gloves", description: "Lightweight fielding gloves for agile movement", price: 999, image: "/images/gloves-category.jpg" },
      { id: "glove-5", name: "Premium Batting Gloves", description: "Top-tier batting protection with comfort", price: 3499, image: "/images/gloves-category.jpg" },
      { id: "glove-6", name: "Youth Gloves", description: "Sized for young players with safety features", price: 1299, image: "/images/gloves-category.jpg" },
      { id: "glove-7", name: "Tournament Gloves", description: "Competition-grade gloves for tournaments", price: 2499, image: "/images/gloves-category.jpg" },
      { id: "glove-8", name: "Classic Leather Gloves", description: "Traditional leather gloves with modern comfort", price: 1799, image: "/images/gloves-category.jpg" },
    ],
  },
  pads: {
    name: "Leg Pads",
    description: "Professional leg pads for batting protection",
    products: [
      { id: "pad-1", name: "Batting Pads", description: "Professional batting protection with premium padding", price: 2999, image: "/images/gloves-category.jpg" },
      { id: "pad-2", name: "Lightweight Pads", description: "Comfortable and light for extended play", price: 1999, image: "/images/gloves-category.jpg" },
      { id: "pad-3", name: "Tournament Pads", description: "Competition-grade pads for tournaments", price: 3999, image: "/images/gloves-category.jpg" },
      { id: "pad-4", name: "Training Pads", description: "Practice session pads with durability", price: 1499, image: "/images/gloves-category.jpg" },
      { id: "pad-5", name: "Premium Pads", description: "Maximum protection and comfort", price: 4999, image: "/images/gloves-category.jpg" },
      { id: "pad-6", name: "Youth Pads", description: "Sized for junior players", price: 1299, image: "/images/gloves-category.jpg" },
      { id: "pad-7", name: "Professional Pads", description: "Elite level protection for professionals", price: 4499, image: "/images/gloves-category.jpg" },
      { id: "pad-8", name: "Classic Pads", description: "Traditional design with modern materials", price: 2499, image: "/images/gloves-category.jpg" },
    ],
  },
  "thigh-pads": {
    name: "Thigh Pads",
    description: "Protective thigh pads for batting safety",
    products: [
      { id: "thigh-1", name: "Thigh Guard Pro", description: "Professional thigh protection with comfort", price: 1499, image: "/images/thigh-pads.png" },
      { id: "thigh-2", name: "Lightweight Thigh Guard", description: "Minimal weight protection", price: 999, image: "/images/thigh-pads.png" },
      { id: "thigh-3", name: "Premium Thigh Guard", description: "Maximum comfort and protection", price: 1999, image: "/images/thigh-pads.png" },
      { id: "thigh-4", name: "Training Thigh Guard", description: "Practice protection for training", price: 799, image: "/images/thigh-pads.png" },
      { id: "thigh-5", name: "Tournament Thigh Guard", description: "Competition-grade protection", price: 1699, image: "/images/thigh-pads.png" },
      { id: "thigh-6", name: "Youth Thigh Guard", description: "Sized for young players", price: 699, image: "/images/thigh-pads.png" },
      { id: "thigh-7", name: "Elite Thigh Guard", description: "Professional level thigh protection", price: 2199, image: "/images/thigh-pads.png" },
      { id: "thigh-8", name: "Comfort Thigh Guard", description: "Maximum comfort design", price: 1299, image: "/images/thigh-pads.png" },
    ],
  },
  inners: {
    name: "Batting Inners / Inner Gloves",
    description: "Inner gloves and compression wear for support",
    products: [
      { id: "inner-1", name: "Compression Inner", description: "Compression wear for support and comfort", price: 1299, image: "/images/gloves.png" },
      { id: "inner-2", name: "Moisture-Wicking Inner", description: "Breathable inner wear for comfort", price: 999, image: "/images/gloves.png" },
      { id: "inner-3", name: "Premium Inner Wear", description: "High-quality compression inner", price: 1699, image: "/images/gloves.png" },
      { id: "inner-4", name: "Training Inner", description: "Comfortable training wear", price: 799, image: "/images/gloves.png" },
      { id: "inner-5", name: "Tournament Inner", description: "Professional-grade inner wear", price: 1499, image: "/images/gloves.png" },
      { id: "inner-6", name: "Youth Inner", description: "Sized for junior players", price: 699, image: "/images/gloves.png" },
      { id: "inner-7", name: "Elite Inner Gloves", description: "Top-tier inner gloves", price: 1899, image: "/images/gloves.png" },
      { id: "inner-8", name: "Comfort Inner", description: "Maximum comfort inner wear", price: 1199, image: "/images/gloves.png" },
    ],
  },
  "abdominal-guard": {
    name: "Abdominal Guard (Box)",
    description: "Protective abdominal guards for safety",
    products: [
      { id: "abd-1", name: "Professional Abdominal Guard", description: "Full protection guard with comfort", price: 1999, image: "/images/thigh-pads.png" },
      { id: "abd-2", name: "Lightweight Guard", description: "Minimal weight protection", price: 1499, image: "/images/thigh-pads.png" },
      { id: "abd-3", name: "Premium Guard", description: "Maximum protection and comfort", price: 2499, image: "/images/thigh-pads.png" },
      { id: "abd-4", name: "Training Guard", description: "Practice protection", price: 1199, image: "/images/thigh-pads.png" },
      { id: "abd-5", name: "Tournament Guard", description: "Competition-grade guard", price: 2199, image: "/images/thigh-pads.png" },
      { id: "abd-6", name: "Youth Guard", description: "Sized for junior players", price: 999, image: "/images/thigh-pads.png" },
      { id: "abd-7", name: "Elite Abdominal Guard", description: "Professional level protection", price: 2799, image: "/images/thigh-pads.png" },
      { id: "abd-8", name: "Comfort Guard", description: "Maximum comfort design", price: 1799, image: "/images/thigh-pads.png" },
    ],
  },
  "bat-grips": {
    name: "Bat Grips",
    description: "Professional bat grips for better control",
    products: [
      { id: "grip-1", name: "Bat Grip Pro", description: "Professional bat grip with superior feel", price: 499, image: "/images/bat-category.jpg" },
      { id: "grip-2", name: "Comfort Grip", description: "Comfortable bat grip for extended play", price: 399, image: "/images/bat-category.jpg" },
      { id: "grip-3", name: "Premium Grip", description: "High-quality bat grip", price: 699, image: "/images/bat-category.jpg" },
      { id: "grip-4", name: "Training Grip", description: "Practice bat grip", price: 299, image: "/images/bat-category.jpg" },
      { id: "grip-5", name: "Tournament Grip", description: "Competition-grade grip", price: 599, image: "/images/bat-category.jpg" },
      { id: "grip-6", name: "Multi-Pack Grips", description: "Pack of 3 grips for value", price: 1199, image: "/images/bat-category.jpg" },
      { id: "grip-7", name: "Elite Bat Grip", description: "Top-tier bat grip", price: 799, image: "/images/bat-category.jpg" },
      { id: "grip-8", name: "Classic Grip", description: "Traditional bat grip design", price: 449, image: "/images/bat-category.jpg" },
    ],
  },
}

export default function CricketCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const category = cricketCategoryData[slug]

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-[#d5f600] text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-[#c5e600] transition-colors">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Cricket", href: "/cricket" },
    { label: category.name, href: `/cricket/${slug}` },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[250px] sm:h-[300px] md:h-[400px] bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="text-center max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white drop-shadow-lg">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 text-balance drop-shadow-md">
              {category.description}
            </p>
          </div>
        </div>
      </section>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 flex-wrap">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />}
              <Link
                href={item.href}
                className={`hover:text-gray-900 transition-colors ${
                  index === breadcrumbItems.length - 1 ? "text-gray-900 font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{category.products.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

