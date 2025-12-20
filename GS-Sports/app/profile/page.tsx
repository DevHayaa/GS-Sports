"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { User, Mail, Phone, MapPin, Save, Loader2, AlertCircle, CheckCircle, ArrowLeft, Package, Clock, CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react"
import { useUserStore } from "@/store/user-store"
import { getUserOrders } from "@/services/apiService"

export default function ProfilePage() {
  const router = useRouter()
  const { profile, profileCompleted, dashboardData, loading, error, fetchUserProfile, updateUserProfile, fetchDashboard } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [success, setSuccess] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [orders, setOrders] = useState<Array<{
    _id?: string
    orderSummary?: {
      totalAmount?: number
    }
    totalAmount?: number
    orderStatus?: string
    paymentStatus?: string
    createdAt?: string
  }>>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Australia",
    },
  })

  // Check authentication and load all data
  useEffect(() => {
    if (typeof window === "undefined") return

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    fetchUserProfile()
    fetchDashboard()
    loadOrders()
  }, [router, fetchUserProfile, fetchDashboard])

  // Load orders
  const loadOrders = async () => {
    setIsLoadingOrders(true)
    try {
      const response = await getUserOrders()
      if (response.success) {
        const ordersData = response.data?.orders || response.data || []
        setOrders(Array.isArray(ordersData) ? ordersData : [])
      }
    } catch (err: any) {
      console.error("Error loading orders:", err)
    } finally {
      setIsLoadingOrders(false)
    }
  }

  // Populate form when profile loads
  useEffect(() => {
    if (profile && !isEditing) {
      setFormData({
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        address: profile.address || {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "Australia",
        },
      })
    } else if (!profile) {
      // Reset form for new profile
      setFormData({
        fullName: "",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "Australia",
        },
      })
    }
  }, [profile, isEditing])

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith("address.")) {
      const key = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    // Clear errors
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
    setSuccess("")
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors["fullName"] = "Full name is required"
    }
    if (!formData.address.street.trim()) {
      newErrors["address.street"] = "Street address is required"
    }
    if (!formData.address.city.trim()) {
      newErrors["address.city"] = "City is required"
    }
    if (!formData.address.state.trim()) {
      newErrors["address.state"] = "State is required"
    }
    if (!formData.address.postalCode.trim()) {
      newErrors["address.postalCode"] = "Postal code is required"
    }
    if (!formData.address.country.trim()) {
      newErrors["address.country"] = "Country is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess("")
    setErrors({})

    if (!validateForm()) {
      return
    }

    setIsSaving(true)

    try {
      // Only update existing profile (profiles are auto-created on first order)
      if (!profile) {
        setSuccess("")
        setErrors({})
        setIsSaving(false)
        // Error will be shown via the store's error state
        return
      }

      const success = await updateUserProfile({
        fullName: formData.fullName,
        phone: formData.phone || undefined,
        address: formData.address,
      })

      if (success) {
        setSuccess("Profile updated successfully!")
        setIsEditing(false)
        setTimeout(() => setSuccess(""), 3000)
      }
    } catch (err: any) {
      console.error("Profile save error:", err)
      setSuccess("")
      setErrors({})
      // Error will be shown via the store's error state
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    // Reset form to profile data
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        address: profile.address || {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "Australia",
        },
      })
    }
    setIsEditing(false)
    setErrors({})
    setSuccess("")
  }

  const formatPrice = (price: number | undefined | null) => {
    if (price === undefined || price === null || isNaN(price)) {
      return "$0.00"
    }
    const priceInDollars = price > 1000 ? price / 100 : price
    if (isNaN(priceInDollars) || !isFinite(priceInDollars)) {
      return "$0.00"
    }
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(priceInDollars)
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string | undefined) => {
    if (!status) return <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>
    const statusConfig: Record<string, { label: string; className: string }> = {
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
      confirmed: { label: "Confirmed", className: "bg-blue-100 text-blue-800" },
      processing: { label: "Processing", className: "bg-blue-100 text-blue-800" },
      shipped: { label: "Shipped", className: "bg-purple-100 text-purple-800" },
      delivered: { label: "Delivered", className: "bg-green-100 text-green-800" },
      cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800" },
    }
    const config = statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-800" }
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${config.className}`}>{config.label}</span>
    )
  }

  const getPaymentStatusBadge = (status: string | undefined) => {
    if (!status) return <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>
    const statusConfig: Record<string, { label: string; className: string }> = {
      Pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
      Paid: { label: "Paid", className: "bg-green-100 text-green-800" },
      Failed: { label: "Failed", className: "bg-red-100 text-red-800" },
      Refunded: { label: "Refunded", className: "bg-gray-100 text-gray-800" },
    }
    const config = statusConfig[status] || { label: status, className: "bg-gray-100 text-gray-800" }
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${config.className}`}>{config.label}</span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#92d7f6] mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-[#92d7f6] mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your profile, view statistics, and track your orders</p>
        </div>

        {/* Messages */}
        {(error || success) && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start gap-2 ${
              success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            }`}
          >
            {success ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <p className={`text-sm ${success ? "text-green-700" : "text-red-700"}`}>{success || error}</p>
          </div>
        )}

        {/* Dashboard Stats Section */}
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-[#92d7f6] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-[#92d7f6]" />
                </div>
              </div>
            </div>

            {/* Pending Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Pending Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.pendingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Completed Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Completed Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.completedOrders}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {profile ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-[#92d7f6] hover:text-[#7bc5e8] font-medium"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

              <form onSubmit={handleSubmit}>
                {/* Email (Read-only) */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-black mb-2 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile?.email || ""}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Full Name */}
                <div className="mb-6">
                  <label htmlFor="fullName" className="block text-sm font-medium text-black mb-2 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    disabled={!isEditing}
                    required
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                      errors["fullName"] ? "border-red-500" : "border-gray-300"
                    } ${!isEditing ? "bg-gray-50 cursor-not-allowed" : ""}`}
                  />
                  {errors["fullName"] && <p className="text-red-500 text-xs mt-1">{errors["fullName"]}</p>}
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                      errors["phone"] ? "border-red-500" : "border-gray-300"
                    } ${!isEditing ? "bg-gray-50 cursor-not-allowed" : ""}`}
                  />
                  {errors["phone"] && <p className="text-red-500 text-xs mt-1">{errors["phone"]}</p>}
                </div>

                {/* Address Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Address *
                  </h3>

                  {/* Street */}
                  <div className="mb-4">
                    <label htmlFor="street" className="block text-sm font-medium text-black mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="street"
                      value={formData.address.street}
                      onChange={(e) => handleInputChange("address.street", e.target.value)}
                      disabled={!isEditing}
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                        errors["address.street"] ? "border-red-500" : "border-gray-300"
                      } ${!isEditing ? "bg-gray-50 cursor-not-allowed" : ""}`}
                    />
                    {errors["address.street"] && <p className="text-red-500 text-xs mt-1">{errors["address.street"]}</p>}
                  </div>

                  {/* City and State */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-black mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={formData.address.city}
                        onChange={(e) => handleInputChange("address.city", e.target.value)}
                        disabled={!isEditing}
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                          errors["address.city"] ? "border-red-500" : "border-gray-300"
                        } ${!isEditing ? "bg-gray-50 cursor-not-allowed" : ""}`}
                      />
                      {errors["address.city"] && <p className="text-red-500 text-xs mt-1">{errors["address.city"]}</p>}
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-black mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        value={formData.address.state}
                        onChange={(e) => handleInputChange("address.state", e.target.value)}
                        disabled={!isEditing}
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                          errors["address.state"] ? "border-red-500" : "border-gray-300"
                        } ${!isEditing ? "bg-gray-50 cursor-not-allowed" : ""}`}
                      />
                      {errors["address.state"] && <p className="text-red-500 text-xs mt-1">{errors["address.state"]}</p>}
                    </div>
                  </div>

                  {/* Postal Code and Country */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-black mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        value={formData.address.postalCode}
                        onChange={(e) => handleInputChange("address.postalCode", e.target.value)}
                        disabled={!isEditing}
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                          errors["address.postalCode"] ? "border-red-500" : "border-gray-300"
                        } ${!isEditing ? "bg-gray-50 cursor-not-allowed" : ""}`}
                      />
                      {errors["address.postalCode"] && (
                        <p className="text-red-500 text-xs mt-1">{errors["address.postalCode"]}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-black mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        id="country"
                        value={formData.address.country}
                        onChange={(e) => handleInputChange("address.country", e.target.value)}
                        disabled={!isEditing}
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                          errors["address.country"] ? "border-red-500" : "border-gray-300"
                        } ${!isEditing ? "bg-gray-50 cursor-not-allowed" : ""}`}
                      />
                      {errors["address.country"] && <p className="text-red-500 text-xs mt-1">{errors["address.country"]}</p>}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-[#92d7f6] text-white font-semibold rounded-lg hover:bg-[#7bc5e8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
                  </div>
                )}
              </form>
              </div>
            </div>

            {/* Right Column - Orders */}
            <div className="lg:col-span-2 space-y-6">
            {/* Latest Orders */}
            {dashboardData && dashboardData.latestOrders.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Recent Orders
                </h2>
                <div className="space-y-4">
                  {dashboardData.latestOrders.slice(0, 5).map((order) => (
                    <Link
                      key={order._id}
                      href={`/orders/${order._id}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:border-[#92d7f6] hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-gray-900 text-sm">
                            Order #{order._id?.slice(-8).toUpperCase() || "N/A"}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          {formatPrice(order.orderSummary?.totalAmount || order.totalAmount || 0)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(order.orderStatus)}
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </div>
                      <p className="text-xs text-gray-500">
                        {formatDate(order.createdAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Order History
              </h2>

              {isLoadingOrders ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[#92d7f6] mx-auto mb-4" />
                  <p className="text-gray-500">Loading orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No orders yet</p>
                  <p className="text-gray-400 text-sm mt-2">Start shopping to see your orders here</p>
                  <Link
                    href="/shop"
                    className="inline-block mt-4 px-6 py-2 bg-[#92d7f6] text-white font-semibold rounded-lg hover:bg-[#7bc5e8] transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Total Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Order Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Payment Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <span className="text-sm font-medium text-gray-900">
                              #{order._id?.slice(-8).toUpperCase() || "N/A"}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm font-semibold text-gray-900">
                              {formatPrice(order.orderSummary?.totalAmount || order.totalAmount || 0)}
                            </span>
                          </td>
                          <td className="py-4 px-4">{getStatusBadge(order.orderStatus || "pending")}</td>
                          <td className="py-4 px-4">{getPaymentStatusBadge(order.paymentStatus || "Pending")}</td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-gray-600">{formatDate(order.createdAt)}</span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            {order._id && (
                              <Link
                                href={`/orders/${order._id}`}
                                className="text-sm text-[#92d7f6] hover:text-[#7bc5e8] font-medium inline-flex items-center gap-1"
                              >
                                View <ArrowRight className="w-3 h-3" />
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <User className="w-16 h-16 text-[#92d7f6] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Not Created Yet</h2>
            <p className="text-gray-600 mb-6">
              Your profile will be automatically created when you place your first order. The information you provide during checkout will be used to create your profile.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-[#92d7f6] text-white font-semibold rounded-lg hover:bg-[#7bc5e8] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
