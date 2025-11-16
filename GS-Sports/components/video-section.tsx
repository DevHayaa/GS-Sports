"use client"

import { Play } from "lucide-react"

export default function VideoSection() {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-black mb-3">See Our Products in Action</h2>
          <p className="text-gray-600 text-sm md:text-base">Watch how our premium cricket gear performs on the field</p>
        </div>

        {/* Video Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-lg">
            {/* Video Placeholder */}
            <div className="aspect-video bg-black flex items-center justify-center group cursor-pointer">
              <img
                src="/cricket-action-video-thumbnail.jpg"
                alt="Cricket action video"
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-300">
                <div className="w-20 h-20 rounded-full bg-[#92d7f6] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-10 h-10 text-white fill-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm md:text-base">
              Discover the quality and performance that makes our cricket gear the choice of professionals
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
