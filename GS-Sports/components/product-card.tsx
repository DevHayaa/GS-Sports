"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { ShoppingCart, Heart } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function ProductCard({ id, name, description, price, image }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id,
      name,
      price,
      quantity: 1,
      image,
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWishlist(id)) {
      removeFromWishlist(id)
    } else {
      addToWishlist({
        id,
        name,
        price,
        image,
        description,
      })
    }
  }

  const wishlisted = isInWishlist(id)

  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 group relative">
        {/* Product Image */}
        <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
              wishlisted
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-600 hover:bg-white"
            }`}
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? "fill-white" : ""}`} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#92d7f6] transition-colors">{name}</h3>
          <p className="text-gray-600 text-xs mb-3 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-[#92d7f6] font-bold text-base">${price.toFixed(2)}</span>
            <button
              onClick={handleAddToCart}
              className="bg-[#92d7f6] text-white p-2 rounded-lg hover:bg-[#7bc5e8] transition-colors"
              title="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
