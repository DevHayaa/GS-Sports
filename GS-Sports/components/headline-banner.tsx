"use client"

import { Truck, Shield, Award } from "lucide-react"

export default function HeadlineBanner() {
  return (
    <div className="bg-[#92d7f6] text-white py-2 px-4 overflow-hidden">
      <div className="flex items-center animate-scroll">
        <div className="flex items-center space-x-8 text-sm whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-white" />
            <span>Free Shipping on Orders Over $100</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-white" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-white" />
            <span>Premium Quality Guaranteed</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-white" />
            <span>Free Shipping on Orders Over $100</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-white" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-white" />
            <span>Premium Quality Guaranteed</span>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
