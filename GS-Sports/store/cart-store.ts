import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  discountPrice?: number
  quantity: number
  subtotal: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'subtotal'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setIsOpen: (open: boolean) => void
  getTotalQuantity: () => number
  getTotalAmount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.productId === item.productId)

        if (existingItem) {
          // Update quantity if item exists
          const newQuantity = existingItem.quantity + item.quantity
          set({
            items: items.map((i) =>
              i.productId === item.productId
                ? {
                    ...i,
                    quantity: newQuantity,
                    subtotal: (item.discountPrice ?? item.price) * newQuantity,
                  }
                : i
            ),
          })
        } else {
          // Add new item
          const subtotal = (item.discountPrice ?? item.price) * item.quantity
          set({
            items: [...items, { ...item, subtotal }],
          })
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        const items = get().items
        set({
          items: items.map((item) => {
            if (item.productId === productId) {
              const subtotal = (item.discountPrice ?? item.price) * quantity
              return { ...item, quantity, subtotal }
            }
            return item
          }),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      setIsOpen: (open) => {
        set({ isOpen: open })
      },

      getTotalQuantity: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      getTotalAmount: () => {
        return get().items.reduce((sum, item) => sum + item.subtotal, 0)
      },
    }),
    {
      name: 'guest-cart-storage',
      version: 1,
    }
  )
)
