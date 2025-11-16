"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  id: number
  brand: string
  name: string
  image: string
}

const products: Product[] = [
  {
    id: 1,
    brand: "ADIDAS",
    name: "22 YARDS CRICKET SPIKES",
    image: "/images/shoes.png",
  },
  {
    id: 2,
    brand: "SHREY",
    name: "INTENSE COMPRESSION",
    image: "/images/trouser.png",
  },
  {
    id: 3,
    brand: "SG TOURNAMENT",
    name: "CRICKET ABDOMINAL PAD",
    image: "/images/thigh-pads.png",
  },
  {
    id: 4,
    brand: "KOOKABURRA",
    name: "PRO 2.0 CRICKET SPIKES",
    image: "/images/kit-bag.png",
  },
  {
    id: 5,
    brand: "MRF",
    name: "ELITE CRICKET BAT",
    image: "/images/gloves.png",
  },
]

export default function HotSellers() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 320
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <div className="inline-block" >
            <img 
              src="/images/hot-seller-icon.webp" 
              alt="Hot Seller Icon" 
              className="w-10 h-18"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black font-montserrat mt-6">
            Hot <span className="text-[#92d7f6]">Sellers</span>
          </h2>
        </div>

        <div className="relative flex items-center gap-4 overflow-hidden">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 -ml-6"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-[#92d7f6]" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide px-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-72 bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image Container */}
                <div className="relative w-full h-[400px] overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                {/* <div className="p-6">
                  <h3 className="text-sm font-bold text-black font-montserrat uppercase tracking-wide">
                    {product.brand}
                  </h3>
                  <p className="text-sm text-gray-600 font-montserrat mt-2 line-clamp-2">{product.name}</p>
                </div> */}
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 -mr-6"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-[#92d7f6]" />
          </button>
        </div>
      </div>

    </section>
  )
}
