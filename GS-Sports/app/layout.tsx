import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import CartDrawer from "@/components/cart-drawer"
import "./globals.css"

const _montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GearStrike - Premium Cricket Equipment",
  description: "Premium cricket gear and equipment for professional athletes",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={_montserrat.className}>
        <CartProvider>
          <WishlistProvider>
            {children}
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
