"use client"

import { useEffect, useRef } from "react"

const brands = [
  { name: "Adidas", logo: "🏏" },
  { name: "SG", logo: "⚡" },
  { name: "Kookaburra", logo: "🦅" },
  { name: "Gray Nicolls", logo: "🎯" },
  { name: "Cosco", logo: "🏅" },
  { name: "Gunn & Moore", logo: "⭐" },
  { name: "MRF", logo: "🔥" },
  { name: "Spartan", logo: "🛡️" },
]

export default function BrandLogosSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let position = 0
    const speed = 0.5 // speed of movement

    const animate = () => {
      position += speed
      if (position >= scrollContainer.scrollWidth / 2) {
        position = 0
      }
      scrollContainer.style.transform = `translateX(-${position}px)`
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [])

  return (
    <section className="w-full bg-white py-12 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold text-gray-600 mb-8 uppercase tracking-wide">
          Trusted by Cricket Enthusiasts
        </h2>

        {/* Moving container */}
        <div className="overflow-hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-12 whitespace-nowrap will-change-transform"
            style={{ width: "max-content" }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="inline-flex flex-col items-center justify-center w-32 h-20"
              >
                <div className="text-4xl mb-2">{brand.logo}</div>
                <p className="text-xs font-semibold text-gray-700">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
