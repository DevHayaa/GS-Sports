"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { ChevronRight, Home, Filter } from "lucide-react"
import { getProducts, getCategories } from "@/services/apiService"


export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([0, 15000])
  const [sortBy, setSortBy] = useState("random")
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)

  // Fetch products and categories from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch categories
        const categoriesResponse = await getCategories()
        if (categoriesResponse.success && categoriesResponse.data?.categories) {
          setCategories(categoriesResponse.data.categories)
        }

        // Fetch products
        const productsResponse = await getProducts({
          page: currentPage,
          limit: 50,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          category: selectedCategory !== "all" ? selectedCategory : undefined
        })
        
        if (productsResponse.success && productsResponse.data?.products) {
          const products = productsResponse.data.products.map((product: any) => ({
            id: product._id,
            slug: product.slug,
            name: product.name,
            description: product.description,
            price: product.discountPrice || product.price,
            originalPrice: product.discountPrice ? product.price : undefined,
            image: product.images?.[0] || "/placeholder.jpg",
            category: product.category,
            inStock: product.stock > 0
          }))
          setAllProducts(products)
          setFilteredProducts(products)
          setPagination(productsResponse.data.pagination)
        }
      } catch (error: any) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
        }
      }

    fetchData()
  }, [currentPage, priceRange, selectedCategory])

  // Sort products
  useEffect(() => {
    let sorted = [...allProducts]

    // Sort products
    if (sortBy === "price-low") {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => b.price - a.price)
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(sorted)
  }, [allProducts, sortBy])

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
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
              Shop All Products
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 text-balance drop-shadow-md">
              Browse our complete collection of cricket equipment and clothing
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
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d5f600]"
                >
                  <option value="all">All Products</option>
                  {categories.map((category) => (
                    <optgroup key={category._id} label={category.name}>
                      {category.subCategories?.map((subCat: any) => (
                        <option key={subCat._id} value={subCat.slug}>
                          {subCat.name}
                        </option>
                      ))}
                  </optgroup>
                  ))}
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
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
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
                {/* Pagination */}
                {pagination && pagination.pages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 text-gray-700">
                      Page {currentPage} of {pagination.pages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                      disabled={currentPage === pagination.pages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
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

