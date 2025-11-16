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
    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-muted">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-center" />
          {/* Overlay */}
          {/* <div className="absolute inset-0 bg-black/40" /> */}

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-12 lg:px-16">
            <div className="max-w-2xl">
              {/* <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 text-balance">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">{slide.subtitle}</p>
              <button className="px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                {slide.cta}
              </button> */}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8 md:w-10" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
