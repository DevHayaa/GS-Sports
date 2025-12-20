"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { ChevronRight, Home } from "lucide-react"
import { getCategoryBySlug, getProducts } from "@/services/apiService"

export default function CricketCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [category, setCategory] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch category
        const categoryResponse = await getCategoryBySlug(slug)
        if (categoryResponse.success && categoryResponse.data?.category) {
          setCategory(categoryResponse.data.category)
          
          // Fetch products for this category
          const productsResponse = await getProducts({
            category: slug,
            limit: 50
          })
          
          if (productsResponse.success && productsResponse.data?.products) {
            const formattedProducts = productsResponse.data.products.map((product: any) => ({
              id: product._id,
              slug: product.slug,
              name: product.name,
              description: product.description,
              price: product.discountPrice || product.price,
              image: product.images?.[0] || "/placeholder.jpg"
            }))
            setProducts(formattedProducts)
          }
        }
      } catch (error: any) {
        console.error("Error fetching category:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchData()
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    )
  }

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
            {category.description && (
              <p className="text-sm sm:text-base md:text-lg text-white/90 text-balance drop-shadow-md">
                {category.description}
              </p>
            )}
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
            Showing <span className="font-semibold text-gray-900">{products.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.slug || product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

