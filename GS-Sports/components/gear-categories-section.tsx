"use client"

import Link from "next/link"
import Image from "next/image"

export default function GearCategoriesSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <h2 className="text-center text-2xl md:text-3xl font-bold text-black mb-6">
          Cricket, Sports & Fitness Gear
        </h2>

        {/* Description Paragraph */}
        <p className="text-center text-gray-700 text-sm md:text-base leading-relaxed mb-4 max-w-4xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>

        {/* Call to Action */}
        <p className="text-center text-gray-700 text-sm md:text-base mb-12">
          Shop now for the winning edge!
        </p>

        {/* Three Category Columns */}
        <div className="grid grid-cols-1 text-center md:grid-cols-3 gap-8 md:gap-12 mt-16">
          {/* Column 1: Cricket Gear */}
          <div className="flex flex-col">
            {/* Icon */}
            <div className="mb-6 text-center mx-auto">
              <Image
                src="/images/cricketgear-icon.png"
                alt="Cricket Gear"
                width={80}
                height={80}
                className="object-cover rounded-lg"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-black mb-4">
              Cricket Gear
            </h3>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
            </p>

            {/* Shop Now Button */}
            <div className="mt-auto">
              <Link
                href="/cricket"
                className="inline-block w-full md:w-auto text-center px-8 py-3 bg-white border-2 border-[#92d7f6] text-black font-semibold rounded-lg hover:bg-[#92d7f6] hover:text-black transition-colors duration-300"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Column 2: Fitness Gear */}
          <div className="flex flex-col">
            {/* Icon */}
            <div className="mb-6 text-center mx-auto">
              <Image
                src="/images/fitnessgear-icon.png"
                alt="Fitness Gear"
                width={80}
                height={80}
                className="object-cover rounded-lg"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-black mb-4">
              Fitness Gear
            </h3>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
            </p>

            {/* Shop Now Button */}
            <div className="mt-auto">
              <Link
                href="/fitness"
                className="inline-block w-full md:w-auto text-center px-8 py-3 bg-white border-2 border-[#92d7f6] text-black font-semibold rounded-lg hover:bg-[#92d7f6] hover:text-black transition-colors duration-300"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Column 3: Sports Gear */}
          <div className="flex flex-col">
            {/* Icon */}
            <div className="mb-6 text-center mx-auto">
              <Image
                src="/images/sportgear-icon.png"
                alt="Sports Gear"
                width={80}
                height={80}
                className="object-cover rounded-lg"
              />
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-black mb-4">
              Sports Gear
            </h3>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
            </p>

            {/* Shop Now Button */}
            <div className="mt-auto">
              <Link
                href="/sports"
                className="inline-block w-full md:w-auto text-center px-8 py-3 bg-white border-2 border-[#92d7f6] text-black font-semibold rounded-lg hover:bg-[#92d7f6] hover:text-black transition-colors duration-300"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

