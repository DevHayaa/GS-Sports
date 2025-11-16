"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Category {
  id: number
  name: string
  image: string
}

const categories: Category[] = [
  {
    id: 1,
    name: "Shoes",
    image: "/images/shoe-category.jpg",
  },
  {
    id: 2,
    name: "Bats",
    image: "/images/bat-category.jpg",
  },
  {
    id: 3,
    name: "Gloves",
    image: "/images/gloves-category.jpg",
  },
  {
    id: 4,
    name: "Pads",
    image: "/cricket-pads.jpg",
  },
  {
    id: 5,
    name: "Kit Bags",
    image: "/cricket-kit-bag.jpg",
  },
  {
    id: 6,
    name: "Inners",
    image: "/cricket-inners.jpg",
  },
]

export default function ExploreCategories() {
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
          <h2 className="text-2xl md:text-3xl font-bold text-black font-montserrat">
            Explore by <span className="text-[#92d7f6]">Categories</span>
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
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-80 bg-white transition-all duration-300 overflow-hidden group"
              >
                <div className="relative w-full h-96 border border-black overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 flex items-center justify-center">
                  <button className="w-full py-4 border border-black bg-white text-black font-bold font-montserrat hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-wide">
                    Shop Now
                  </button>
                </div>
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
