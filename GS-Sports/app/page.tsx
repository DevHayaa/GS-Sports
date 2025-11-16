import Header from "@/components/header"
import HeroBanner from "@/components/hero-banner"
import BrandLogosSlider from "@/components/brand-logos-slider"
import GearCategoriesSection from "@/components/gear-categories-section"
import CricketPromoSection from "@/components/cricket-promo-section"
import CustomClothingPromoSection from "@/components/custom-clothing-promo-section"
import FeaturedProducts from "@/components/featured-products"
import HotSellers from "@/components/hot-sellers"
import VideoSection from "@/components/video-section"
import ExploreCategories from "@/components/explore-categories"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <BrandLogosSlider />
       <ExploreCategories />
      <GearCategoriesSection />
      <CricketPromoSection />
      <CustomClothingPromoSection />
      {/* <FeaturedProducts /> */}
      <HotSellers />
      {/* <VideoSection /> */}
      <Footer />
    </main>
  )
}
