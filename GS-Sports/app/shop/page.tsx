"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { ChevronRight, Home, Filter } from "lucide-react"

// Import all product data from categories
const cricketCategoryData: Record<string, { name: string; products: any[] }> = {
  bats: {
    name: "Cricket Bats",
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
    name: "Batting Inners",
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
    name: "Abdominal Guard",
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

const clothingCategoryData: Record<string, { name: string; products: any[] }> = {
  trousers: {
    name: "Trousers",
    products: [
      { id: "trou-1", name: "Professional White Trouser", description: "Official cricket trousers with premium fit", price: 1499, image: "/images/trouser.png" },
      { id: "trou-2", name: "Comfort Trouser", description: "Comfortable fit trousers for extended play", price: 999, image: "/images/trouser.png" },
      { id: "trou-3", name: "Premium Trouser", description: "High-quality white trousers with durability", price: 1999, image: "/images/trouser.png" },
      { id: "trou-4", name: "Training Trouser", description: "Practice trousers with flexibility", price: 799, image: "/images/trouser.png" },
      { id: "trou-5", name: "Tournament Trouser", description: "Competition-grade trousers", price: 1699, image: "/images/trouser.png" },
      { id: "trou-6", name: "Youth Trouser", description: "Sized for young players", price: 699, image: "/images/trouser.png" },
      { id: "trou-7", name: "Elite Cricket Trouser", description: "Professional level trousers", price: 2199, image: "/images/trouser.png" },
      { id: "trou-8", name: "Classic White Trouser", description: "Traditional design with modern comfort", price: 1299, image: "/images/trouser.png" },
    ],
  },
  tshirt: {
    name: "T-Shirts",
    products: [
      { id: "tshirt-1", name: "Professional Cricket T-Shirt", description: "Premium cotton t-shirt for cricket", price: 899, image: "/images/trouser.png" },
      { id: "tshirt-2", name: "Training T-Shirt", description: "Moisture-wicking training t-shirt", price: 699, image: "/images/trouser.png" },
      { id: "tshirt-3", name: "Premium T-Shirt", description: "High-quality cricket t-shirt", price: 1199, image: "/images/trouser.png" },
      { id: "tshirt-4", name: "Casual Cricket T-Shirt", description: "Comfortable casual wear", price: 599, image: "/images/trouser.png" },
      { id: "tshirt-5", name: "Tournament T-Shirt", description: "Competition-grade t-shirt", price: 999, image: "/images/trouser.png" },
      { id: "tshirt-6", name: "Youth T-Shirt", description: "Sized for young players", price: 499, image: "/images/trouser.png" },
      { id: "tshirt-7", name: "Elite Cricket T-Shirt", description: "Professional level t-shirt", price: 1399, image: "/images/trouser.png" },
      { id: "tshirt-8", name: "Classic T-Shirt", description: "Traditional design with modern fit", price: 799, image: "/images/trouser.png" },
    ],
  },
}

// Function to shuffle array randomly
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([0, 15000])
  const [sortBy, setSortBy] = useState("random")

  // Combine all products from all categories
  useEffect(() => {
    const products: any[] = []
    
    // Add cricket products
    Object.values(cricketCategoryData).forEach((category) => {
      products.push(...category.products)
    })
    
    // Add clothing products
    Object.values(clothingCategoryData).forEach((category) => {
      products.push(...category.products)
    })
    
    // Shuffle products randomly
    const shuffled = shuffleArray(products)
    setAllProducts(shuffled)
    setFilteredProducts(shuffled)
  }, [])

  // Filter and sort products
  useEffect(() => {
    let filtered = [...allProducts]

    // Filter by category
    if (selectedCategory !== "all") {
      if (selectedCategory.startsWith("cricket-")) {
        const categorySlug = selectedCategory.replace("cricket-", "")
        const category = cricketCategoryData[categorySlug]
        if (category) {
          filtered = category.products
        }
      } else if (selectedCategory.startsWith("clothing-")) {
        const categorySlug = selectedCategory.replace("clothing-", "")
        const category = clothingCategoryData[categorySlug]
        if (category) {
          filtered = category.products
        }
      }
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      // Random order
      filtered = shuffleArray(filtered)
    }

    setFilteredProducts(filtered)
  }, [allProducts, selectedCategory, priceRange, sortBy])

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4" />}
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

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop All Products</h1>
          <p className="text-lg text-gray-600">Browse our complete collection of cricket equipment and clothing</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d5f600]"
                >
                  <option value="all">All Products</option>
                  <optgroup label="Cricket">
                    <option value="cricket-bats">Bats</option>
                    <option value="cricket-gloves">Gloves</option>
                    <option value="cricket-pads">Pads</option>
                    <option value="cricket-thigh-pads">Thigh Pads</option>
                    <option value="cricket-inners">Inners</option>
                    <option value="cricket-abdominal-guard">Abdominal Guard</option>
                    <option value="cricket-bat-grips">Bat Grips</option>
                  </optgroup>
                  <optgroup label="Clothing">
                    <option value="clothing-trousers">Trousers</option>
                    <option value="clothing-tshirt">T-Shirts</option>
                  </optgroup>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Min: ₹{priceRange[0]}</label>
                    <input
                      type="range"
                      min="0"
                      max="15000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max: ₹{priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="15000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Sort and Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d5f600]"
              >
                <option value="random">Random</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

