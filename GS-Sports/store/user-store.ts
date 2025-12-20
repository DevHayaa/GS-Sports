import { create } from "zustand"
import { getUserProfile, updateUserProfile, getUserDashboard } from "@/services/apiService"

interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface UserProfile {
  _id: string
  userId: string
  fullName: string
  email: string
  phone?: string
  address: Address
  profileCompleted: boolean
  createdAt: string
  updatedAt: string
}

interface Order {
  _id: string
  items?: Array<{
    productId: string | { name: string; images?: string[] }
    productName?: string
    quantity: number
    price: number
  }>
  cartItems?: Array<{
    productId: string | { name: string; images?: string[] }
    productName?: string
    quantity: number
    price: number
    subtotal: number
  }>
  orderSummary?: {
    totalAmount: number
    subtotalAmount?: number
    shippingCharges?: number
    taxAmount?: number
    discountAmount?: number
  }
  totalAmount?: number
  orderStatus: string
  paymentStatus: string
  createdAt: string
}

interface DashboardData {
  profileCompleted: boolean
  totalOrders: number
  pendingOrders: number
  completedOrders: number
  latestOrders: Order[]
}

interface UserState {
  profile: UserProfile | null
  profileCompleted: boolean
  dashboardData: DashboardData | null
  loading: boolean
  error: string | null
  fetchUserProfile: () => Promise<void>
  updateUserProfile: (data: { fullName?: string; phone?: string; address?: Address }) => Promise<boolean>
  fetchDashboard: () => Promise<void>
  clearProfile: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  profileCompleted: false,
  dashboardData: null,
  loading: false,
  error: null,

  fetchUserProfile: async () => {
    set({ loading: true, error: null })
    try {
      const response = await getUserProfile()
      if (response.success) {
        const profile = response.data?.profile || null
        const profileCompleted = response.data?.profileCompleted || false
        set({
          profile,
          profileCompleted,
          loading: false,
          error: null,
        })
      } else {
        set({
          profile: null,
          profileCompleted: false,
          loading: false,
          error: null,
        })
      }
    } catch (err: any) {
      console.error("Error fetching profile:", err)
      set({
        profile: null,
        profileCompleted: false,
        loading: false,
        error: err?.message || "Failed to load profile",
      })
    }
  },

  updateUserProfile: async (data: { fullName?: string; phone?: string; address?: Address }) => {
    set({ loading: true, error: null })
    try {
      const response = await updateUserProfile(data)
      if (response.success) {
        // Refetch profile to get updated data
        await get().fetchUserProfile()
        set({ loading: false, error: null })
        return true
      } else {
        set({ loading: false, error: "Failed to update profile" })
        return false
      }
    } catch (err: any) {
      console.error("Error updating profile:", err)
      set({
        loading: false,
        error: err?.message || "Failed to update profile",
      })
      return false
    }
  },

  fetchDashboard: async () => {
    set({ loading: true, error: null })
    try {
      const response = await getUserDashboard()
      if (response.success && response.data) {
        set({
          dashboardData: {
            profileCompleted: response.data.profileCompleted || false,
            totalOrders: response.data.totalOrders || 0,
            pendingOrders: response.data.pendingOrders || 0,
            completedOrders: response.data.completedOrders || 0,
            latestOrders: response.data.latestOrders || [],
          },
          loading: false,
          error: null,
        })
      } else {
        set({
          dashboardData: null,
          loading: false,
          error: null,
        })
      }
    } catch (err: any) {
      console.error("Error fetching dashboard:", err)
      set({
        dashboardData: null,
        loading: false,
        error: err?.message || "Failed to load dashboard",
      })
    }
  },

  clearProfile: () => {
    set({
      profile: null,
      profileCompleted: false,
      dashboardData: null,
      error: null,
    })
  },
}))
