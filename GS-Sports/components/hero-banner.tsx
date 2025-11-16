"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Premium Cricket Bats",
    subtitle: "Engineered for Performance",
    image: "/images/home-banner01.png",
    cta: "Shop Bats",
  },
  // {
  //   id: 2,
  //   title: "Elite Cricket Shoes",
  //   subtitle: "Superior Grip & Comfort",
  //   image: "/images/home-banner2.png",
  //   cta: "Shop Shoes",
  // },
  // {
  //   id: 3,
  //   title: "Professional Gloves",
  //   subtitle: "Maximum Protection",
  //   image: "/images/home-banner3.png",
  //   cta: "Shop Gloves",
  // },
  // {
  //   id: 4,
  //   title: "Complete Cricket Kit",
  //   subtitle: "Everything You Need",
  //   image: "/complete-cricket-equipment-kit-laid-out.jpg",
  //   cta: "Shop Kits",
  // },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-muted">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img 
            src={slide.image || "/placeholder.svg"} 
            alt={slide.title} 
            className="w-full h-full object-cover object-center" 
          />
        </div>
      ))}

      {/* Navigation Arrows - Hidden on mobile if only one slide */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 md:p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full transition-all duration-200 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 md:p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full transition-all duration-200 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
          </button>
        </>
      )}

      {/* Dots - Hidden on mobile if only one slide */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 sm:h-2 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-white w-6 sm:w-8 md:w-10" 
                  : "bg-white/50 hover:bg-white/75 w-1.5 sm:w-2 md:w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
