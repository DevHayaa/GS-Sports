// import Breadcrumb from "@/components/breadcrumb"
// import ProductCard from "@/components/product-card"
// import Header from "@/components/header"
// import Footer from "@/components/footer"

// const categoryData: Record<string, { name: string; products: any[] }> = {
//   bats: {
//     name: "Bats",
//     products: [
//       { id: "bat-1", name: "Professional Cricket Bat", description: "High-quality English willow bat", price: 8999 },
//       { id: "bat-2", name: "Tournament Bat", description: "Perfect for competitive play", price: 6499 },
//       { id: "bat-3", name: "Training Bat", description: "Ideal for practice sessions", price: 3999 },
//       { id: "bat-4", name: "Junior Cricket Bat", description: "Designed for young players", price: 2499 },
//       { id: "bat-5", name: "Power Hitter Bat", description: "Maximum hitting power", price: 9999 },
//       { id: "bat-6", name: "Classic Bat", description: "Traditional design and feel", price: 5999 },
//     ],
//   },
//   shoes: {
//     name: "Shoes",
//     products: [
//       { id: "shoe-1", name: "Cricket Spikes Pro", description: "Professional cricket shoes", price: 4999 },
//       { id: "shoe-2", name: "Training Shoes", description: "Comfortable training footwear", price: 2999 },
//       { id: "shoe-3", name: "All-Rounder Shoes", description: "Versatile cricket shoes", price: 3499 },
//       { id: "shoe-4", name: "Fast Bowler Shoes", description: "Designed for pace bowlers", price: 5499 },
//       { id: "shoe-5", name: "Batsman Shoes", description: "Optimized for batting", price: 4499 },
//       { id: "shoe-6", name: "Casual Cricket Shoes", description: "Everyday cricket footwear", price: 2499 },
//     ],
//   },
//   "kit-bags": {
//     name: "Kit Bags",
//     products: [
//       { id: "bag-1", name: "Professional Kit Bag", description: "Large capacity equipment bag", price: 3999 },
//       { id: "bag-2", name: "Travel Kit Bag", description: "Compact and portable", price: 2499 },
//       { id: "bag-3", name: "Roller Kit Bag", description: "Easy to transport with wheels", price: 5999 },
//       { id: "bag-4", name: "Backpack Style Bag", description: "Comfortable backpack design", price: 1999 },
//       { id: "bag-5", name: "Premium Kit Bag", description: "Luxury equipment storage", price: 7999 },
//       { id: "bag-6", name: "Mini Kit Bag", description: "Perfect for accessories", price: 999 },
//     ],
//   },
//   gloves: {
//     name: "Gloves",
//     products: [
//       { id: "glove-1", name: "Batting Gloves Pro", description: "Professional batting gloves", price: 1999 },
//       { id: "glove-2", name: "Wicket Keeper Gloves", description: "Specialized keeper gloves", price: 2999 },
//       { id: "glove-3", name: "Training Gloves", description: "Durable training gloves", price: 1499 },
//       { id: "glove-4", name: "Fielding Gloves", description: "Lightweight fielding gloves", price: 999 },
//       { id: "glove-5", name: "Premium Batting Gloves", description: "Top-tier batting protection", price: 3499 },
//       { id: "glove-6", name: "Youth Gloves", description: "Sized for young players", price: 1299 },
//     ],
//   },
//   pads: {
//     name: "Pads",
//     products: [
//       { id: "pad-1", name: "Batting Pads", description: "Professional batting protection", price: 2999 },
//       { id: "pad-2", name: "Lightweight Pads", description: "Comfortable and light", price: 1999 },
//       { id: "pad-3", name: "Tournament Pads", description: "Competition-grade pads", price: 3999 },
//       { id: "pad-4", name: "Training Pads", description: "Practice session pads", price: 1499 },
//       { id: "pad-5", name: "Premium Pads", description: "Maximum protection and comfort", price: 4999 },
//       { id: "pad-6", name: "Youth Pads", description: "Sized for junior players", price: 1299 },
//     ],
//   },
//   "thigh-pads": {
//     name: "Thigh Pads",
//     products: [
//       { id: "thigh-1", name: "Thigh Guard Pro", description: "Professional thigh protection", price: 1499 },
//       { id: "thigh-2", name: "Lightweight Thigh Guard", description: "Minimal weight protection", price: 999 },
//       { id: "thigh-3", name: "Premium Thigh Guard", description: "Maximum comfort and protection", price: 1999 },
//       { id: "thigh-4", name: "Training Thigh Guard", description: "Practice protection", price: 799 },
//       { id: "thigh-5", name: "Tournament Thigh Guard", description: "Competition-grade protection", price: 1699 },
//       { id: "thigh-6", name: "Youth Thigh Guard", description: "Sized for young players", price: 699 },
//     ],
//   },
//   inners: {
//     name: "Inners",
//     products: [
//       { id: "inner-1", name: "Compression Inner", description: "Compression wear for support", price: 1299 },
//       { id: "inner-2", name: "Moisture-Wicking Inner", description: "Breathable inner wear", price: 999 },
//       { id: "inner-3", name: "Premium Inner Wear", description: "High-quality compression", price: 1699 },
//       { id: "inner-4", name: "Training Inner", description: "Comfortable training wear", price: 799 },
//       { id: "inner-5", name: "Tournament Inner", description: "Professional-grade inner", price: 1499 },
//       { id: "inner-6", name: "Youth Inner", description: "Sized for junior players", price: 699 },
//     ],
//   },
//   supporter: {
//     name: "Supporter",
//     products: [
//       { id: "supp-1", name: "Athletic Supporter", description: "Professional athletic support", price: 899 },
//       { id: "supp-2", name: "Comfort Supporter", description: "Maximum comfort design", price: 699 },
//       { id: "supp-3", name: "Premium Supporter", description: "High-quality support wear", price: 1199 },
//       { id: "supp-4", name: "Training Supporter", description: "Practice support wear", price: 599 },
//       { id: "supp-5", name: "Tournament Supporter", description: "Competition-grade support", price: 999 },
//       { id: "supp-6", name: "Youth Supporter", description: "Sized for young players", price: 499 },
//     ],
//   },
//   "abdominal-guard": {
//     name: "Abdominal Guard",
//     products: [
//       { id: "abd-1", name: "Professional Abdominal Guard", description: "Full protection guard", price: 1999 },
//       { id: "abd-2", name: "Lightweight Guard", description: "Minimal weight protection", price: 1499 },
//       { id: "abd-3", name: "Premium Guard", description: "Maximum protection", price: 2499 },
//       { id: "abd-4", name: "Training Guard", description: "Practice protection", price: 1199 },
//       { id: "abd-5", name: "Tournament Guard", description: "Competition-grade guard", price: 2199 },
//       { id: "abd-6", name: "Youth Guard", description: "Sized for junior players", price: 999 },
//     ],
//   },
//   "white-trouser": {
//     name: "White Trouser",
//     products: [
//       { id: "trou-1", name: "Professional White Trouser", description: "Official cricket trousers", price: 1499 },
//       { id: "trou-2", name: "Comfort Trouser", description: "Comfortable fit trousers", price: 999 },
//       { id: "trou-3", name: "Premium Trouser", description: "High-quality white trousers", price: 1999 },
//       { id: "trou-4", name: "Training Trouser", description: "Practice trousers", price: 799 },
//       { id: "trou-5", name: "Tournament Trouser", description: "Competition-grade trousers", price: 1699 },
//       { id: "trou-6", name: "Youth Trouser", description: "Sized for young players", price: 699 },
//     ],
//   },
//   "customize-uniform": {
//     name: "Customize Uniform",
//     products: [
//       { id: "uni-1", name: "Custom Team Uniform", description: "Personalized team uniforms", price: 2999 },
//       { id: "uni-2", name: "Custom Jersey", description: "Customized cricket jersey", price: 1999 },
//       { id: "uni-3", name: "Custom Trouser", description: "Personalized trousers", price: 1499 },
//       { id: "uni-4", name: "Full Custom Kit", description: "Complete custom uniform set", price: 4999 },
//       { id: "uni-5", name: "Premium Custom Uniform", description: "Premium customization", price: 3999 },
//       { id: "uni-6", name: "Youth Custom Uniform", description: "Custom uniforms for juniors", price: 1999 },
//     ],
//   },
//   grips: {
//     name: "Grips",
//     products: [
//       { id: "grip-1", name: "Bat Grip Pro", description: "Professional bat grip", price: 499 },
//       { id: "grip-2", name: "Comfort Grip", description: "Comfortable bat grip", price: 399 },
//       { id: "grip-3", name: "Premium Grip", description: "High-quality bat grip", price: 699 },
//       { id: "grip-4", name: "Training Grip", description: "Practice bat grip", price: 299 },
//       { id: "grip-5", name: "Tournament Grip", description: "Competition-grade grip", price: 599 },
//       { id: "grip-6", name: "Multi-Pack Grips", description: "Pack of 3 grips", price: 1199 },
//     ],
//   },
// }

// export default function CategoryPage({ params }: { params: { slug: string } }) {
//   const category = categoryData[params.slug]

//   if (!category) {
//     return (
//       <div>
//         <Header />
//         <div className="min-h-screen flex items-center justify-center">
//           <p className="text-xl text-gray-600">Category not found</p>
//         </div>
//         <Footer />
//       </div>
//     )
//   }

//   const breadcrumbItems = [
//     { label: "Home", href: "/" },
//     { label: category.name, href: `/category/${params.slug}` },
//   ]

//   return (
//     <div>
//       <Header />
//       <main className="min-h-screen bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Breadcrumb */}
//           <Breadcrumb items={breadcrumbItems} />

//           {/* Category Heading */}
//           <h1 className="text-4xl font-bold text-black mt-6 mb-8">{category.name}</h1>

//           {/* Products Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {category.products.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 id={product.id}
//                 name={product.name}
//                 description={product.description}
//                 price={product.price}
//                 image="/cricket-gear.jpg"
//               />
//             ))}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Star } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const categories = [
  { name: "Bats", slug: "bats", count: 24 },
  { name: "Shoes", slug: "shoes", count: 18 },
  { name: "Kit Bags", slug: "kit-bags", count: 12 },
  { name: "Gloves", slug: "gloves", count: 15 },
  { name: "Pads", slug: "pads", count: 20 },
  { name: "Thigh Pads", slug: "thigh-pads", count: 8 },
  { name: "Inners", slug: "inners", count: 10 },
  { name: "Supporter", slug: "supporter", count: 6 },
  { name: "Abdominal Guard", slug: "abdominal-guard", count: 5 },
  { name: "White Trouser", slug: "white-trouser", count: 14 },
  { name: "Customize Uniform", slug: "customize-uniform", count: 9 },
  { name: "Grips", slug: "grips", count: 11 },
]

const products = [
  { id: 1, name: "Professional Bat", price: 299.99, rating: 4.8, category: "bats" },
  { id: 2, name: "Cricket Shoes", price: 149.99, rating: 4.6, category: "shoes" },
  { id: 3, name: "Batting Gloves", price: 89.99, rating: 4.7, category: "gloves" },
  { id: 4, name: "Protective Pads", price: 199.99, rating: 4.9, category: "pads" },
  { id: 5, name: "Kit Bag Pro", price: 129.99, rating: 4.5, category: "kit-bags" },
  { id: 6, name: "Thigh Guard", price: 79.99, rating: 4.4, category: "thigh-pads" },
  { id: 7, name: "Inner Wear", price: 49.99, rating: 4.3, category: "inners" },
  { id: 8, name: "Athletic Supporter", price: 39.99, rating: 4.2, category: "supporter" },
]

export default function CategoriesPage({ params }: { params: { slug: string } }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(params.slug || null)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("featured")

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "rating") return b.rating - a.rating
    return 0
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Header */}
      <div className="px-4 md:px-8 py-8 border-b border-border">
        <h1 className="text-4xl font-bold text-foreground mb-2">All Products</h1>
        <p className="text-muted-foreground">Browse our complete collection of sports equipment</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-8 py-8 max-w-7xl mx-auto">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-40">
            {/* Categories Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-4 flex items-center justify-between">
                Categories
                <ChevronDown className="w-4 h-4" />
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-3 py-2 rounded transition-all duration-300 ease-out ${
                    selectedCategory === null
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`block w-full text-left px-3 py-2 rounded transition-all duration-300 ease-out text-sm ${
                      selectedCategory === cat.slug
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.name}
                    <span className="text-xs ml-2">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8 pb-8 border-b border-border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center justify-between">
                Price Range
                <ChevronDown className="w-4 h-4" />
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Min: ${priceRange[0]}</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Max: ${priceRange[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center justify-between">
                Rating
                <ChevronDown className="w-4 h-4" />
              </h3>
              <div className="space-y-2">
                {[5, 4, 3].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">Showing {sortedProducts.length} products</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-card border border-border rounded text-foreground focus:outline-none focus:border-accent transition-all duration-300 ease-out"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-all duration-300 ease-out hover:shadow-lg"
              >
                <div className="relative h-64 bg-muted overflow-hidden">
                  <img
                    src="/placeholder.jpg"
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ease-out"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Sale
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-all duration-300 ease-out mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-accent">${product.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground font-semibold rounded transition-all duration-300 ease-out">
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
