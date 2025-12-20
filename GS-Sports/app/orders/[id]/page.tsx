"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, Package, CheckCircle, Clock, XCircle, AlertCircle, MapPin, Phone, Mail, User } from "lucide-react"
import { getOrderById } from "@/services/apiService"

interface OrderItem {
  productId: {
    _id: string
    name: string
    images?: string[]
  } | string
  productName?: string
  quantity: number
  price: number
  subtotal: number
}

interface Order {
  _id: string
  userId: string
  customer: {
    fullName: string
    email: string
    phone: string
  }
  cartItems: OrderItem[]
  shippingAddress: {
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  billingSameAsShipping?: boolean
  billingAddress?: {
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  orderSummary: {
    totalItems: number
    subtotalAmount: number
    shippingCharges: number
    taxAmount: number
    discountAmount: number
    totalAmount: number
  }
  paymentMethod: string
  paymentStatus: string
  orderStatus: string
  orderTimeline?: Array<{
    status: string
    timestamp: string
    note: string
    _id: string
  }>
  orderNotes?: string
  couponCode?: string
  stripePaymentIntentId?: string
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

const paymentStatusConfig: Record<string, { label: string; color: string }> = {
  Pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800"
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800"
  },
  Paid: {
    label: "Paid",
    color: "bg-green-100 text-green-800"
  },
  paid: {
    label: "Paid",
    color: "bg-green-100 text-green-800"
  },
  Failed: {
    label: "Failed",
    color: "bg-red-100 text-red-800"
  },
  failed: {
    label: "Failed",
    color: "bg-red-100 text-red-800"
  },
  Refunded: {
    label: "Refunded",
    color: "bg-gray-100 text-gray-800"
  },
  refunded: {
    label: "Refunded",
    color: "bg-gray-100 text-gray-800"
  }
}

export default function OrderDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError] = useState<string>("")

  // Load order details
  useEffect(() => {
    const loadOrder = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token")
        
        if (!token) {
          setError("Please login first to view order details")
          setIsLoading(false)
          setTimeout(() => {
            router.push("/login")
          }, 2000)
          return
        }
        
        setIsAuthenticated(true)
        
        try {
          const response = await getOrderById(orderId)
          if (response.success && response.data?.order) {
            setOrder(response.data.order)
          } else {
            setError("Order not found")
          }
        } catch (err: any) {
          if (err.status === 401) {
            setError("Please login first to view order details")
            setTimeout(() => {
              router.push("/login")
            }, 2000)
          } else if (err.status === 403) {
            setError("You don't have permission to view this order")
          } else if (err.status === 404) {
            setError("Order not found")
          } else {
            setError(err.message || "Failed to load order details")
          }
        } finally {
          setIsLoading(false)
        }
      }
    }
    
    if (orderId) {
      loadOrder()
    }
  }, [orderId, router])

  const formatPrice = (price: number | undefined | null) => {
    if (price === undefined || price === null || isNaN(price)) {
      return "$0.00"
    }
    // Prices are in dollars (not cents) based on API response
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading order details...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (error && !order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/profile"
              className="inline-block px-6 py-3 bg-[#92d7f6] text-white font-semibold rounded-lg hover:bg-[#7bc5e8] transition-colors"
            >
              Back to Orders
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!order) {
    return null
  }

  const status = statusConfig[order.orderStatus] || statusConfig.pending
  const StatusIcon = status?.icon || Clock
  const paymentStatus = paymentStatusConfig[order.paymentStatus] || paymentStatusConfig.Pending || paymentStatusConfig.pending || { label: order.paymentStatus || "Unknown", color: "bg-gray-100 text-gray-800" }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/profile"
            className="inline-flex items-center text-gray-600 hover:text-[#92d7f6] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Order #{order._id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-gray-600">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold border ${status.color}`}
              >
                <StatusIcon className="w-4 h-4" />
                {status.label}
              </span>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${paymentStatus.color}`}
              >
                {paymentStatus.label}
              </span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.cartItems && order.cartItems.length > 0 ? (
                  order.cartItems.map((item, index) => {
                    const productName = typeof item.productId === "object" ? item.productId.name : item.productName || "Unknown Product"
                    const productImages = typeof item.productId === "object" ? item.productId.images : []
                    
                    return (
                      <div key={index} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                        {productImages?.[0] && (
                          <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={productImages[0]}
                              alt={productName}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{productName}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Quantity: {item.quantity} × {formatPrice(item.price)}
                          </p>
                          <p className="text-lg font-bold text-[#92d7f6]">
                            {formatPrice(item.subtotal || item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-gray-500 text-center py-4">No items found</p>
                )}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </h2>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Full Name</p>
                  <p className="font-semibold">{order.customer?.fullName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {order.customer?.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    {order.customer?.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>{order.shippingAddress?.addressLine1 || "N/A"}</p>
                {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                <p>
                  {order.shippingAddress?.city || ""}, {order.shippingAddress?.state || ""} {order.shippingAddress?.postalCode || ""}
                </p>
                <p>{order.shippingAddress?.country || "N/A"}</p>
              </div>
            </div>

            {/* Billing Address (if different) */}
            {order.billingAddress && !order.billingSameAsShipping && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Billing Address
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>{order.billingAddress.addressLine1}</p>
                  {order.billingAddress.addressLine2 && <p>{order.billingAddress.addressLine2}</p>}
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}
                  </p>
                  <p>{order.billingAddress.country}</p>
                </div>
              </div>
            )}

            {/* Order Timeline */}
            {order.orderTimeline && order.orderTimeline.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h2>
                <div className="space-y-4">
                  {order.orderTimeline.map((timeline, index) => (
                    <div key={timeline._id || index} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-[#92d7f6] rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 capitalize">{timeline.status}</p>
                        <p className="text-sm text-gray-600 mt-1">{timeline.note}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(timeline.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    {formatPrice(order.orderSummary?.subtotalAmount || 0)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">{formatPrice(order.orderSummary?.shippingCharges || 0)}</span>
                </div>
                {order.orderSummary?.taxAmount > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold">{formatPrice(order.orderSummary.taxAmount)}</span>
                  </div>
                )}
                {order.orderSummary?.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatPrice(order.orderSummary.discountAmount)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(order.orderSummary?.totalAmount || order.totalAmount || 0)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="font-semibold text-gray-900">{order.paymentMethod || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                  <p className="font-semibold text-gray-900">{paymentStatus.label}</p>
                </div>
                {order.orderNotes && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Notes</p>
                    <p className="text-sm text-gray-900">{order.orderNotes}</p>
                  </div>
                )}
                {order.couponCode && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Coupon Code</p>
                    <p className="font-semibold text-gray-900">{order.couponCode}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Date</p>
                  <p className="font-semibold text-gray-900">{formatDate(order.createdAt)}</p>
                </div>
                {order.updatedAt !== order.createdAt && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                    <p className="font-semibold text-gray-900">{formatDate(order.updatedAt)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
