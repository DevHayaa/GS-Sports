"use client"

import { useRouter } from "next/navigation"
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { useCartStore } from "@/store/cart-store"

export default function CartDrawer() {
  const router = useRouter()
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    getTotalQuantity,
    getTotalAmount,
  } = useCartStore()

  const handleCheckout = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      // Redirect to login with return URL
      router.push(`/login?redirect=/checkout`)
      return
    }
    setIsOpen(false)
    router.push("/checkout")
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const totalAmount = getTotalAmount()
  const totalQuantity = getTotalQuantity()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-20 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg rounded-l-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black">Your Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add some items to get started</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="flex gap-4 pb-4 border-b border-gray-200">
                {/* Product Image */}
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-black text-sm">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {item.discountPrice ? (
                      <>
                        <p className="text-primary font-bold text-sm">
                          {formatPrice(item.discountPrice)}
                        </p>
                        <p className="text-gray-400 line-through text-xs">
                          {formatPrice(item.price)}
                        </p>
                      </>
                    ) : (
                      <p className="text-primary font-bold text-sm">{formatPrice(item.price)}</p>
                    )}
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Minus className="w-4 h-4 text-black" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4 text-black" />
                    </button>
                  </div>
                </div>

                {/* Remove Button & Subtotal */}
                <div className="flex flex-col items-end justify-between">
                <button
                    onClick={() => removeItem(item.productId)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
                  <p className="text-sm font-semibold text-black mt-auto">
                    {formatPrice(item.subtotal)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Items:</span>
                <span className="text-black font-medium">{totalQuantity}</span>
              </div>
            <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total Amount:</span>
                <span className="text-xl font-bold text-black">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Buttons */}
            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => setIsOpen(false)}
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
