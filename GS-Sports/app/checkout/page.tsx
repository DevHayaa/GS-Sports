"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/store/cart-store"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { MapPin, User, Phone, Mail, ArrowLeft, ShoppingBag, AlertCircle, CreditCard, Truck, Loader2 } from "lucide-react"
import { syncCart, createStripePaymentIntent, placeOrder } from "@/services/apiService"
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

interface CheckoutData {
  customer: {
    fullName: string
    email: string
    phone: string
  }
  shippingAddress: {
    country: string
    state: string
    city: string
    postalCode: string
    addressLine1: string
    addressLine2: string
  }
  billingSameAsShipping: boolean
  billingAddress: {
    country: string
    state: string
    city: string
    postalCode: string
    addressLine1: string
    addressLine2: string
  }
  paymentMethod: "COD" | "CARD"
  orderNotes: string
  couponCode: string
}

// Stripe Card Form Component
function StripeCardForm({
  onPaymentSuccess,
  onPaymentError,
}: {
  onPaymentSuccess: (paymentIntentId: string) => void
  onPaymentError: (error: string) => void
}) {
  const stripe = useStripe()
  const elements = useElements()

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <label className="block text-sm font-medium text-black mb-2">Card Details</label>
      <div className="p-3 border border-gray-300 rounded-lg bg-white">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">Your payment will be processed securely by Stripe</p>
    </div>
  )
}

// Main Checkout Form Component
function CheckoutForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items: cartItems, getTotalAmount, clearCart, setIsOpen } = useCartStore()
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    customer: {
      fullName: "",
      email: "",
      phone: "",
    },
    shippingAddress: {
      country: "Australia",
      state: "",
      city: "",
      postalCode: "",
      addressLine1: "",
      addressLine2: "",
    },
    billingSameAsShipping: true,
    billingAddress: {
      country: "Australia",
      state: "",
      city: "",
      postalCode: "",
      addressLine1: "",
      addressLine2: "",
    },
    paymentMethod: "COD",
    orderNotes: "",
    couponCode: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [isSyncingCart, setIsSyncingCart] = useState(false)
  const [error, setError] = useState<string>("")
  const [clientSecret, setClientSecret] = useState<string>("")
  const [showStripeForm, setShowStripeForm] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  // Check authentication and sync cart
  useEffect(() => {
    const checkAuthAndSync = async () => {
      if (typeof window === "undefined") return

      const token = localStorage.getItem("token")
      if (!token) {
        // Redirect to login with return URL
        const currentPath = window.location.pathname + window.location.search
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
        return
      }

      setIsAuthenticated(true)

      // Sync guest cart with backend after login
      if (cartItems.length > 0) {
        setIsSyncingCart(true)
        try {
          const syncItems = cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          }))
          await syncCart(syncItems)
          console.log("Cart synced successfully")
        } catch (err: any) {
          console.error("Cart sync error:", err)
          // Continue anyway - cart sync failure shouldn't block checkout
        } finally {
          setIsSyncingCart(false)
        }
      }
    }

    checkAuthAndSync()
  }, [router, cartItems.length])

  // Calculate order summary
  const orderSummary = useMemo(() => {
    const subtotal = getTotalAmount()
    const shippingCharges = 15.99
    const taxAmount = subtotal * 0.1 // 10% GST for Australia
    const totalAmount = subtotal + shippingCharges + taxAmount

    return {
      subtotalAmount: subtotal,
      shippingCharges,
      taxAmount,
      totalAmount,
    }
  }, [getTotalAmount])

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith("customer.")) {
      const key = field.split(".")[1]
      setCheckoutData((prev) => ({
        ...prev,
        customer: { ...prev.customer, [key]: value },
      }))
    } else if (field.startsWith("shippingAddress.")) {
      const key = field.split(".")[1]
      setCheckoutData((prev) => ({
        ...prev,
        shippingAddress: { ...prev.shippingAddress, [key]: value },
      }))
    } else {
      setCheckoutData((prev) => ({ ...prev, [field]: value }))
    }

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
    setError("")
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate customer
    if (!checkoutData.customer.fullName.trim()) {
      newErrors["customer.fullName"] = "Full name is required"
    }
    if (!checkoutData.customer.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutData.customer.email)) {
      newErrors["customer.email"] = "Valid email is required"
    }
    if (!checkoutData.customer.phone.trim() || checkoutData.customer.phone.trim().length < 10) {
      newErrors["customer.phone"] = "Valid phone number is required"
    }

    // Validate billing address if different from shipping
    if (!checkoutData.billingSameAsShipping) {
      if (!checkoutData.billingAddress.addressLine1.trim()) {
        newErrors["billingAddress.addressLine1"] = "Billing address line 1 is required"
      }
      if (!checkoutData.billingAddress.city.trim()) {
        newErrors["billingAddress.city"] = "Billing city is required"
      }
      if (!checkoutData.billingAddress.state.trim()) {
        newErrors["billingAddress.state"] = "Billing state is required"
      }
      if (!checkoutData.billingAddress.postalCode.trim()) {
        newErrors["billingAddress.postalCode"] = "Billing postal code is required"
      }
      if (!checkoutData.billingAddress.country.trim()) {
        newErrors["billingAddress.country"] = "Billing country is required"
      }
    }

    // Validate shipping address
    if (!checkoutData.shippingAddress.country.trim()) {
      newErrors["shippingAddress.country"] = "Country is required"
    }
    if (!checkoutData.shippingAddress.state.trim()) {
      newErrors["shippingAddress.state"] = "State is required"
    }
    if (!checkoutData.shippingAddress.city.trim()) {
      newErrors["shippingAddress.city"] = "City is required"
    }
    if (!checkoutData.shippingAddress.postalCode.trim()) {
      newErrors["shippingAddress.postalCode"] = "Postal code is required"
    }
    if (!checkoutData.shippingAddress.addressLine1.trim()) {
      newErrors["shippingAddress.addressLine1"] = "Address line 1 is required"
    }

    // Validate cart
    if (cartItems.length === 0) {
      newErrors["cart"] = "Your cart is empty"
    }

    // Validate payment method
    if (!checkoutData.paymentMethod) {
      newErrors["paymentMethod"] = "Payment method is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle place order
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)

    try {
      let paymentIntentId: string | undefined = undefined

      // If Stripe payment, create payment intent first
      if (checkoutData.paymentMethod === "CARD") {
        setIsProcessingPayment(true)
        try {
          const intentResponse = await createStripePaymentIntent({
            amount: orderSummary.totalAmount,
            currency: "aud",
          })

          if (intentResponse.success && intentResponse.data?.clientSecret) {
            setClientSecret(intentResponse.data.clientSecret)
            setShowStripeForm(true)
            setIsLoading(false)
            setIsProcessingPayment(false)
            return // Wait for Stripe payment confirmation
          } else {
            throw new Error("Failed to create payment intent")
          }
        } catch (err: any) {
          setError(err.message || "Failed to initialize payment")
          setIsLoading(false)
          setIsProcessingPayment(false)
          return
        }
      }

      // Prepare cart items
      const cartItemsPayload = cartItems.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: item.quantity,
        price: item.discountPrice ?? item.price,
        subtotal: item.subtotal,
      }))

      // Prepare order data
      const orderData = {
        customer: {
          fullName: checkoutData.customer.fullName,
          email: checkoutData.customer.email,
          phone: checkoutData.customer.phone,
        },
        shippingAddress: {
          addressLine1: checkoutData.shippingAddress.addressLine1,
          addressLine2: checkoutData.shippingAddress.addressLine2 || "",
          city: checkoutData.shippingAddress.city,
          state: checkoutData.shippingAddress.state,
          postalCode: checkoutData.shippingAddress.postalCode,
          country: checkoutData.shippingAddress.country,
        },
        billingSameAsShipping: checkoutData.billingSameAsShipping,
        billingAddress: checkoutData.billingSameAsShipping
          ? undefined
          : {
              addressLine1: checkoutData.billingAddress.addressLine1,
              addressLine2: checkoutData.billingAddress.addressLine2 || "",
              city: checkoutData.billingAddress.city,
              state: checkoutData.billingAddress.state,
              postalCode: checkoutData.billingAddress.postalCode,
              country: checkoutData.billingAddress.country,
            },
        cartItems: cartItemsPayload,
        orderSummary: {
          subtotalAmount: orderSummary.subtotalAmount,
          shippingCharges: orderSummary.shippingCharges,
          taxAmount: orderSummary.taxAmount,
          discountAmount: 0, // Can be calculated if coupon is applied
          totalAmount: orderSummary.totalAmount,
        },
        paymentMethod: checkoutData.paymentMethod === "COD" ? "COD" : "CARD",
        orderNotes: checkoutData.orderNotes.trim() || undefined,
        couponCode: checkoutData.couponCode.trim() || undefined,
        ...(paymentIntentId ? { paymentIntentId } : {}),
      }

      // Place order
      const response = await placeOrder(orderData)

      if (response.success) {
        // Clear cart and redirect
        clearCart()
        setIsOpen(false)
        const orderId = response.data?._id || response.data?.orderId || ""
        router.push(`/order-success?orderId=${orderId}`)
      }
    } catch (err: any) {
      console.error("Order placement error:", err)
      const errorMessage = err?.message || err?.data?.message || err?.data?.error || "Failed to place order"

      if (err?.status === 401) {
        setError("Please login first to place an order")
        setTimeout(() => router.push("/login"), 2000)
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
      setIsProcessingPayment(false)
    }
  }

  // Handle Stripe payment
  const handleStripePayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      setError("Stripe is not loaded. Please refresh the page.")
      return
    }

    setIsProcessingPayment(true)
    setError("")

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setError("Card element not found")
      setIsProcessingPayment(false)
      return
    }

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: checkoutData.customer.fullName,
            email: checkoutData.customer.email,
            phone: checkoutData.customer.phone,
            address: {
              line1: checkoutData.shippingAddress.addressLine1,
              line2: checkoutData.shippingAddress.addressLine2 || undefined,
              city: checkoutData.shippingAddress.city,
              state: checkoutData.shippingAddress.state,
              postal_code: checkoutData.shippingAddress.postalCode,
              country: checkoutData.shippingAddress.country,
            },
          },
        },
      })

      if (stripeError) {
        setError(stripeError.message || "Payment failed")
        setIsProcessingPayment(false)
      } else if (paymentIntent?.status === "succeeded") {
        // Payment successful - now place order
        try {
          // Prepare cart items
          const cartItemsPayload = cartItems.map((item) => ({
            productId: item.productId,
            productName: item.name,
            quantity: item.quantity,
            price: item.discountPrice ?? item.price,
            subtotal: item.subtotal,
          }))

          const orderData = {
            customer: {
              fullName: checkoutData.customer.fullName,
              email: checkoutData.customer.email,
              phone: checkoutData.customer.phone,
            },
            shippingAddress: {
              addressLine1: checkoutData.shippingAddress.addressLine1,
              addressLine2: checkoutData.shippingAddress.addressLine2 || "",
              city: checkoutData.shippingAddress.city,
              state: checkoutData.shippingAddress.state,
              postalCode: checkoutData.shippingAddress.postalCode,
              country: checkoutData.shippingAddress.country,
            },
            billingSameAsShipping: checkoutData.billingSameAsShipping,
            billingAddress: checkoutData.billingSameAsShipping
              ? undefined
              : {
                  addressLine1: checkoutData.billingAddress.addressLine1,
                  addressLine2: checkoutData.billingAddress.addressLine2 || "",
                  city: checkoutData.billingAddress.city,
                  state: checkoutData.billingAddress.state,
                  postalCode: checkoutData.billingAddress.postalCode,
                  country: checkoutData.billingAddress.country,
                },
            cartItems: cartItemsPayload,
            orderSummary: {
              subtotalAmount: orderSummary.subtotalAmount,
              shippingCharges: orderSummary.shippingCharges,
              taxAmount: orderSummary.taxAmount,
              discountAmount: 0,
              totalAmount: orderSummary.totalAmount,
            },
            paymentMethod: "CARD",
            paymentIntentId: paymentIntent.id,
            orderNotes: checkoutData.orderNotes.trim() || undefined,
            couponCode: checkoutData.couponCode.trim() || undefined,
          }

          const response = await placeOrder(orderData)

          if (response.success) {
            clearCart()
            setIsOpen(false)
            const orderId = response.data?._id || response.data?.orderId || ""
            router.push(`/order-success?orderId=${orderId}`)
          }
        } catch (err: any) {
          setError(err.message || "Failed to place order after payment")
          setIsProcessingPayment(false)
        }
      }
    } catch (err: any) {
      console.error("Stripe payment error:", err)
      setError(err.message || "Payment processing failed")
      setIsProcessingPayment(false)
    }
  }

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  // Check if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some items to your cart before checkout.</p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-[#92d7f6] text-white font-semibold rounded-lg hover:bg-[#7bc5e8] transition-colors"
          >
            Continue Shopping
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated || isSyncingCart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#92d7f6] mx-auto mb-4" />
          <p className="text-gray-600">
            {isSyncingCart ? "Syncing your cart..." : "Redirecting to login..."}
          </p>
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
          <Link href="/shop" className="inline-flex items-center text-gray-600 hover:text-[#92d7f6] mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-black mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Customer Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={checkoutData.customer.fullName}
                      onChange={(e) => handleInputChange("customer.fullName", e.target.value)}
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                        errors["customer.fullName"] ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors["customer.fullName"] && (
                      <p className="text-red-500 text-xs mt-1">{errors["customer.fullName"]}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        value={checkoutData.customer.email}
                        onChange={(e) => handleInputChange("customer.email", e.target.value)}
                        required
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                          errors["customer.email"] ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                    </div>
                    {errors["customer.email"] && (
                      <p className="text-red-500 text-xs mt-1">{errors["customer.email"]}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        value={checkoutData.customer.phone}
                        onChange={(e) => handleInputChange("customer.phone", e.target.value)}
                        required
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                          errors["customer.phone"] ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                    </div>
                    {errors["customer.phone"] && (
                      <p className="text-red-500 text-xs mt-1">{errors["customer.phone"]}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-black mb-6 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-black mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      value={checkoutData.shippingAddress.country}
                      onChange={(e) => handleInputChange("shippingAddress.country", e.target.value)}
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                        errors["shippingAddress.country"] ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors["shippingAddress.country"] && (
                      <p className="text-red-500 text-xs mt-1">{errors["shippingAddress.country"]}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-black mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={checkoutData.shippingAddress.state}
                      onChange={(e) => handleInputChange("shippingAddress.state", e.target.value)}
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                        errors["shippingAddress.state"] ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors["shippingAddress.state"] && (
                      <p className="text-red-500 text-xs mt-1">{errors["shippingAddress.state"]}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-black mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={checkoutData.shippingAddress.city}
                      onChange={(e) => handleInputChange("shippingAddress.city", e.target.value)}
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                        errors["shippingAddress.city"] ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors["shippingAddress.city"] && (
                      <p className="text-red-500 text-xs mt-1">{errors["shippingAddress.city"]}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-black mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      value={checkoutData.shippingAddress.postalCode}
                      onChange={(e) => handleInputChange("shippingAddress.postalCode", e.target.value)}
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                        errors["shippingAddress.postalCode"] ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors["shippingAddress.postalCode"] && (
                      <p className="text-red-500 text-xs mt-1">{errors["shippingAddress.postalCode"]}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="addressLine1" className="block text-sm font-medium text-black mb-2">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      id="addressLine1"
                      value={checkoutData.shippingAddress.addressLine1}
                      onChange={(e) => handleInputChange("shippingAddress.addressLine1", e.target.value)}
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                        errors["shippingAddress.addressLine1"] ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors["shippingAddress.addressLine1"] && (
                      <p className="text-red-500 text-xs mt-1">{errors["shippingAddress.addressLine1"]}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="addressLine2" className="block text-sm font-medium text-black mb-2">
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      id="addressLine2"
                      value={checkoutData.shippingAddress.addressLine2}
                      onChange={(e) => handleInputChange("shippingAddress.addressLine2", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-black mb-6 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#92d7f6] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={checkoutData.paymentMethod === "COD"}
                      onChange={(e) => {
                        handleInputChange("paymentMethod", e.target.value)
                        setShowStripeForm(false)
                      }}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-gray-600" />
                      <div>
                        <span className="font-semibold text-black">Cash on Delivery (COD)</span>
                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#92d7f6] transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="CARD"
                      checked={checkoutData.paymentMethod === "CARD"}
                      onChange={(e) => {
                        handleInputChange("paymentMethod", e.target.value)
                        setShowStripeForm(false)
                      }}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                      <div>
                        <span className="font-semibold text-black">Credit / Debit Card</span>
                        <p className="text-sm text-gray-600">Secure payment via Stripe</p>
                      </div>
                    </div>
                  </label>

                  {checkoutData.paymentMethod === "CARD" && showStripeForm && (
                    <StripeCardForm
                      onPaymentSuccess={(paymentIntentId) => {
                        // Payment success handled in handleStripePayment
                      }}
                      onPaymentError={(error) => setError(error)}
                    />
                  )}
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-black mb-6">Billing Address</h2>

                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={checkoutData.billingSameAsShipping}
                      onChange={(e) => handleInputChange("billingSameAsShipping", e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Billing address same as shipping</span>
                  </label>
                </div>

                {!checkoutData.billingSameAsShipping && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="billingAddressLine1" className="block text-sm font-medium text-black mb-2">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        id="billingAddressLine1"
                        value={checkoutData.billingAddress.addressLine1}
                        onChange={(e) => handleInputChange("billingAddress.addressLine1", e.target.value)}
                        required={!checkoutData.billingSameAsShipping}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                          errors["billingAddress.addressLine1"] ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors["billingAddress.addressLine1"] && (
                        <p className="text-red-500 text-xs mt-1">{errors["billingAddress.addressLine1"]}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="billingAddressLine2" className="block text-sm font-medium text-black mb-2">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        id="billingAddressLine2"
                        value={checkoutData.billingAddress.addressLine2}
                        onChange={(e) => handleInputChange("billingAddress.addressLine2", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="billingCity" className="block text-sm font-medium text-black mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          id="billingCity"
                          value={checkoutData.billingAddress.city}
                          onChange={(e) => handleInputChange("billingAddress.city", e.target.value)}
                          required={!checkoutData.billingSameAsShipping}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            errors["billingAddress.city"] ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors["billingAddress.city"] && (
                          <p className="text-red-500 text-xs mt-1">{errors["billingAddress.city"]}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="billingState" className="block text-sm font-medium text-black mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          id="billingState"
                          value={checkoutData.billingAddress.state}
                          onChange={(e) => handleInputChange("billingAddress.state", e.target.value)}
                          required={!checkoutData.billingSameAsShipping}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            errors["billingAddress.state"] ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors["billingAddress.state"] && (
                          <p className="text-red-500 text-xs mt-1">{errors["billingAddress.state"]}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="billingPostalCode" className="block text-sm font-medium text-black mb-2">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          id="billingPostalCode"
                          value={checkoutData.billingAddress.postalCode}
                          onChange={(e) => handleInputChange("billingAddress.postalCode", e.target.value)}
                          required={!checkoutData.billingSameAsShipping}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            errors["billingAddress.postalCode"] ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors["billingAddress.postalCode"] && (
                          <p className="text-red-500 text-xs mt-1">{errors["billingAddress.postalCode"]}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="billingCountry" className="block text-sm font-medium text-black mb-2">
                          Country *
                        </label>
                        <input
                          type="text"
                          id="billingCountry"
                          value={checkoutData.billingAddress.country}
                          onChange={(e) => handleInputChange("billingAddress.country", e.target.value)}
                          required={!checkoutData.billingSameAsShipping}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${
                            errors["billingAddress.country"] ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors["billingAddress.country"] && (
                          <p className="text-red-500 text-xs mt-1">{errors["billingAddress.country"]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Coupon Code */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-black mb-4">Coupon Code (Optional)</h2>
                <input
                  type="text"
                  id="couponCode"
                  value={checkoutData.couponCode}
                  onChange={(e) => handleInputChange("couponCode", e.target.value)}
                  placeholder="Enter coupon code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Order Notes */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-black mb-4">Order Notes (Optional)</h2>
                <textarea
                  id="orderNotes"
                  value={checkoutData.orderNotes}
                  onChange={(e) => handleInputChange("orderNotes", e.target.value)}
                  rows={4}
                  placeholder="Any special delivery instructions or notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Place Order Button */}
              {!showStripeForm ? (
                <button
                  type="submit"
                  disabled={isLoading || isSyncingCart}
                  className="w-full bg-[#92d7f6] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#7bc5e8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Processing..." : `Place Order - ${formatPrice(orderSummary.totalAmount)}`}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStripePayment}
                  disabled={isProcessingPayment || !stripe || !elements}
                  className="w-full bg-[#92d7f6] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#7bc5e8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessingPayment ? "Processing Payment..." : `Pay ${formatPrice(orderSummary.totalAmount)}`}
                </button>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
                <h2 className="text-xl font-semibold text-black mb-6">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <Image src={item.image || "/placeholder.jpg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{formatPrice(item.subtotal)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary Totals */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-black">{formatPrice(orderSummary.subtotalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-black">{formatPrice(orderSummary.shippingCharges)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (GST)</span>
                    <span className="text-black">{formatPrice(orderSummary.taxAmount)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2 mt-2">
                    <span className="text-black">Total</span>
                    <span className="text-black">{formatPrice(orderSummary.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

// Main Checkout Page Component with Stripe Elements
export default function CheckoutPage() {
  const stripeOptions: StripeElementsOptions = {
    appearance: {
      theme: "stripe",
    },
  }

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <CheckoutForm />
    </Elements>
  )
}
