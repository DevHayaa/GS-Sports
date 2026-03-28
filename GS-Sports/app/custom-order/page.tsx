"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, AlertCircle } from "lucide-react"
import { createCustomOrder } from "@/services/apiService"

export default function CustomOrderPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string>("")
  const [authError, setAuthError] = useState<string>("")

  const [formData, setFormData] = useState({
    clientName: "",
    clubOrTeamName: "",
    address: "",
    phone: "",
    email: "",
  })

  const [errors, setErrors] = useState<{
    clientName?: string
    clubOrTeamName?: string
    address?: string
    phone?: string
    email?: string
  }>({})

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")

      if (!token) {
        setIsLoading(false)
        return
      }

      setIsLoading(false)
    }
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      })
    }
    setError("")
    setAuthError("")
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    validateField(name, value)
  }

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors }

    switch (name) {
      case "clientName":
        if (!value || value.trim().length < 2) {
          newErrors.clientName = "Full name is required (minimum 2 characters)"
        } else {
          delete newErrors.clientName
        }
        break
      case "clubOrTeamName":
        if (!value || value.trim().length < 2) {
          newErrors.clubOrTeamName = "Club or team name is required (minimum 2 characters)"
        } else {
          delete newErrors.clubOrTeamName
        }
        break
      case "address":
        if (!value || value.trim().length < 5) {
          newErrors.address = "Please enter a complete address"
        } else {
          delete newErrors.address
        }
        break
      case "phone":
        if (!value || value.trim().length < 8) {
          newErrors.phone = "Phone number is required"
        } else {
          delete newErrors.phone
        }
        break
      case "email":
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address"
        } else {
          delete newErrors.email
        }
        break
    }

    setErrors(newErrors)
  }

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}

    if (!formData.clientName || formData.clientName.trim().length < 2) {
      newErrors.clientName = "Full name is required (minimum 2 characters)"
    }
    if (!formData.clubOrTeamName || formData.clubOrTeamName.trim().length < 2) {
      newErrors.clubOrTeamName = "Club or team name is required (minimum 2 characters)"
    }
    if (!formData.address || formData.address.trim().length < 5) {
      newErrors.address = "Please enter a complete address"
    }
    if (!formData.phone || formData.phone.trim().length < 8) {
      newErrors.phone = "Phone number is required"
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setAuthError("")

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (!token) {
        setAuthError("Please login first to submit a custom order")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
        return
      }
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await createCustomOrder({
        clientName: formData.clientName.trim(),
        clubOrTeamName: formData.clubOrTeamName.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
      })

      if (response.success) {
        setShowSuccess(true)
        setError("")
        setAuthError("")

        setTimeout(() => {
          setShowSuccess(false)
          setFormData({
            clientName: "",
            clubOrTeamName: "",
            address: "",
            phone: "",
            email: "",
          })
          setErrors({})
        }, 5000)
      }
    } catch (err: any) {
      if (err.status === 401) {
        setAuthError("Please login first to submit a custom order")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        setError(err.message || "Failed to submit custom order. Please try again.")
      }
      console.error("Custom order error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSuccess && (
          <div className="mb-6 p-6 bg-green-50 border-2 border-green-300 rounded-lg flex items-start gap-3 shadow-md">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-900 mb-2">✅ Custom Order Submitted Successfully!</h3>
              <p className="text-sm text-green-700 mb-2">
                Your custom order has been submitted successfully. Our team will review your request and contact you soon.
              </p>
              <p className="text-xs text-green-600 italic">
                You will receive a confirmation email shortly. The form will reset automatically in a few seconds.
              </p>
            </div>
          </div>
        )}

        {authError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Authentication Required</h3>
              <p className="text-sm text-red-700">{authError}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all ${
                  errors.clientName ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Jane Doe"
              />
              {errors.clientName && (
                <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>
              )}
            </div>

            <div>
              <label htmlFor="clubOrTeamName" className="block text-sm font-medium text-gray-700 mb-2">
                Club or team name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="clubOrTeamName"
                name="clubOrTeamName"
                value={formData.clubOrTeamName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all ${
                  errors.clubOrTeamName ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Northside Cricket Club"
              />
              {errors.clubOrTeamName && (
                <p className="mt-1 text-sm text-red-600">{errors.clubOrTeamName}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all resize-none ${
                  errors.address ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="123 Example Rd, City, Postcode"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all ${
                  errors.phone ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="+1…"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all ${
                  errors.email ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-[#92d7f6] text-white font-semibold rounded-lg hover:bg-[#7bc5e8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Custom Order"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
