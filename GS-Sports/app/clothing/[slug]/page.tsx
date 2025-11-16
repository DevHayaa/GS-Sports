"use client"

import { use } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { ChevronRight, Home } from "lucide-react"

// Product data for all clothing categories
const clothingCategoryData: Record<string, { name: string; description: string; products: any[] }> = {
  trousers: {
    name: "Trousers",
    description: "Professional cricket trousers for all occasions",
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
    description: "Comfortable cricket t-shirts for practice and casual wear",
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

export default function ClothingCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const category = clothingCategoryData[slug]

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
    { label: "Clothing", href: "/clothing" },
    { label: category.name, href: `/clothing/${slug}` },
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

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-lg text-gray-600">{category.description}</p>
        </div>

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

