"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, ShoppingCart, ChevronDown, ChevronUp, Phone, Heart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCricketOpen, setIsCricketOpen] = useState(false)
  const [isClothingOpen, setIsClothingOpen] = useState(false)
  const [isCustomSportsOpen, setIsCustomSportsOpen] = useState(false)
  const [isCustomWorkwearOpen, setIsCustomWorkwearOpen] = useState(false)
  const { items, setIsCartOpen } = useCart()
  const { items: wishlistItems } = useWishlist()
  
  const cricketRef = useRef<HTMLDivElement>(null)
  const customSportsRef = useRef<HTMLDivElement>(null)
  const clothingRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const handleMobileLinkClick = (href: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    // Close menus
    setIsMenuOpen(false)
    setIsCricketOpen(false)
    setIsClothingOpen(false)
    setIsCustomSportsOpen(false)
    // Navigate using window.location for reliable navigation
    window.location.href = href
  }
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    // Close dropdowns only when clicking outside the entire header.
    // This prevents clicks inside the mobile menu from being treated as
    // outside clicks (which caused mobile toggles to immediately close).
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
        setIsCricketOpen(false)
        setIsClothingOpen(false)
        setIsCustomSportsOpen(false)
        setIsCustomWorkwearOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Icons for cricket items - using image icons
  const CricketIcons = {
    Bats: () => (
      <Image 
        src="/images/bat-icon.png" 
        alt="Bats" 
        width={32}
        height={32}
        className="object-cover rounded"
      />
    ),
    Gloves: () => (
      <Image 
        src="/images/glove-icon.png" 
        alt="Gloves" 
        width={32}
        height={32}
        className="object-cover rounded"
      />
    ),
    Pads: () => (
      <Image 
        src="/images/legpad-icon.png" 
        alt="Pads" 
        width={32}
        height={32}
        className="object-cover rounded"
      />
    ),
    ThighPads: () => (
      <Image 
        src="/images/thighpad-icon.png" 
        alt="Thigh Pads" 
        width={32}
        height={32}
        className="object-cover rounded"
      />
    ),
    Inners: () => (
      <Image 
        src="/images/inner-icon.png" 
        alt="Inners" 
        width={32}
        height={32}
        className="object-cover rounded"
      />
    ),
    AbdominalGuard: () => (
      <Image 
        src="/images/guard-icon.png" 
        alt="Abdominal Guard" 
        width={32}
        height={32}
        className="object-cover rounded"
      />
    ),
    BatGrips: () => (
      <Image 
        src="/images/grip-icon.png" 
        alt="Bat Grips" 
        width={32}
        height={32}
        className="object-cover rounded"
      />
    ),
  }

  // Icons for custom sports items
  const CustomSportsIcons = {
    Caps: () => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="4" fill="#92d7f6"/>
        <ellipse cx="24" cy="18" rx="12" ry="9" fill="none" stroke="#000" strokeWidth="2"/>
        <rect x="12" y="18" width="24" height="12" rx="2" fill="none" stroke="#000" strokeWidth="2"/>
        <path d="M24 16 L24.8 18.5 L27.4 18.9 L25.5 20.6 L26 23.2 L24 21.8 L22 23.2 L22.5 20.6 L20.6 18.9 L23.2 18.5 Z" fill="#000"/>
      </svg>
    ),
    SportsShirts: () => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="4" fill="#92d7f6"/>
        <path d="M16 12 L20 8 L24 12 L28 8 L32 12 L32 32 L16 32 Z" fill="none" stroke="#000" strokeWidth="2"/>
        <line x1="16" y1="20" x2="32" y2="20" stroke="#000" strokeWidth="2"/>
        <line x1="16" y1="26" x2="32" y2="26" stroke="#000" strokeWidth="1"/>
      </svg>
    ),
    Shorts: () => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="4" fill="#92d7f6"/>
        <path d="M14 16 L18 12 L20 28 L16 32 Z" fill="none" stroke="#000" strokeWidth="2"/>
        <path d="M28 16 L30 12 L32 28 L28 32 Z" fill="none" stroke="#000" strokeWidth="2"/>
        <path d="M18 12 L20 28 L28 28 L30 12 Z" fill="none" stroke="#000" strokeWidth="2"/>
        <text x="22" y="22" fontSize="8" fill="#000" fontWeight="bold">10</text>
      </svg>
    ),
    Hoodies: () => (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="4" fill="#92d7f6"/>
        <path d="M14 14 L16 12 L18 16 L20 12 L22 14 L24 10 L26 14 L28 12 L30 16 L32 12 L34 14 L34 32 L14 32 Z" fill="none" stroke="#000" strokeWidth="2"/>
        <path d="M14 14 Q14 10, 18 10 L30 10 Q34 10, 34 14" fill="none" stroke="#000" strokeWidth="2"/>
        <line x1="14" y1="22" x2="34" y2="22" stroke="#000" strokeWidth="2"/>
      </svg>
    ),
  }

  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white">
      {/* Top Bar */}
      
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Intertwined GS */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/images/Gs-logo.png"
              alt="GS Logo"
              className="w-16 h-16 object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* CRICKET Dropdown */}
            <div className="relative group" ref={cricketRef}>
              <button 
                className={`flex items-center gap-1 text-sm font-medium uppercase transition-colors ${
                  isCricketOpen ? 'bg-[#92d7f6] text-gray-900 px-2 py-1 rounded' : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setIsCricketOpen(!isCricketOpen)}
              >
                CRICKET
                {isCricketOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {isCricketOpen && (
                <div 
                  className="absolute left-0 mt-2 w-[600px] bg-white border border-gray-200 rounded-lg shadow-xl py-6 z-50"
                >
                  <div className="grid grid-cols-2 gap-8 px-6">
                    {/* Left Column */}
                    <div>
                      <div className="space-y-3">
                        <Link href="/cricket/bats" onClick={() => setIsCricketOpen(false)} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                          <CricketIcons.Bats />
                          <span className="text-sm text-gray-700">Bats</span>
                        </Link>
                        <Link href="/cricket/gloves" onClick={() => setIsCricketOpen(false)} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                          <CricketIcons.Gloves />
                          <span className="text-sm text-gray-700">Gloves (Batting gloves)</span>
                        </Link>
                        <Link href="/cricket/pads" onClick={() => setIsCricketOpen(false)} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                          <CricketIcons.Pads />
                          <span className="text-sm text-gray-700">Pads (Leg pads)</span>
                        </Link>
                        <Link href="/cricket/thigh-pads" onClick={() => setIsCricketOpen(false)} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                          <CricketIcons.ThighPads />
                          <span className="text-sm text-gray-700">Thigh pads</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div>
                      <div className="space-y-3">
                        <Link href="/cricket/inners" onClick={() => setIsCricketOpen(false)} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                          <CricketIcons.Inners />
                          <span className="text-sm text-gray-700">Inners (Batting inners/inner gloves)</span>
                        </Link>
                        <Link href="/cricket/abdominal-guard" onClick={() => setIsCricketOpen(false)} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                          <CricketIcons.AbdominalGuard />
                          <span className="text-sm text-gray-700">Abdominal guard (Box)</span>
                        </Link>
                        <Link href="/cricket/bat-grips" onClick={() => setIsCricketOpen(false)} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                          <CricketIcons.BatGrips />
                          <span className="text-sm text-gray-700">Grips (Bat grips)</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CLOTHING Dropdown */}
            <div className="relative group" ref={clothingRef}>
              <button 
                className={`flex items-center gap-1 text-sm font-medium uppercase transition-colors ${
                  isClothingOpen ? 'bg-[#92d7f6] text-gray-900 px-2 py-1 rounded' : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setIsClothingOpen(!isClothingOpen)}
              >
                CLOTHING
                {isClothingOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {isClothingOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <Link href="/clothing/trousers" onClick={() => setIsClothingOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Trousers
                  </Link>
                  <Link href="/clothing/tshirt" onClick={() => setIsClothingOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    T-Shirt
                  </Link>
                </div>
              )}
            </div>

            {/* SHOP ALL */}
            <Link href="/shop" className="text-sm font-medium text-gray-700 uppercase hover:text-gray-900 transition-colors">
              SHOP ALL
            </Link>

            {/* CUSTOM SPORTS Dropdown */}
            <div className="relative group" ref={customSportsRef}>
              <button 
                className={`flex items-center gap-1 text-sm font-medium uppercase transition-colors ${
                  isCustomSportsOpen ? 'bg-[#92d7f6] text-gray-900 px-2 py-1 rounded' : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setIsCustomSportsOpen(!isCustomSportsOpen)}
              >
                CUSTOM SPORTS
                {isCustomSportsOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {isCustomSportsOpen && (
                <div 
                  className="absolute left-0 mt-2 w-[700px] bg-white border border-gray-200 rounded-lg shadow-xl py-6 z-50"
                >
                  <div className="grid grid-cols-2 gap-8 px-6">
                    {/* Left Section - Product Categories */}
                    <div>
                      <div className="space-y-4">
                        <Link href="/custom-sports" onClick={() => setIsCustomSportsOpen(false)} className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded transition-colors group">
                          <CustomSportsIcons.Caps />
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-gray-900">Caps</h4>
                            <p className="text-xs text-gray-500 mt-1">Customise caps with your club logo</p>
                          </div>
                        </Link>
                        <Link href="/custom-sports" onClick={() => setIsCustomSportsOpen(false)} className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded transition-colors group">
                          <CustomSportsIcons.SportsShirts />
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-gray-900">Sports Shirts</h4>
                            <p className="text-xs text-gray-500 mt-1">Get your club logo on our sports shirts</p>
                          </div>
                        </Link>
                        <Link href="/custom-sports" onClick={() => setIsCustomSportsOpen(false)} className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded transition-colors group">
                          <CustomSportsIcons.Shorts />
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-gray-900">Shorts</h4>
                            <p className="text-xs text-gray-500 mt-1">Custom branded shorts</p>
                          </div>
                        </Link>
                        <Link href="/custom-sports" onClick={() => setIsCustomSportsOpen(false)} className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded transition-colors group">
                          <CustomSportsIcons.Hoodies />
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-gray-900">Hoodies</h4>
                            <p className="text-xs text-gray-500 mt-1">Custom branded hoodies</p>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Right Section - Call For Customisation */}
                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-gray-900 mb-4">Call For Customisation</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <Phone className="w-4 h-4 text-gray-700" />
                        <span className="text-sm text-gray-700">0412 806 051</span>
                      </div>
                      {/* Product Image - Sports Jersey */}
                      <div className="flex-1 bg-gradient-to-br from-[#92d7f6] via-[#7bc5e8] to-[#92d7f6] rounded-lg p-6 relative overflow-hidden min-h-[280px]">
                        {/* Swirl Pattern Background */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-0 left-0 w-full h-full">
                            <svg width="100%" height="100%" viewBox="0 0 200 300" className="opacity-30">
                              <path d="M0,150 Q50,50 100,100 T200,150" stroke="white" strokeWidth="2" fill="none" />
                              <path d="M0,180 Q50,80 100,130 T200,180" stroke="white" strokeWidth="2" fill="none" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                          {/* Top Section */}
                          <div>
                            <div className="bg-white/10 backdrop-blur-sm rounded px-3 py-1 inline-block mb-4">
                              <span className="text-white text-xs font-semibold">SPORT JERSEY</span>
                            </div>
                            {/* Left Sleeve Logo */}
                            <div className="absolute top-8 left-2 text-white text-[10px] font-bold">GS</div>
                            {/* Right Sleeve Logo */}
                            <div className="absolute top-8 right-2 text-white text-[10px] font-bold">B</div>
                          </div>
                          
                          {/* Center Number */}
                          <div className="flex flex-col items-center justify-center flex-1">
                            <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mb-2 shadow-lg">
                              <span className="text-4xl font-bold text-[#92d7f6]">17</span>
                            </div>
                          </div>
                          
                          {/* Bottom Text */}
                          <div className="text-center">
                            <div className="text-white text-sm font-semibold">17 GS</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CUSTOM WORKWEAR Dropdown */}
                       <Link href="/about" className="text-sm font-medium text-gray-700 uppercase hover:text-gray-900 transition-colors">
              ABOUT
            </Link>

            {/* CONTACT */}
            <Link href="/contact" className="text-sm font-medium text-gray-700 uppercase hover:text-gray-900 transition-colors">
              CONTACT
            </Link>

            {/* LOGIN */}
            <Link href="/login" className="text-sm font-medium text-gray-700 uppercase hover:text-gray-900 transition-colors">
              LOGIN
            </Link>
          </nav>

          {/* Right Side - Cart, Wishlist and Search */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-gray-700 hover:text-[#92d7f6] transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <span className="text-sm font-medium">${cartTotal.toFixed(2)}</span>
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#92d7f6] text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {items.length}
                </span>
              </div>
            </button>

            {/* Search Button */}
            <button className="p-2 bg-[#92d7f6] rounded-lg hover:bg-[#7bc5e8] transition-colors">
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <span className="text-xl font-bold text-gray-700">✕</span>
              ) : (
                <span className="text-xl font-bold text-gray-700">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsCricketOpen(!isCricketOpen)
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 uppercase hover:bg-gray-50 rounded-lg transition-colors"
              >
                CRICKET
                <ChevronDown className={`w-4 h-4 transition-transform ${isCricketOpen ? "rotate-180" : ""}`} />
              </button>
              {isCricketOpen && (
                <div className="pl-4 space-y-3 bg-white border border-gray-200 rounded-lg p-4 my-2" onClick={(e) => e.stopPropagation()}>
                  <div className="grid grid-cols-1 gap-3">
                    {/* Left Column */}
                    <div>
                      <div className="space-y-3">
                        <button
                          onClick={(e) => handleMobileLinkClick("/cricket/bats", e)}
                          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer w-full text-left"
                        >
                          <CricketIcons.Bats />
                          <span className="text-sm text-gray-700">Bats</span>
                        </button>
                        <button
                          onClick={(e) => handleMobileLinkClick("/cricket/gloves", e)}
                          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer w-full text-left"
                        >
                          <CricketIcons.Gloves />
                          <span className="text-sm text-gray-700">Gloves (Batting gloves)</span>
                        </button>
                        <button
                          onClick={(e) => handleMobileLinkClick("/cricket/pads", e)}
                          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer w-full text-left"
                        >
                          <CricketIcons.Pads />
                          <span className="text-sm text-gray-700">Pads (Leg pads)</span>
                        </button>
                        <button
                          onClick={(e) => handleMobileLinkClick("/cricket/thigh-pads", e)}
                          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer w-full text-left"
                        >
                          <CricketIcons.ThighPads />
                          <span className="text-sm text-gray-700">Thigh pads</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div>
                      <div className="space-y-3">
                        <button
                          onClick={(e) => handleMobileLinkClick("/cricket/inners", e)}
                          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer w-full text-left"
                        >
                          <CricketIcons.Inners />
                          <span className="text-sm text-gray-700">Inners (Batting inners/inner gloves)</span>
                        </button>
                        <button
                          onClick={(e) => handleMobileLinkClick("/cricket/abdominal-guard", e)}
                          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer w-full text-left"
                        >
                          <CricketIcons.AbdominalGuard />
                          <span className="text-sm text-gray-700">Abdominal guard (Box)</span>
                        </button>
                        <button
                          onClick={(e) => handleMobileLinkClick("/cricket/bat-grips", e)}
                          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer w-full text-left"
                        >
                          <CricketIcons.BatGrips />
                          <span className="text-sm text-gray-700">Grips (Bat grips)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsClothingOpen(!isClothingOpen)
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 uppercase hover:bg-gray-50 rounded-lg transition-colors"
              >
                CLOTHING
                <ChevronDown className={`w-4 h-4 transition-transform ${isClothingOpen ? "rotate-180" : ""}`} />
              </button>
              {isClothingOpen && (
                <div className="pl-4 space-y-1 bg-white border border-gray-200 rounded-lg p-2 my-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => handleMobileLinkClick("/clothing/trousers", e)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded cursor-pointer"
                  >
                    Trousers
                  </button>
                  <button
                    onClick={(e) => handleMobileLinkClick("/clothing/tshirt", e)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded cursor-pointer"
                  >
                    T-Shirt
                  </button>
                </div>
              )}

              <button
                onClick={(e) => handleMobileLinkClick("/shop", e)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 uppercase hover:bg-gray-50 rounded-lg transition-colors"
              >
                SHOP ALL
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsCustomSportsOpen(!isCustomSportsOpen)
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 uppercase hover:bg-gray-50 rounded-lg transition-colors"
              >
                CUSTOM SPORTS
                <ChevronDown className={`w-4 h-4 transition-transform ${isCustomSportsOpen ? "rotate-180" : ""}`} />
              </button>
              {isCustomSportsOpen && (
                <div className="pl-4 space-y-4 bg-white border border-gray-200 rounded-lg p-4 my-2" onClick={(e) => e.stopPropagation()}>
                  {/* Left Section - Product Categories */}
                  <div>
                    <div className="space-y-4">
                      <button
                        onClick={(e) => handleMobileLinkClick("/custom-sports", e)}
                        className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded transition-colors group cursor-pointer w-full text-left"
                      >
                        <CustomSportsIcons.Caps />
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 group-hover:text-gray-900">Caps</h4>
                          <p className="text-xs text-gray-500 mt-1">Customise caps with your club logo</p>
                        </div>
                      </button>
                      <button
                        onClick={(e) => handleMobileLinkClick("/custom-sports", e)}
                        className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded transition-colors group cursor-pointer w-full text-left"
                      >
                        <CustomSportsIcons.SportsShirts />
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 group-hover:text-gray-900">Sports Shirts</h4>
                          <p className="text-xs text-gray-500 mt-1">Get your club logo on our sports shirts</p>
                        </div>
                      </button>
                      <button
                        onClick={(e) => handleMobileLinkClick("/custom-sports", e)}
                        className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded transition-colors group cursor-pointer w-full text-left"
                      >
                        <CustomSportsIcons.Shorts />
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 group-hover:text-gray-900">Shorts</h4>
                          <p className="text-xs text-gray-500 mt-1">Custom branded shorts</p>
                        </div>
                      </button>
                      <button
                        onClick={(e) => handleMobileLinkClick("/custom-sports", e)}
                        className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded transition-colors group cursor-pointer w-full text-left"
                      >
                        <CustomSportsIcons.Hoodies />
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 group-hover:text-gray-900">Hoodies</h4>
                          <p className="text-xs text-gray-500 mt-1">Custom branded hoodies</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Right Section - Call For Customisation */}
                  <div className="flex flex-col mt-6">
                    <h3 className="text-base font-bold text-gray-900 mb-4">Call For Customisation</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Phone className="w-4 h-4 text-gray-700" />
                      <span className="text-sm text-gray-700">0412 806 051</span>
                    </div>
                    {/* Product Image - Sports Jersey */}
                    <div className="flex-1 bg-gradient-to-br from-[#92d7f6] via-[#7bc5e8] to-[#92d7f6] rounded-lg p-6 relative overflow-hidden min-h-[280px]">
                      {/* Swirl Pattern Background */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-full h-full">
                          <svg width="100%" height="100%" viewBox="0 0 200 300" className="opacity-30">
                            <path d="M0,150 Q50,50 100,100 T200,150" stroke="white" strokeWidth="2" fill="none" />
                            <path d="M0,180 Q50,80 100,130 T200,180" stroke="white" strokeWidth="2" fill="none" />
                          </svg>
                        </div>
                      </div>
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        {/* Top Section */}
                        <div>
                          <div className="bg-white/10 backdrop-blur-sm rounded px-3 py-1 inline-block mb-4">
                            <span className="text-white text-xs font-semibold">SPORT JERSEY</span>
                          </div>
                          {/* Left Sleeve Logo */}
                          <div className="absolute top-8 left-2 text-white text-[10px] font-bold">GS</div>
                          {/* Right Sleeve Logo */}
                          <div className="absolute top-8 right-2 text-white text-[10px] font-bold">B</div>
                        </div>
                        
                        {/* Center Number */}
                        <div className="flex flex-col items-center justify-center flex-1">
                          <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mb-2 shadow-lg">
                            <span className="text-4xl font-bold text-[#92d7f6]">17</span>
                          </div>
                        </div>
                        
                        {/* Bottom Text */}
                        <div className="text-center">
                          <div className="text-white text-sm font-semibold">17 GS</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={(e) => handleMobileLinkClick("/about", e)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 uppercase hover:bg-gray-50 rounded-lg transition-colors"
              >
                ABOUT
              </button>

              <button
                onClick={(e) => handleMobileLinkClick("/contact", e)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 uppercase hover:bg-gray-50 rounded-lg transition-colors"
              >
                CONTACT
              </button>

              <button
                onClick={(e) => handleMobileLinkClick("/login", e)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 uppercase hover:bg-gray-50 rounded-lg transition-colors"
              >
                LOGIN
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
