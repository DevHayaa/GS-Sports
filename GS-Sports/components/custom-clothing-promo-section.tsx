"use client"

import Link from "next/link"

export default function CustomClothingPromoSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          {/* Left Section - Clothing Items */}
          <div className="relative h-[500px] md:h-[600px]">
            {/* Sports Jersey - Top Left with Rotation */}
            <div className="absolute left-0 top-0 w-[55%] z-10">
              <img
                src="/images/customjersey.png"
                alt="Custom Sport Jersey"
                className="w-full h-auto object-contain drop-shadow-2xl"
                style={{ transform: 'rotate(-8deg)' }}
              />
            </div>

            {/* Polo Shirt - Bottom Right with Rotation */}
            <div className="absolute right-0 bottom-0 w-[55%] z-10">
              <img
                src="/images/custompolo.png"
                alt="Custom Polo Shirt"
                className="w-full h-auto object-contain drop-shadow-2xl"
                style={{ transform: 'rotate(8deg)' }}
              />
            </div>
          </div>

          {/* Right Section - Text Content */}
          <div className="relative">
            {/* Small Four-Pointed Star - Above Title */}
            <div className="absolute -top-4 -left-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 16 4 L 18.5 11.5 L 26 14 L 18.5 16.5 L 16 24 L 13.5 16.5 L 6 14 L 13.5 11.5 Z"
                  fill="#92d7f6"
                  stroke="#92d7f6"
                  strokeWidth="1"
                />
              </svg>
            </div>

            {/* "FREE QUOTES" Starburst - Top Right */}
            <div className="absolute -top-12 -right-8 md:-right-12 z-20">
              <div className="relative">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Spiky Starburst Background */}
                  <path
                    d="M 60 10 L 68 35 L 95 40 L 75 58 L 80 85 L 60 72 L 40 85 L 45 58 L 25 40 L 52 35 Z"
                    fill="#92d7f6"
                  />
                  <path
                    d="M 60 10 L 75 25 L 100 30 L 85 50 L 92 75 L 70 65 L 50 75 L 55 50 L 35 30 L 60 25 Z"
                    fill="#92d7f6"
                    opacity="0.8"
                  />
                  {/* Text */}
                  <text
                    x="60"
                    y="45"
                    fontSize="14"
                    fill="white"
                    fontFamily="Arial, sans-serif"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    FREE
                  </text>
                  <text
                    x="60"
                    y="62"
                    fontSize="14"
                    fill="white"
                    fontFamily="Arial, sans-serif"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    QUOTES
                  </text>
                </svg>
              </div>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-8 leading-tight">
              Custom Workwear And Sports Clothing
            </h2>

            {/* Three Paragraphs */}
            <div className="space-y-6 mb-10">
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>

            {/* Enquire Now Button */}
            <Link
              href="/custom-sports"
              className="inline-block px-6 py-3 bg-black border-2 border-[#92d7f6] text-white font-bold text-sm rounded-lg hover:bg-[#92d7f6] hover:text-black transition-colors duration-300"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

