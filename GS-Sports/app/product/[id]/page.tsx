"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { ShoppingCart, Heart, Star, ChevronRight, Minus, Plus, Share2, Check } from "lucide-react"

// Mock product data - In a real app, this would come from an API
const allProducts: Record<string, {
  id: string
  name: string
  description: string
  fullDescription: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  rating: number
  reviews: number
  inStock: boolean
  sizes?: string[]
  colors?: string[]
  features?: string[]
}> = {
  "1": {
    id: "1",
    name: "Professional Cricket Bat",
    description: "High-quality English willow bat with superior balance",
    fullDescription: "This professional-grade cricket bat is crafted from premium English willow, offering exceptional balance and power. Perfect for competitive play, it features a traditional design with modern performance enhancements. The bat is lightweight yet durable, providing excellent control and maximum hitting power.",
    price: 299.99,
    originalPrice: 349.99,
    image: "/professional-cricket-bat.png",
    images: ["/professional-cricket-bat.png", "/cricket-bat.png", "/professional-cricket-bat.jpg"],
    category: "Bats",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    sizes: ["Short Handle", "Long Handle"],
    colors: ["Natural Willow", "Tinted"],
    features: [
      "Premium English Willow",
      "Superior Balance",
      "Maximum Power",
      "Professional Grade",
      "Lightweight Design"
    ]
  },
  "2": {
    id: "2",
    name: "Cricket Batting Gloves",
    description: "Professional batting gloves with superior protection",
    fullDescription: "These professional batting gloves offer superior protection and comfort. Made from premium materials, they feature reinforced padding in critical areas and excellent grip. Perfect for all levels of play.",
    price: 89.99,
    image: "/cricket-batting-gloves.png",
    images: ["/cricket-batting-gloves.png", "/cricket-gloves.jpg"],
    category: "Gloves",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    sizes: ["Small", "Medium", "Large", "X-Large"],
    colors: ["Black", "White", "Blue"],
    features: [
      "Superior Protection",
      "Excellent Grip",
      "Breathable Material",
      "Reinforced Padding"
    ]
  },
  "bat-1": {
    id: "bat-1",
    name: "Professional Cricket Bat",
    description: "High-quality English willow bat with superior balance",
    fullDescription: "This professional-grade cricket bat is crafted from premium English willow, offering exceptional balance and power.",
    price: 8999,
    image: "/images/bat-category.jpg",
    category: "Bats",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    sizes: ["Short Handle", "Long Handle"],
    colors: ["Natural Willow"],
    features: ["Premium English Willow", "Superior Balance", "Maximum Power"]
  },
  "trou-1": {
    id: "trou-1",
    name: "Professional White Trouser",
    description: "Official cricket trousers with premium fit",
    fullDescription: "Professional white cricket trousers designed for comfort and performance.",
    price: 1499,
    image: "/images/trouser.png",
    category: "Trousers",
    rating: 4.6,
    reviews: 56,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White"],
    features: ["Premium Fit", "Comfortable", "Durable"]
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const product = allProducts[productId]

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)

  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-[#92d7f6] text-white font-semibold rounded-lg hover:bg-[#7bc5e8] transition-colors"
          >
            Continue Shopping
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const images = product.images || [product.image]
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    })
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#92d7f6] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-[#92d7f6] transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden mb-4 border border-gray-200">
              <Image
                src={images[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-[#92d7f6]" : "border-gray-200"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#92d7f6]/20 text-[#92d7f6] rounded-full text-sm font-semibold mb-2">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-[#92d7f6]">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.fullDescription || product.description}</p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Size <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedSize === size
                          ? "border-[#92d7f6] bg-[#92d7f6]/10 text-[#92d7f6]"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Color <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === color
                          ? "border-[#92d7f6] bg-[#92d7f6]/10 text-[#92d7f6]"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-16 text-center font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="font-semibold">In Stock</span>
                </div>
              ) : (
                <div className="text-red-600 font-semibold">Out of Stock</div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#92d7f6] text-white font-semibold rounded-lg hover:bg-[#7bc5e8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`px-6 py-3 border-2 rounded-lg font-semibold transition-colors ${
                  isWishlisted
                    ? "border-red-500 text-red-500 bg-red-50 hover:bg-red-100"
                    : "border-gray-300 text-gray-700 hover:border-[#92d7f6] hover:text-[#92d7f6]"
                }`}
              >
                <Heart className={`w-5 h-5 inline mr-2 ${isWishlisted ? "fill-red-500" : ""}`} />
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-[#92d7f6] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

