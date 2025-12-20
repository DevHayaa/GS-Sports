"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { submitContactForm } from "@/services/apiService"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string>("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    // Clear general error
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const response = await submitContactForm(formData)
      
      if (response.success) {
        setSubmitted(true)
        setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" })
        setTimeout(() => {
          setSubmitted(false)
        }, 5000)
      } else {
        setError(response.message || "Failed to send message. Please try again.")
      }
    } catch (err: any) {
      if (err.status === 400 && err.message) {
        setError(err.message)
      } else {
        setError(err.message || "Failed to send message. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "info@gssports.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+61 2 1234 5678",
      description: "Monday to Friday, 9am-5pm AEDT",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "Sydney, NSW 2000",
      description: "Australia",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Fri: 9am - 5pm",
      description: "Sat - Sun: 10am - 3pm",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-r from-card to-card/50 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/contact-banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-left max-w-2xl sm:max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 text-white drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/95 text-balance drop-shadow-md">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-all duration-300 ease-out"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#1b3d58]" />
                </div>
                <h3 className="text-lg font-semibold mb-1 bg-clip-text text-transparent bg-gradient-to-b from-[#1b3d58] to-[#47728f]">{info.title}</h3>
                <p className="text-[#1b3d58] font-semibold mb-1">{info.details}</p>
                <p className="text-muted-foreground text-sm">{info.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[#1b3d58] to-[#47728f]">Send us a Message</h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-[#1b3d58] to-[#47728f]">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 ease-out ${
                        fieldErrors.fullName
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-accent"
                      }`}
                      placeholder="Your Full Name"
                    />
                    {fieldErrors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 ease-out ${
                        fieldErrors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-accent"
                      }`}
                      placeholder="your@email.com"
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 ease-out ${
                        fieldErrors.phone
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-accent"
                      }`}
                      placeholder="0412345678"
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 ease-out ${
                        fieldErrors.subject
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-accent"
                      }`}
                      placeholder="How can we help?"
                    />
                    {fieldErrors.subject && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300 ease-out resize-none ${
                        fieldErrors.message
                          ? "border-red-500 focus:border-red-500"
                          : "border-border focus:border-accent"
                      }`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {fieldErrors.message && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-accent hover:bg-accent/90 disabled:bg-accent/50 disabled:cursor-not-allowed text-accent-foreground font-semibold rounded-lg transition-all duration-300 ease-out flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[#1b3d58] to-[#47728f]">Visit Us</h2>
              <div className="h-96 bg-card border border-border rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.5467890123456!2d151.2093!3d-33.8688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae3e3e3e3e3d%3A0x3e3e3e3e3e3e3e3e!2sSydney%20NSW%202000!5e0!3m2!1sen!2sau!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-6 p-6 bg-background border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">GS Sports & Apparels</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Located in the heart of Sydney, our showroom is open to customers who want to experience our products
                  firsthand. Visit us to get expert advice from our knowledgeable team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[#1b3d58] to-[#47728f]">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: "What is your return policy?",
              a: "We offer a 30-day return policy on all unused items in original packaging. Contact our support team for details.",
            },
            {
              q: "Do you offer international shipping?",
              a: "Currently, we ship within Australia. International shipping options are coming soon.",
            },
            {
              q: "How long does delivery take?",
              a: "Standard delivery takes 3-5 business days. Express delivery options are available for an additional fee.",
            },
            {
              q: "Can I track my order?",
              a: "Yes, you'll receive a tracking number via email once your order ships.",
            },
          ].map((faq, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-[#1b3d58] to-[#47728f]">{faq.q}</h3>
              <p className="text-muted-foreground text-sm">{faq.a}</p>
            </div>
          ))}
         </div>
       </section>
       <Footer />
     </div>
   )
 }
