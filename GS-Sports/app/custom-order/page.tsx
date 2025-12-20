"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, Upload, X, CheckCircle, AlertCircle } from "lucide-react"
import { createCustomOrder } from "@/services/apiService"

export default function CustomOrderPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string>("")
  const [authError, setAuthError] = useState<string>("")
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirements: "",
    budget: "",
  })
  
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    requirements?: string;
    images?: string;
    budget?: string;
  }>({})

  // Check authentication
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      
      if (!token) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }
      
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined
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
      case "name":
        if (!value || value.trim().length < 2) {
          newErrors.name = "Full name is required (minimum 2 characters)"
        } else {
          delete newErrors.name
        }
        break
      case "email":
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address"
        } else {
          delete newErrors.email
        }
        break
      case "phone":
        if (!value || value.trim().length < 10) {
          newErrors.phone = "Phone number is required (minimum 10 digits)"
        } else {
          delete newErrors.phone
        }
        break
      case "requirements":
        if (!value || value.trim().length < 10) {
          newErrors.requirements = "Order requirements must be at least 10 characters"
        } else {
          delete newErrors.requirements
        }
        break
      case "budget":
        if (!value || value.trim() === "") {
          newErrors.budget = "Budget is required"
        } else {
          const budgetNum = parseFloat(value)
          if (isNaN(budgetNum) || budgetNum <= 0) {
            newErrors.budget = "Please enter a valid budget amount (greater than 0)"
          } else {
            delete newErrors.budget
          }
        }
        break
    }
    
    setErrors(newErrors)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      // Clear images error if user removes all images
      if (selectedImages.length === 0) {
        setErrors(prev => ({ ...prev, images: undefined }))
      }
      return
    }

    const newFiles: File[] = []
    const newPreviews: string[] = []
    let hasError = false

    Array.from(files).forEach((file) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload image files only")
        setErrors(prev => ({ ...prev, images: "Please upload image files only" }))
        hasError = true
        return
      }
      
      // Validate file size (max 10MB per file)
      if (file.size > 10 * 1024 * 1024) {
        setError(`Image "${file.name}" is too large. Maximum size is 10MB per file.`)
        setErrors(prev => ({ ...prev, images: `Image "${file.name}" is too large. Maximum size is 10MB per file.` }))
        hasError = true
        return
      }
      
      newFiles.push(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result as string)
        if (newPreviews.length === newFiles.length) {
          setImagePreviews((prev) => [...prev, ...newPreviews])
          // Clear images error if images are added
          setErrors(prev => ({ ...prev, images: undefined }))
        }
      }
      reader.readAsDataURL(file)
    })

    if (newFiles.length > 0 && !hasError) {
      setSelectedImages((prev) => [...prev, ...newFiles])
      setError("")
      setErrors(prev => ({ ...prev, images: undefined }))
    }
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    // Validate images after removal
    if (selectedImages.length === 1) {
      setErrors(prev => ({ ...prev, images: "At least one reference image is required" }))
    } else {
      setErrors(prev => ({ ...prev, images: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}
    
    // Validate name
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Full name is required (minimum 2 characters)"
    }
    
    // Validate email
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    // Validate phone
    if (!formData.phone || formData.phone.trim().length < 10) {
      newErrors.phone = "Phone number is required (minimum 10 digits)"
    }
    
    // Validate requirements
    if (!formData.requirements || formData.requirements.trim().length < 10) {
      newErrors.requirements = "Order requirements must be at least 10 characters"
    }
    
    // Validate images (required)
    if (!selectedImages || selectedImages.length === 0) {
      newErrors.images = "At least one reference image is required"
    }
    
    // Validate budget (required)
    if (!formData.budget || formData.budget.trim() === "") {
      newErrors.budget = "Budget is required"
    } else {
      const budgetNum = parseFloat(formData.budget)
      if (isNaN(budgetNum) || budgetNum <= 0) {
        newErrors.budget = "Please enter a valid budget amount (greater than 0)"
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setAuthError("")
    
    // Check authentication first
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
      // Prepare API data
      const apiData: {
        name: string;
        email: string;
        phone: string;
        requirements: string;
        images?: File[];
        budget?: number;
      } = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        requirements: formData.requirements.trim(),
      }
      
      // Add images if present
      if (selectedImages.length > 0) {
        apiData.images = selectedImages
      }
      
      // Add budget (required)
      const budgetNum = parseFloat(formData.budget)
      if (!isNaN(budgetNum) && budgetNum > 0) {
        apiData.budget = budgetNum
      }
      
      const response = await createCustomOrder(apiData)
      
      if (response.success) {
        setShowSuccess(true)
        setError("")
        setAuthError("")
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setShowSuccess(false)
          setFormData({
            name: "",
            email: "",
            phone: "",
            requirements: "",
            budget: "",
          })
          setSelectedImages([])
          setImagePreviews([])
          setErrors({})
        }, 5000)
      }
    } catch (err: any) {
      // Handle specific error codes
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


        {/* Success Message */}
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

        {/* Authentication Error Message */}
        {authError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Authentication Required</h3>
              <p className="text-sm text-red-700">{authError}</p>
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

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all ${
                  errors.name ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
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
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
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
                placeholder="+1234567890"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Order Requirements / Description */}
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                Order Requirements / Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all resize-none ${
                  errors.requirements ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Describe your custom order requirements in detail. Include specifications, colors, sizes, design preferences, etc."
              />
              {errors.requirements && (
                <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Minimum 10 characters required</p>
            </div>

            {/* Reference Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reference Images <span className="text-red-500">*</span>
              </label>
              {imagePreviews.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#92d7f6] transition-colors">
                  <input
                    type="file"
                    id="imageUpload"
                    name="imageUpload"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 mb-1">
                      <span className="text-[#92d7f6] font-semibold">Click to upload</span> or drag and drop
                    </span>
                    <span className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 10MB per file)</span>
                    <span className="text-xs text-gray-500 mt-1">Multiple images allowed</span>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          aria-label="Remove image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="imageUploadMore"
                      name="imageUploadMore"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="imageUploadMore"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[#92d7f6] border border-[#92d7f6] rounded-lg hover:bg-[#92d7f6] hover:text-white transition-colors cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      Add More Images
                    </label>
                  </div>
                </div>
              )}
              {errors.images && (
                <p className="mt-2 text-sm text-red-600">{errors.images}</p>
              )}
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                Budget <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                min="0.01"
                step="0.01"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#92d7f6] focus:border-transparent outline-none transition-all ${
                  errors.budget ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter your budget (e.g., 5000)"
              />
              {errors.budget && (
                <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
              )}
            </div>

            {/* Submit Button */}
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
