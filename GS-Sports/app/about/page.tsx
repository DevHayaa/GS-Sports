import Link from "next/link"
import { Award, Users, Zap, Globe } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "We source only the finest materials and partner with leading manufacturers to ensure every product meets professional standards.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. Our expert team is dedicated to helping you find the perfect equipment for your needs.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously update our collection with the latest sports technology and equipment innovations.",
    },
    {
      icon: Globe,
      title: "Australian Pride",
      description: "Based in Sydney, we serve athletes across Australia with fast shipping and local expertise.",
    },
  ]

  const team = [
    { name: "Sarah Mitchell", role: "Founder & CEO", image: "sarah" },
    { name: "James Chen", role: "Head of Operations", image: "james" },
    { name: "Emma Rodriguez", role: "Product Manager", image: "emma" },
    { name: "Michael Thompson", role: "Customer Success", image: "michael" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-card to-card/50 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/about-banner.png')",
            backgroundSize: " cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative h-full flex items-center justify-start px-4 md:px-8">
          <div className="text-left max-w-2xl md:pl-12 lg:pl-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[#1b3d58] to-[#47728f]">
              About GS Sports & Apparels
            </h1>
            <p className="text-sm md:text-base text-black text-balance">
              Empowering Australian athletes with premium sports equipment since 2015
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[#1b3d58] to-[#47728f]">Our Story</h2>
            <p className="text-black text-sm leading-relaxed mb-4">
              GS Sports & Apparels was founded with a simple mission: to provide Australian athletes with access to
              world-class sports equipment at competitive prices. What started as a small cricket equipment shop in
              Sydney has grown into a trusted online destination for sports enthusiasts across the country.
            </p>
            <p className="text-black text-sm leading-relaxed mb-4">
              We believe that every athlete deserves access to premium-quality gear, regardless of their skill level.
              Our carefully curated collection features products from leading manufacturers, all tested and approved by
              our team of sports experts.
            </p>
            <p className="text-black text-sm leading-relaxed">
              Today, we serve thousands of customers annually, from weekend cricketers to professional athletes, and
              we're committed to maintaining the highest standards of quality and service.
            </p>
          </div>
          <div className="h-96 bg-card border border-border rounded-lg overflow-hidden">
              <img
                src="/images/ourstory.png"
                alt="Our Mission - Cricket Excellence"
                className="w-full h-full object-cover"
              />
            </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="h-96 bg-card border border-border rounded-lg overflow-hidden">
              <img
                src="/images/ourmission.png"
                alt="Our Mission - Cricket Excellence"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[#1b3d58] to-[#47728f]">Our Mission</h2>
              <p className="text-black text-sm mb-6">
                Our mission is to empower every cricket player with the finest equipment and gear, 
                regardless of their skill level or experience. We believe that quality equipment 
                should be accessible to all who share our passion for the game.
              </p>
              <p className="text-black text-sm mb-6">
                We are dedicated to sourcing and providing cricket gear that meets the highest 
                standards of performance, durability, and innovation. From amateur players 
                taking their first steps on the field to professional athletes competing at 
                the highest levels.
              </p>
              <p className="text-black text-sm">
                Through our commitment to excellence, customer service, and the sport we love, 
                we aim to be the trusted partner that helps every player reach their full 
                potential on the cricket field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[#1b3d58] to-[#47728f]">What Makes Us Different?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Customisation Card */}
            <div className="bg-white border border-gray-300 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className=" flex items-center justify-center mx-auto mb-6">
                <img 
                  src="/images/customisation.png" 
                  alt="Customisation Icon" 
                  className="w-auto h-auto"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4 bg-clip-text text-black">Customisation</h3>
              <p className="text-black text-sm">We Understand Every Player is unique in his/her own ways.</p>
            </div>

            {/* Endless Choice Card */}
            <div className="bg-white border border-gray-300 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center mx-auto mb-6">
                <img 
                  src="/images/choice.png" 
                  alt="Endless Choice Icon" 
                  className="w-auto h-auto"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4 text-black">Endless Choice</h3>
              <p className="text-black text-sm">Don't Need to settle for anything less than you desire</p>
            </div>

            {/* Handpicked Procurement Card */}
            <div className="bg-white border border-gray-300 rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center mx-auto mb-6">
                <img 
                  src="/images/handpicked.png" 
                  alt="Handpicked Procurement Icon" 
                  className="w-auto h-auto"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4 bg-clip-text text-black">Handpicked Procurement</h3>
              <p className="text-black text-sm">The Best of the Best Equipment at your Disposal</p>
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      {/* <section className="py-16 md:py-24 px-4 md:px-8 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10+", label: "Years in Business" },
              { number: "50K+", label: "Happy Customers" },
              { number: "1000+", label: "Products Available" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-2xl md:text-3xl font-bold text-accent mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* Follow Us Section */}
      <section className="relative py-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex items-center justify-center">
            {/* Left Blurred Image */}
            <div className="absolute left-0 top-0 w-1/3 h-full">
              <img
                src="/cricket-gear.jpg"
                alt="Cricket Equipment"
                className="w-full h-full object-cover filter blur-sm opacity-60"
              />
            </div>
            
            {/* Right Blurred Image */}
            <div className="absolute right-0 top-0 w-1/3 h-full">
              <img
                src="/cricket-protective-gear.jpg"
                alt="Cricket Equipment"
                className="w-full h-full object-cover filter blur-sm opacity-60"
              />
            </div>
            
            {/* Central Dark Panel */}
            <div className="relative z-10 bg-black px-12 py-16 rounded-lg shadow-2xl">
              <div className="text-center">
                {/* Blue Line */}
                <div className="w-16 h-1 bg-[#2b8ef9] mx-auto mb-6"></div>
                
                {/* Follow Us Text */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-[#1b3d58] to-[#47728f]">Follow Us</h2>
                
                {/* Social Media Icons */}
                <div className="flex items-center justify-center space-x-8">
                  <a href="#" className="text-white hover:text-[#2b8ef9] transition-colors">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-[#2b8ef9] transition-colors">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      {/* <section className="py-16 md:py-24 px-4 md:px-8 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg">What drives us every day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-background border border-border rounded-lg p-6 hover:border-accent transition-all duration-300 ease-out"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section> */}

     

     

    
       <Footer />
     </div>
   )
 }
