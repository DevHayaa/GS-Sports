import { BASE_URL } from "@/lib/constant";



export const getApi = async (url: string, token: any = null, useBearer: boolean = false) => {

    if (token) {
        try {
            const authHeader = useBearer ? `Bearer ${token}` : `Token ${token}`;
            return (fetch(`${BASE_URL}${url}`, {
                headers: {
                    authorization: authHeader,
                }
            }))
        } catch (error: any) {
            console.error('Error retrieving data:', error);
            throw new Error(error.message);
        }
    } else {
        try {
            return (fetch(`${BASE_URL}${url}`, {
            }))
        } catch (error: any) {
            console.error('Error retrieving data:', error);
            throw new Error(error.message);
        }
    }


};

export const postApi = async (url: string, options: any, token: any = null, useBearer: boolean = false) => {
    if(token){
        try {
            const authHeader = useBearer ? `Bearer ${token}` : `Token ${token}`;
            return await fetch(`${BASE_URL}${url}`, {
                method: 'POST', // Specify the method type
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                    'Authorization': authHeader,
                },
                body: JSON.stringify(options) // Convert options to a JSON string
            });
        } catch (error: any) {
            console.error('Error retrieving data:', error);
            throw new Error(error.message);
        }
    }else{
        try {
            return await fetch(`${BASE_URL}${url}`, {
                method: 'POST', // Specify the method type
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify(options) // Convert options to a JSON string
            });
        } catch (error: any) {
            console.error('Error retrieving data:', error);
            throw new Error(error.message);
        }
    }
    
};


export const postApiOTPVerifyuser = async (url: string, data: any) => {
    try {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        return await response.json(); // Return the parsed response
    } catch (error: any) {
        console.error('Error during API call:', error);
        throw new Error(error.message || 'Unknown error occurred');
    }
};


export const postApiOTP = async (url: string, data: any, token?: string) => {
    try {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}` // Include the token in the request
        };

        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Attempt to parse the error response
            throw new Error(errorData.detail || 'Something went wrong');
        }

        return await response.json(); // Return the parsed response
    } catch (error: any) {
        console.error('Error during API call:', error);
        throw new Error(error.message || 'Unknown error occurred');
    }
};

// export const patchApi = async (url: string, options: any, token: any) => {
//     if(!token){
//         window.location.href = '/';
//     }
//     try {
//         return await fetch(`${BASE_URL}${url}`, {
//             method: 'PATCH', // Specify the method type
//             headers: token? {
//                 'Content-Type': 'application/json', // Set the content type to JSON
//                 'Authorization': `Token ${token}`
//             }:{
//                 'Content-Type': 'application/json', // Set the content type to JSON
//             },
//             body: JSON.stringify(options) // Convert options to a JSON string
//         });
//     } catch (error: any) {
//         console.error('Error retrieving data:', error);
//         throw new Error(error.message);
//     }
// };


export async function patchApi(endpoint: string, data: any, token: string, isFormData = false, useBearer: boolean = false) {
    const authHeader = useBearer ? `Bearer ${token}` : `Token ${token}`;
    const headers: HeadersInit = isFormData
      ? { Authorization: authHeader } // Let browser set Content-Type for FormData
      : { 
          "Content-Type": "application/json",
          Authorization: authHeader,
        };
  
    const options: RequestInit = {
      method: "PATCH",
      headers,
      body: isFormData ? data : JSON.stringify(data),
    };
  
    return fetch(`${BASE_URL}${endpoint}`, options);
  }
  



export const putApi = async (url: string, options: any, token: any, useBearer: boolean = false) => {
    if(!token){
        window.location.href = '/';
    }
    try {
        const authHeader = useBearer ? `Bearer ${token}` : `Token ${token}`;
        return await fetch(`${BASE_URL}${url}`, {
            method: 'PUT', // Specify the method type
            headers: token? {
                'Content-Type': 'application/json', // Set the content type to JSON
                'Authorization': authHeader
            }:{
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(options) // Convert options to a JSON string
        });
    } catch (error: any) {
        console.error('Error retrieving data:', error);
        throw new Error(error.message);
    }
};

export const deleteApi = async (url: string, token: any = null, useBearer: boolean = false) => {
    if(!token){
        window.location.href = '/';
    }
    try {
        const authHeader = useBearer ? `Bearer ${token}` : `Token ${token}`;
        return await fetch(`${BASE_URL}${url}`, {
            method: 'DELETE', // Specify the method type
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
                'Authorization': authHeader
            },
        });
    } catch (error: any) {
        console.error('Error retrieving data:', error);
        throw new Error(error.message);
    }

};


export const postWithFile = (url: string, options: any, token: any) => {
    if(!token){
        window.location.href = '/';
    }
    return fetch(
        `${BASE_URL}${url}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
          },
          body: options,
        }
      )
}

export const resumeUpload = async (url: string, formData: FormData) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
    //   headers: {
    //     'Authorization': `Token ${token}`,
    //   },
      body: formData,
    })
  
    if (!response.ok) {
      throw new Error('Failed to upload file(s)')
    }
  
    const responseData = await response.json()
    return responseData
  }

export const patchWithFile = (url: string, options: any, token: any) => {
    if(!token){
        window.location.href = '/';
    }
    return fetch(
        `${BASE_URL}${url}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Token ${token}`,
          },
          body: options,
        }
      )
}

// File upload with Bearer token support
export const postWithFileBearer = (url: string, formData: FormData, token: any, useBearer: boolean = false) => {
    if(!token){
        window.location.href = '/';
    }
    const authHeader = useBearer ? `Bearer ${token}` : `Token ${token}`;
    return fetch(
        `${BASE_URL}${url}`,
        {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            // Don't set Content-Type, let browser set it with boundary for FormData
          },
          body: formData,
        }
      )
}

// ==================== Helper Functions ====================

/**
 * Get token from localStorage
 */
const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

/**
 * Handle API response and parse JSON
 */
const handleResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  let data: any;
  try {
    data = isJson ? await response.json() : await response.text();
  } catch (error) {
    throw {
      message: "Failed to parse response",
      status: response.status,
      data: null,
    };
  }

  if (!response.ok || (data && typeof data === "object" && data.success === false)) {
    // Handle different response formats
    let errorMessage = "";
    
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        errorMessage = parsed?.message || parsed?.error || parsed?.detail || data;
      } catch {
        errorMessage = data;
      }
    } else if (typeof data === "object") {
      // Handle both {success: false, message: "..."} and standard error formats
      errorMessage = data?.message || data?.error || data?.detail || `Request failed with status ${response.status}`;
    } else {
      errorMessage = `Request failed with status ${response.status}`;
    }

    throw {
      message: errorMessage,
      status: response.status || (data?.success === false ? 400 : 500),
      data: data,
    };
  }

  return data;
};

// ==================== Authentication APIs ====================

/**
 * User Signup
 * POST /api/auth/signup
 */
export const signup = async (data: { name: string; email: string; password: string }) => {
  // Basic validation
  if (!data.name || data.name.trim().length < 2) {
    throw { message: "Name must be at least 2 characters", status: 400 };
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw { message: "Please enter a valid email address", status: 400 };
  }
  if (!data.password || data.password.length < 6) {
    throw { message: "Password must be at least 6 characters", status: 400 };
  }

  const response = await postApi("/auth/signup", data);
  const result = await handleResponse(response);

  // Store token if provided
  if (result?.data?.accessToken && typeof window !== "undefined") {
    localStorage.setItem("token", result.data.accessToken);
    if (result.data?.user) {
      localStorage.setItem("user", JSON.stringify(result.data.user));
    }
  }

  return result;
};

/**
 * User Login
 * POST /api/auth/login
 */
export const login = async (data: { email: string; password: string }) => {
  // Basic validation
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw { message: "Please enter a valid email address", status: 400 };
  }
  if (!data.password || data.password.length < 1) {
    throw { message: "Password is required", status: 400 };
  }

  const response = await postApi("/auth/login", data);
  const result = await handleResponse(response);

  // Store token if provided
  if (result?.data?.accessToken && typeof window !== "undefined") {
    localStorage.setItem("token", result.data.accessToken);
    if (result.data?.user) {
      localStorage.setItem("user", JSON.stringify(result.data.user));
    }
  }

  return result;
};

/**
 * Refresh Access Token
 * POST /api/auth/refresh
 */
export const refreshToken = async (data?: { refreshToken?: string }) => {
  const response = await postApi("/auth/refresh", data || {});
  const result = await handleResponse(response);

  // Update stored token
  if (result?.data?.accessToken && typeof window !== "undefined") {
    localStorage.setItem("token", result.data.accessToken);
  }

  return result;
};

/**
 * Logout
 * POST /api/auth/logout
 */
export const logout = async () => {
  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  const response = await postApi("/auth/logout", undefined, token, true);
  const result = await handleResponse(response);

  // Clear token from localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return result;
};

// ==================== Products APIs ====================

/**
 * Get All Products
 * GET /api/products
 */
export const getProducts = async (query?: {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}) => {
  let queryString = "";
  if (query) {
    const params = new URLSearchParams();
    
    if (query.page) params.append("page", query.page.toString());
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.category) params.append("category", query.category);
    if (query.minPrice !== undefined) params.append("minPrice", query.minPrice.toString());
    if (query.maxPrice !== undefined) params.append("maxPrice", query.maxPrice.toString());
    if (query.search) params.append("search", query.search);
    
    queryString = params.toString() ? `?${params.toString()}` : "";
  }

  const response = await getApi(`/products${queryString}`);
  return await handleResponse(response);
};

/**
 * Get Product by Slug
 * GET /api/products/:slug
 */
export const getProductBySlug = async (slug: string) => {
  if (!slug || slug.trim().length === 0) {
    throw { message: "Product slug is required", status: 400 };
  }

  const response = await getApi(`/products/${slug}`);
  return await handleResponse(response);
};

// ==================== Categories APIs ====================

/**
 * Get All Categories
 * GET /api/categories
 */
export const getCategories = async () => {
  const response = await getApi("/categories");
  return await handleResponse(response);
};

/**
 * Get Category by Slug
 * GET /api/categories/:slug
 */
export const getCategoryBySlug = async (slug: string) => {
  if (!slug || slug.trim().length === 0) {
    throw { message: "Category slug is required", status: 400 };
  }

  const response = await getApi(`/categories/${slug}`);
  return await handleResponse(response);
};

// ==================== Custom Orders APIs ====================

/**
 * Convert File to base64 data URL
 */
const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Create Custom Order
 * POST /api/custom-orders
 * Sends as JSON with base64 encoded images (backend expects JSON format based on API docs)
 */
export const createCustomOrder = async (data: {
  name: string;
  email: string;
  phone: string;
  requirements: string;
  images?: File[];
  budget?: number;
}) => {
  // Basic validation
  if (!data.name || data.name.trim().length < 2) {
    throw { message: "Name must be at least 2 characters", status: 400 };
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw { message: "Please enter a valid email address", status: 400 };
  }
  if (!data.phone || data.phone.trim().length < 10) {
    throw { message: "Phone number must be at least 10 digits", status: 400 };
  }
  if (!data.requirements || data.requirements.trim().length < 10) {
    throw { message: "Requirements must be at least 10 characters", status: 400 };
  }

  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  // Prepare request body as JSON (backend expects JSON format)
  const requestBody: {
    name: string;
    email: string;
    phone: string;
    requirements: string;
    images?: string[];
    budget?: number;
  } = {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    requirements: data.requirements.trim(),
  };

  // Convert images to base64 if present
  if (data.images && data.images.length > 0) {
    const imagePromises = data.images.map(file => fileToDataURL(file));
    requestBody.images = await Promise.all(imagePromises);
  }

  // Add budget if provided
  if (data.budget !== undefined && data.budget > 0) {
    requestBody.budget = data.budget;
  }

  // Send as JSON using postApi
  const response = await postApi("/custom-orders", requestBody, token, true);
  return await handleResponse(response);
};

// ==================== Cart APIs ====================

/**
 * Add to Cart
 * POST /api/cart/add
 */
export const addToCart = async (data: { productId: string; quantity: number }) => {
  if (!data.productId) {
    throw { message: "Product ID is required", status: 400 };
  }
  if (!data.quantity || data.quantity < 1) {
    throw { message: "Quantity must be at least 1", status: 400 };
  }

  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  const response = await postApi("/cart/add", data, token, true);
  return await handleResponse(response);
};

/**
 * Get Cart
 * GET /api/cart
 */
export const getCart = async () => {
  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  const response = await getApi("/cart", token, true);
  return await handleResponse(response);
};

/**
 * Update Cart Item Quantity
 * PATCH /api/cart/update
 */
export const updateCartItem = async (data: { productId: string; quantity: number }) => {
  if (!data.productId) {
    throw { message: "Product ID is required", status: 400 };
  }
  if (data.quantity < 0) {
    throw { message: "Quantity cannot be negative", status: 400 };
  }

  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  const response = await patchApi("/cart/update", data, token, false, true);
  return await handleResponse(response);
};

/**
 * Remove from Cart
 * DELETE /api/cart/remove/:productId
 */
export const removeFromCart = async (productId: string) => {
  if (!productId) {
    throw { message: "Product ID is required", status: 400 };
  }

  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  const response = await deleteApi(`/cart/remove/${productId}`, token, true);
  return await handleResponse(response);
};

// ==================== Cart Sync API ====================

/**
 * Sync Guest Cart with Backend
 * Uses existing /api/cart/add endpoint for each item
 */
export const syncCart = async (items: Array<{ productId: string; quantity: number }>) => {
  if (!items || items.length === 0) {
    return { success: true, message: "Cart is empty" };
  }

  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  // Add each item to cart using existing /api/cart/add endpoint
  const results = [];
  for (const item of items) {
    try {
      const response = await addToCart({ productId: item.productId, quantity: item.quantity });
      results.push(response);
    } catch (err: any) {
      console.warn(`Failed to sync item ${item.productId}:`, err);
      // Continue with other items even if one fails
    }
  }

  return { success: true, message: "Cart synced", data: results };
};

// ==================== Payment APIs ====================

/**
 * Create Stripe Payment Intent
 * POST /api/payment/stripe/create-intent
 */
export const createStripePaymentIntent = async (data: { amount: number; currency?: string }) => {
  if (!data.amount || data.amount <= 0) {
    throw { message: "Amount must be greater than 0", status: 400 };
  }

  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  const payload = {
    amount: Math.round(data.amount * 100), // Convert to cents
    currency: data.currency || "aud",
  };

  const response = await postApi("/payment/stripe/create-intent", payload, token, true);
  return await handleResponse(response);
};

// ==================== Orders APIs ====================

/**
 * Place Order
 * POST /api/orders
 */
export const placeOrder = async (data: {
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingSameAsShipping: boolean;
  billingAddress?: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  cartItems: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  orderSummary: {
    subtotalAmount: number;
    shippingCharges: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
  };
  paymentMethod: "COD" | "CARD";
  paymentIntentId?: string;
  orderNotes?: string;
  couponCode?: string;
}) => {
  // Validate customer info
  if (!data.customer) {
    throw { message: "Customer information is required", status: 400 };
  }
  if (!data.customer.fullName || data.customer.fullName.trim().length < 2) {
    throw { message: "Full name is required", status: 400 };
  }
  if (!data.customer.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customer.email)) {
    throw { message: "Valid email is required", status: 400 };
  }
  if (!data.customer.phone || data.customer.phone.trim().length < 10) {
    throw { message: "Valid phone number is required", status: 400 };
  }

  // Validate shipping address
  if (!data.shippingAddress.addressLine1 || data.shippingAddress.addressLine1.trim().length < 5) {
    throw { message: "Address line 1 is required", status: 400 };
  }
  if (!data.shippingAddress.city || data.shippingAddress.city.trim().length < 2) {
    throw { message: "City is required", status: 400 };
  }
  if (!data.shippingAddress.state || data.shippingAddress.state.trim().length < 2) {
    throw { message: "State is required", status: 400 };
  }
  if (!data.shippingAddress.postalCode || data.shippingAddress.postalCode.trim().length < 3) {
    throw { message: "Postal code is required", status: 400 };
  }
  if (!data.shippingAddress.country || data.shippingAddress.country.trim().length < 2) {
    throw { message: "Country is required", status: 400 };
  }

  // Validate billing address if different
  if (!data.billingSameAsShipping && data.billingAddress) {
    if (!data.billingAddress.addressLine1 || data.billingAddress.addressLine1.trim().length < 5) {
      throw { message: "Billing address line 1 is required", status: 400 };
    }
    if (!data.billingAddress.city || data.billingAddress.city.trim().length < 2) {
      throw { message: "Billing city is required", status: 400 };
    }
    if (!data.billingAddress.state || data.billingAddress.state.trim().length < 2) {
      throw { message: "Billing state is required", status: 400 };
    }
    if (!data.billingAddress.postalCode || data.billingAddress.postalCode.trim().length < 3) {
      throw { message: "Billing postal code is required", status: 400 };
    }
    if (!data.billingAddress.country || data.billingAddress.country.trim().length < 2) {
      throw { message: "Billing country is required", status: 400 };
    }
  }

  // Validate cart items
  if (!data.cartItems || data.cartItems.length === 0) {
    throw { message: "Cart items are required", status: 400 };
  }

  // Validate order summary
  if (!data.orderSummary || !data.orderSummary.totalAmount || data.orderSummary.totalAmount <= 0) {
    throw { message: "Valid order summary is required", status: 400 };
  }

  // Validate payment method
  if (!data.paymentMethod || !["COD", "CARD"].includes(data.paymentMethod)) {
    throw { message: "Payment method must be COD or CARD", status: 400 };
  }
  if (data.paymentMethod === "CARD" && !data.paymentIntentId) {
    throw { message: "Payment intent ID is required for CARD payments", status: 400 };
  }

  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  const response = await postApi("/orders", data, token, true);
  return await handleResponse(response);
};

/**
 * Get User Orders
 * GET /api/orders
 */
export const getUserOrders = async () => {
  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  const response = await getApi("/orders", token, true);
  return await handleResponse(response);
};

/**
 * Get Order by ID
 * GET /api/orders/:id
 */
export const getOrderById = async (orderId: string) => {
  if (!orderId) {
    throw { message: "Order ID is required", status: 400 };
  }

  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  const response = await getApi(`/orders/${orderId}`, token, true);
  return await handleResponse(response);
};

// ==================== User Profile APIs ====================

/**
 * Get User Profile
 * GET /api/user/profile
 */
export const getUserProfile = async () => {
  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  const response = await getApi("/user/profile", token, true);
  return await handleResponse(response);
};

/**
 * Create User Profile
 * POST /api/user/profile
 * NOTE: This endpoint is deprecated. Profiles are automatically created when users place their first order.
 * This function is kept for backward compatibility but should not be used in the frontend.
 * If called, the backend will return an error directing users to place an order instead.
 */
export const createUserProfile = async (data: {
  fullName: string;
  phone?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}) => {
  // This should not be used - profiles are auto-created on first order
  throw { message: "Profiles are automatically created when you place your first order. Please place an order to create your profile.", status: 400 };
};

/**
 * Update User Profile
 * PUT /api/user/profile
 */
export const updateUserProfile = async (data: {
  fullName?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}) => {
  // Validation - all fields are optional, but if address is provided, all address fields must be present
  if (data.address) {
    if (!data.address.street || data.address.street.trim().length < 5) {
      throw { message: "Street address is required", status: 400 };
    }
    if (!data.address.city || data.address.city.trim().length < 2) {
      throw { message: "City is required", status: 400 };
    }
    if (!data.address.state || data.address.state.trim().length < 2) {
      throw { message: "State is required", status: 400 };
    }
    if (!data.address.postalCode || data.address.postalCode.trim().length < 3) {
      throw { message: "Postal code is required", status: 400 };
    }
    if (!data.address.country || data.address.country.trim().length < 2) {
      throw { message: "Country is required", status: 400 };
    }
  }

  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  const response = await putApi("/user/profile", data, token, true);
  return await handleResponse(response);
};

/**
 * Get User Dashboard
 * GET /api/user/dashboard
 */
export const getUserDashboard = async () => {
  const token = getToken();
  if (!token) {
    throw { message: "Authentication required", status: 401 };
  }

  const response = await getApi("/user/dashboard", token, true);
  return await handleResponse(response);
};

/**
 * Submit Contact Form
 * POST /api/contact
 */
export const submitContactForm = async (data: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  // Validation
  if (!data.fullName || data.fullName.trim().length < 2) {
    throw { message: "Full name is required (minimum 2 characters)", status: 400 };
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw { message: "Valid email is required", status: 400 };
  }
  if (!data.phone || data.phone.trim().length < 10) {
    throw { message: "Phone number is required (minimum 10 characters)", status: 400 };
  }
  if (!data.subject || data.subject.trim().length < 3) {
    throw { message: "Subject is required (minimum 3 characters)", status: 400 };
  }
  if (!data.message || data.message.trim().length < 10) {
    throw { message: "Message is required (minimum 10 characters)", status: 400 };
  }

  const response = await postApi("/contact", data, null, true);
  return await handleResponse(response);
};