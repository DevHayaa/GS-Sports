"use client"

import Link from "next/link"

export default function CricketPromoSection() {
  return (
    <section className="relative w-full bg-black py-16 md:py-24 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover "
        >
          <source src="/images/sportsvideo.mp4" type="video/mp4" />
          {/* Fallback if video doesn't load */}
        </video>
        {/* Overlay to darken video */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Cricket Player Silhouette - Ghost Effect */}
      {/* <div className="absolute right-0 bottom-0 w-1/2 md:w-1/3 h-full opacity-10">
        <img
          src="/images/cricketsports.png"
          alt="Cricket Batsman Silhouette"
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="max-w-3xl text-center">
          {/* Star Icon */}
          {/* <div className="mb-6">
            <img src="/star-icon.png" alt="Star Icon" width={32} height={32} />
          </div> */}

          {/* Main Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
            Cricket And Sports Gear
          </h2>

          {/* Text Content - Three Paragraphs */}
          <div className="space-y-6 mb-10">
            <p className="text-white text-sm md:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-white text-sm md:text-base leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-white text-sm md:text-base leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          {/* Shop Now Button */}
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-black border-2 border-[#92d7f6] text-white font-bold text-sm rounded-lg hover:bg-[#92d7f6] hover:text-black transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}

