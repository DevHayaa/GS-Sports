"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, Package, CheckCircle, Clock, XCircle, AlertCircle, Eye } from "lucide-react"
import { getUserOrders } from "@/services/apiService"

interface OrderItem {
  product: {
    _id: string
    name: string
    price: number
    images?: string[]
  }
  quantity: number
  price: number
}

interface Order {
  _id: string
  userId: string
  items: OrderItem[]
  shippingAddress: {
    fullName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
  }
  totalAmount: number
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "failed"
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  updatedAt: string
}

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock
  },
  processing: {
    label: "Processing",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Package
  },
  shipped: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Package
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle
  }
}

const paymentStatusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800"
  },
  paid: {
    label: "Paid",
    color: "bg-green-100 text-green-800"
  },
  failed: {
    label: "Failed",
    color: "bg-red-100 text-red-800"
  }
}

function OrdersPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState<string>("")
  const [showSuccess, setShowSuccess] = useState(false)

  // Check for success parameter
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }, [searchParams])

  // Load orders
  useEffect(() => {
    const loadOrders = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token")
        
        if (!token) {
          setError("Please login first to view your orders")
          setIsLoading(false)
          setTimeout(() => {
            router.push("/login")
          }, 2000)
          return
        }
        
        setIsAuthenticated(true)
        
        try {
          const response = await getUserOrders()
          if (response.success && response.data?.orders) {
            setOrders(response.data.orders)
          } else {
            setOrders([])
          }
        } catch (err: any) {
          if (err.status === 401) {
            setError("Please login first to view your orders")
            setTimeout(() => {
              router.push("/login")
            }, 2000)
          } else {
            setError(err.message || "Failed to load orders")
          }
        } finally {
          setIsLoading(false)
        }
      }
    }
    
    loadOrders()
  }, [router])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-[#92d7f6] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
              <p className="text-gray-600">View and track your order history</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 mb-1">Order placed successfully!</h3>
              <p className="text-sm text-green-700">Your order has been confirmed and will be processed soon.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-[#92d7f6] text-white font-semibold rounded-lg hover:bg-[#7bc5e8] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.orderStatus]
              const StatusIcon = status.icon
              const paymentStatus = paymentStatusConfig[order.paymentStatus]
              
              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Order #{order._id.slice(-8).toUpperCase()}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {status.label}
                            </span>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${paymentStatus.color}`}
                            >
                              {paymentStatus.label}
                            </span>
                          </div>
                          
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Placed on: {formatDate(order.createdAt)}</p>
                            <p>Payment: {order.paymentMethod}</p>
                            <p>Total: <span className="font-semibold text-gray-900">{formatPrice(order.orderSummary?.totalAmount || order.totalAmount || 0)}</span></p>
                          </div>
                        </div>
                      </div>

                      {/* Order Items Preview */}
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Items ({order.items.length})</h4>
                        <div className="space-y-2">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm">
                              {item.product.images?.[0] && (
                                <div className="relative w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                  <Image
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="text-gray-900">{item.product.name}</p>
                                <p className="text-gray-600">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <p className="text-sm text-gray-500">+ {order.items.length - 3} more item(s)</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 md:items-end">
                      <Link
                        href={`/orders/${order._id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#92d7f6] border border-[#92d7f6] rounded-lg hover:bg-[#92d7f6] hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-8 h-8 mx-auto mb-4 text-[#92d7f6] animate-pulse" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    }>
      <OrdersPageContent />
    </Suspense>
  )
}
