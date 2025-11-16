"use client"

import { useCart } from "@/context/cart-context"
import { X, Plus, Minus } from "lucide-react"
import Image from "next/image"

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, isCartOpen, setIsCartOpen } = useCart()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 opacity-20 z-40 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg rounded-l-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
                {/* Product Image */}
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-black text-sm">{item.name}</h3>
                  <p className="text-primary font-bold text-sm mt-1">₹{item.price.toFixed(2)}</p>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Minus className="w-4 h-4 text-black" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-black">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4 text-black" />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors text-lg font-bold"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Subtotal:</span>
              <span className="text-xl font-bold text-black">₹{subtotal.toFixed(2)}</span>
            </div>

            {/* Buttons */}
            <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Checkout
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-white border-2 border-primary text-primary font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
