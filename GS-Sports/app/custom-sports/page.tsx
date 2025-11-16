"use client"

import { useState } from "react"
import { Upload, Phone, Mail, MapPin, Star, Search, Grid3x3, List, X, Eye } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Portfolio Product Data
interface PortfolioProduct {
  id: number
  name: string
  category: string
  type: string
  colors: string[]
  image?: string
  description: string
  featured: boolean
}

const portfolioProducts: PortfolioProduct[] = [
  {
    id: 1,
    name: "Professional Jersey",
    category: "jersey",
    type: "Sublimation",
    colors: ["red", "white"],
    description: "Custom sublimated jersey with team logo",
    featured: true,
  },
  {
    id: 2,
    name: "Athletic Jacket",
    category: "jacket",
    type: "Printing",
    colors: ["grey", "black"],
    description: "Premium athletic jacket with custom printing",
    featured: true,
  },
  {
    id: 3,
    name: "Tournament Jersey",
    category: "jersey",
    type: "Sublimation",
    colors: ["blue", "white"],
    description: "High-performance tournament jersey",
    featured: false,
  },
  {
    id: 4,
    name: "Cricket Gear Set",
    category: "cricket",
    type: "Design",
    colors: ["white", "blue"],
    description: "Complete cricket equipment set",
    featured: true,
  },
  {
    id: 5,
    name: "Training Hoodie",
    category: "hoodie",
    type: "Printing",
    colors: ["black", "grey"],
    description: "Comfortable training hoodie",
    featured: false,
  },
  {
    id: 6,
    name: "Athletic Pants",
    category: "pants",
    type: "Design",
    colors: ["black"],
    description: "Professional athletic pants",
    featured: false,
  },
  {
    id: 7,
    name: "Team Hoodie",
    category: "hoodie",
    type: "Sublimation",
    colors: ["black", "white"],
    description: "Custom team hoodie with logo",
    featured: true,
  },
  {
    id: 8,
    name: "Patterned T-Shirt",
    category: "tshirt",
    type: "Sublimation",
    colors: ["purple", "pink", "red"],
    description: "Vibrant patterned t-shirt",
    featured: false,
  },
  {
    id: 9,
    name: "Polo Shirt",
    category: "polo",
    type: "Printing",
    colors: ["blue", "white"],
    description: "Classic polo with custom embroidery",
    featured: false,
  },
  {
    id: 10,
    name: "Sports Cap",
    category: "cap",
    type: "Embroidery",
    colors: ["black", "white"],
    description: "Custom embroidered cap",
    featured: false,
  },
  {
    id: 11,
    name: "Training Shorts",
    category: "shorts",
    type: "Printing",
    colors: ["black", "blue"],
    description: "Performance training shorts",
    featured: false,
  },
  {
    id: 12,
    name: "Championship Jersey",
    category: "jersey",
    type: "Sublimation",
    colors: ["gold", "black"],
    description: "Premium championship jersey",
    featured: true,
  },
]

const categories = [
  { id: "all", name: "All Products", count: portfolioProducts.length },
  { id: "jersey", name: "Jerseys", count: portfolioProducts.filter(p => p.category === "jersey").length },
  { id: "hoodie", name: "Hoodies", count: portfolioProducts.filter(p => p.category === "hoodie").length },
  { id: "polo", name: "Polo Shirts", count: portfolioProducts.filter(p => p.category === "polo").length },
  { id: "cap", name: "Caps", count: portfolioProducts.filter(p => p.category === "cap").length },
  { id: "cricket", name: "Cricket Gear", count: portfolioProducts.filter(p => p.category === "cricket").length },
]

const types = ["All", "Design", "Sublimation", "Printing", "Embroidery"]

// Helper function to render product visuals
function getProductVisual(product: PortfolioProduct, size: "small" | "large" | "default" = "default") {
  const sizeClass = size === "small" ? "w-16 h-16" : size === "large" ? "w-32 h-32" : "w-full h-full"
  
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      red: "from-red-500 to-red-700",
      blue: "from-blue-500 to-blue-700",
      black: "from-gray-800 to-black",
      grey: "from-gray-400 to-gray-600",
      white: "from-gray-100 to-gray-300",
      gold: "from-yellow-500 to-yellow-700",
      purple: "from-purple-400 via-pink-400 to-red-400",
      pink: "from-pink-400 to-pink-600",
    }
    return colorMap[color.toLowerCase()] || "from-gray-400 to-gray-600"
  }
  
  switch (product.category) {
    case "jersey":
      const jerseyColor = product.colors[0] || "red"
      const jerseyGradient = getColorClass(jerseyColor)
      return (
        <div className={`${sizeClass} bg-gradient-to-br ${jerseyGradient} rounded-lg flex items-center justify-center relative`}>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-xs font-bold">GS</span>
          </div>
        </div>
      )
    case "jacket":
      return (
        <div className={`${sizeClass} bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center relative`}>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-gray-600">A</span>
          </div>
        </div>
      )
    case "hoodie":
      return (
        <div className={`${sizeClass} bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center relative`}>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-gray-800">A</span>
          </div>
        </div>
      )
    case "cricket":
      return (
        <div className={`${sizeClass} rounded-lg flex flex-col items-center justify-center`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mb-2">
            <div className="w-6 h-6 bg-[#92d7f6] rounded-full"></div>
          </div>
          <div className="text-xs text-gray-600 font-semibold">CRICKET</div>
        </div>
      )
    case "pants":
      return <div className={`${sizeClass} bg-gradient-to-br from-gray-800 to-black rounded-lg`}></div>
    case "tshirt":
      return <div className={`${sizeClass} rounded-lg bg-gradient-to-br from-purple-400 via-pink-400 to-red-400`}></div>
    case "polo":
      return (
        <div className={`${sizeClass} bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center`}>
          <div className="text-white text-xs font-bold">POLO</div>
        </div>
      )
    case "cap":
      return (
        <div className={`${sizeClass} bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center`}>
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
      )
    case "shorts":
      return <div className={`${sizeClass} bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg`}></div>
    default:
      return <div className={`${sizeClass} bg-gray-300 rounded-lg`}></div>
  }
}

export default function CustomSportsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedProduct, setSelectedProduct] = useState<PortfolioProduct | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 8

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    productType: "",
    quantity: "",
    colors: "",
    sizes: "",
    logoDescription: "",
    specialRequirements: "",
    deadline: "",
  })

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        productType: "",
        quantity: "",
        colors: "",
        sizes: "",
        logoDescription: "",
        specialRequirements: "",
        deadline: "",
      })
      setSelectedFiles([])
    }, 3000)
  }

  const productTypes = [
    { value: "caps", label: "Caps" },
    { value: "sports-shirts", label: "Sports Shirts" },
    { value: "shorts", label: "Shorts" },
    { value: "hoodies", label: "Hoodies" },
    { value: "jerseys", label: "Jerseys" },
    { value: "polo-shirts", label: "Polo Shirts" },
    { value: "other", label: "Other" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Banner Image */}
      <section className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-r from-card to-card/50 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/customsport-banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-left max-w-2xl sm:max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 text-white drop-shadow-lg">
              Create Your Custom Sportswear
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/95 text-balance drop-shadow-md">
              Premium quality. Designed your way.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#92d7f6]/10 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Portfolio Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">CUSTOM SPORTS PORTFOLIO</h2>
              
              {/* Search and View Toggle */}
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 md:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none w-full md:w-64"
                  />
                </div>
                
                {/* View Toggle */}
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "grid" ? "bg-[#92d7f6] text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "list" ? "bg-[#92d7f6] text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 mb-6 pb-6 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-700 mr-2">Filter by Category:</span>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-[#92d7f6] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm font-semibold text-gray-700 mr-2">Filter by Type:</span>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type)
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedType === type
                      ? "bg-[#92d7f6] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Filtered Products */}
            {(() => {
              const filtered = portfolioProducts.filter((product) => {
                const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
                const matchesType = selectedType === "All" || product.type === selectedType
                const matchesSearch = searchQuery === "" || 
                  product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.description.toLowerCase().includes(searchQuery.toLowerCase())
                return matchesCategory && matchesType && matchesSearch
              })

              const totalPages = Math.ceil(filtered.length / itemsPerPage)
              const paginatedProducts = filtered.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )

              return (
                <>
                  <div className="mb-4 text-sm text-gray-600">
                    Showing {paginatedProducts.length} of {filtered.length} products
                  </div>

                  {/* Products Grid/List */}
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                      {paginatedProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className="relative bg-gray-100 rounded-lg p-4 aspect-square flex items-center justify-center group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          {/* Featured Badge */}
                          {product.featured && (
                            <div className="absolute top-2 right-2 z-10 bg-[#92d7f6] text-white text-xs font-bold px-2 py-1 rounded-full">
                              Featured
                            </div>
                          )}

                          {/* Color Swatches */}
                          <div className="absolute left-2 top-2 flex gap-1 z-10">
                            {product.colors.map((color, idx) => (
                              <div
                                key={idx}
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                              ></div>
                            ))}
                          </div>

                          {/* Product Visual */}
                          <div className="w-full h-full rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
                            {getProductVisual(product)}
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                            <div className="text-white text-center">
                              <Eye className="w-8 h-8 mx-auto mb-2" />
                              <p className="text-sm font-semibold">View Details</p>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-xs font-semibold">{product.name}</p>
                            <p className="text-white/80 text-xs">{product.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 mb-6">
                      {paginatedProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className="bg-gray-50 rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-gray-100"
                        >
                          <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                            {getProductVisual(product, "small")}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{product.name}</h3>
                              {product.featured && (
                                <span className="bg-[#92d7f6] text-white text-xs font-bold px-2 py-1 rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-gray-500">Type: <span className="font-semibold">{product.type}</span></span>
                              <span className="text-gray-500">Category: <span className="font-semibold capitalize">{product.category}</span></span>
                              <div className="flex items-center gap-1">
                                {product.colors.map((color, idx) => (
                                  <div
                                    key={idx}
                                    className="w-3 h-3 rounded-full border border-gray-300"
                                    style={{ backgroundColor: color }}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Eye className="w-5 h-5 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === page
                              ? "bg-[#92d7f6] text-white"
                              : "border border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {paginatedProducts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-600 text-lg">No products found matching your filters.</p>
                      <button
                        onClick={() => {
                          setSelectedCategory("all")
                          setSelectedType("All")
                          setSearchQuery("")
                        }}
                        className="mt-4 px-6 py-2 bg-[#92d7f6] text-white rounded-lg hover:bg-[#7bc5e8] transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </>
              )
            })()}
          </div>

          {/* Product Modal */}
          {selectedProduct && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h3>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      {getProductVisual(selectedProduct, "large")}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Type</h4>
                      <span className="inline-block px-3 py-1 bg-[#92d7f6]/20 text-[#92d7f6] rounded-full text-sm font-semibold">
                        {selectedProduct.type}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                      <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold capitalize">
                        {selectedProduct.category}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Available Colors</h4>
                      <div className="flex gap-2">
                        {selectedProduct.colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <button className="w-full px-6 py-3 bg-[#92d7f6] text-white font-semibold rounded-lg hover:bg-[#7bc5e8] transition-colors">
                        Request Customization
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Section: Design Your Own Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">DESIGN YOUR OWN</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Type */}
                <div>
                  <label htmlFor="designProductType" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Type
                  </label>
                  <select
                    id="designProductType"
                    name="designProductType"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Product Type</option>
                    <option value="jersey">Jersey</option>
                    <option value="polo">Polo Shirt</option>
                    <option value="hoodie">Hoodie</option>
                    <option value="shorts">Shorts</option>
                    <option value="cap">Cap</option>
                  </select>
                </div>

                {/* Main Color */}
                <div>
                  <label htmlFor="mainColor" className="block text-sm font-medium text-gray-700 mb-2">
                    Main Color
                  </label>
                  <select
                    id="mainColor"
                    name="mainColor"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Color</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                  </select>
                </div>

                {/* Size */}
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                    Size (S-XXL)
                  </label>
                  <input
                    type="text"
                    id="size"
                    name="size"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all"
                    placeholder="e.g., M, L, XL"
                  />
                </div>

                {/* Name on Jersey */}
                <div>
                  <label htmlFor="jerseyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Jersey
                  </label>
                  <input
                    type="text"
                    id="jerseyName"
                    name="jerseyName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all"
                    placeholder="Enter name"
                  />
                </div>

                {/* Number */}
                <div>
                  <label htmlFor="jerseyNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Number (S-99)
                  </label>
                  <input
                    type="text"
                    id="jerseyNumber"
                    name="jerseyNumber"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all"
                    placeholder="Enter number"
                  />
                </div>

                {/* Name on Jersey (Dropdown) */}
                <div>
                  <label htmlFor="jerseyNameDropdown" className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Jersey
                  </label>
                  <select
                    id="jerseyNameDropdown"
                    name="jerseyNameDropdown"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select or enter custom</option>
                    <option value="custom">Enter Custom Name</option>
                  </select>
                </div>
              </div>

              {/* Upload Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPLOAD LOGO
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#92d7f6] transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="logoUpload"
                    name="logoUpload"
                    accept="image/*"
                    className="hidden"
                  />
                  <label htmlFor="logoUpload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      <span className="text-[#92d7f6] font-semibold">Click to upload</span> or drag and drop
                    </span>
                    <span className="text-xs text-gray-500 mt-1">PNG, JPG (MAX. 10MB)</span>
                  </label>
                </div>
              </div>

              {/* Additional Customization Notes */}
              <div>
                <label htmlFor="customizationNotes" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Customization Notes
                </label>
                <textarea
                  id="customizationNotes"
                  name="customizationNotes"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Enter any additional customization requirements or notes..."
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  className="flex-1 px-6 py-3 bg-[#92d7f6] text-white font-semibold rounded-lg hover:bg-[#7bc5e8] transition-colors duration-300"
                >
                  PREVIEW DESIGN
                </button>
                <button
                  type="button"
                  className="flex-1 px-6 py-3 bg-[#1e7ae6] text-white font-semibold rounded-lg hover:bg-[#1a6bd1] transition-colors duration-300"
                >
                  ADD TO CART
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>


      {/* Main Content */}
      {/* <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#92d7f6] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Phone</p>
                      <a href="tel:0412806051" className="text-sm text-gray-600 hover:text-[#92d7f6] transition-colors">
                        0412 806 051
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#92d7f6] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Email</p>
                      <a href="mailto:info@gs.com" className="text-sm text-gray-600 hover:text-[#92d7f6] transition-colors break-all">
                        info@gs.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#92d7f6] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Location</p>
                      <p className="text-sm text-gray-600">Australia</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-[#92d7f6]">FREE QUOTES</span>
                    <br />
                    Get a free quote for your custom sports apparel. No obligation.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Quote</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below with your requirements, and we&apos;ll get back to you with a custom quote.
                </p>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">Thank You!</h3>
                    <p className="text-green-700">
                      Your enquiry has been submitted successfully. We&apos;ll contact you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all"
                            placeholder="0412 806 051"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                            Organization/Club
                          </label>
                          <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all"
                            placeholder="Your Club Name"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-2">
                            Product Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="productType"
                            name="productType"
                            required
                            value={formData.productType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all bg-white"
                          >
                            <option value="">Select a product</option>
                            {productTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            required
                            min="1"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all"
                            placeholder="e.g., 20"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label htmlFor="colors" className="block text-sm font-medium text-gray-700 mb-2">
                            Colors <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="colors"
                            name="colors"
                            required
                            value={formData.colors}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all"
                            placeholder="e.g., Blue, White, Yellow"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 mb-2">
                            Sizes Required
                          </label>
                          <input
                            type="text"
                            id="sizes"
                            name="sizes"
                            value={formData.sizes}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all"
                            placeholder="e.g., S: 5, M: 10, L: 5"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Design & Customization</h3>
                      <div>
                        <label htmlFor="logoDescription" className="block text-sm font-medium text-gray-700 mb-2">
                          Logo/Design Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="logoDescription"
                          name="logoDescription"
                          required
                          rows={4}
                          value={formData.logoDescription}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ef9] focus:border-transparent outline-none transition-all resize-none"
                          placeholder="Describe your logo, text, or design requirements. Include any specific placement instructions..."
                        />
                      </div>

                      <div className="mt-4">
                        <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Logo/Design Files
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2b8ef9] transition-colors">
                          <input
                            type="file"
                            id="fileUpload"
                            name="fileUpload"
                            multiple
                            accept="image/*,.pdf,.ai,.eps"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <label htmlFor="fileUpload" className="cursor-pointer">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="text-[#92d7f6] font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, PDF, AI, EPS (MAX. 10MB each)
                            </p>
                          </label>
                        </div>
                        {selectedFiles.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 mb-2">Selected files:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {selectedFiles.map((file, index) => (
                                <li key={index}>{file.name}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                            Desired Deadline
                          </label>
                          <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                          Special Requirements or Notes
                        </label>
                        <textarea
                          id="specialRequirements"
                          name="specialRequirements"
                          rows={4}
                          value={formData.specialRequirements}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ef9] focus:border-transparent outline-none transition-all resize-none"
                          placeholder="Any additional information, special requests, or questions..."
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-8 py-3 bg-black border-2 border-[#92d7f6] text-white font-bold text-sm rounded-lg hover:bg-[#92d7f6] hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                      </button>
                      <p className="text-xs text-gray-500 mt-3">
                        <span className="text-red-500">*</span> Required fields
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </div>
  )
}

