declare module '@/lib/all-apis' {
  import { AxiosPromise } from 'axios';

  // Define interfaces for API responses
  interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
  }

  // Auth API
  interface AuthAPI {
    login: (data: { email: string; password: string }) => AxiosPromise<ApiResponse<{ token: string; user: any }>>;
    register: (data: { name: string; email: string; password: string; phone: string }) => AxiosPromise<ApiResponse<{ user: any }>>;
    logout: () => AxiosPromise<ApiResponse<null>>;
    verifyEmail: (token: string) => AxiosPromise<ApiResponse<null>>;
    forgotPassword: (email: string) => AxiosPromise<ApiResponse<null>>;
    resetPassword: (token: string, data: { password: string }) => AxiosPromise<ApiResponse<null>>;
  }

  // Products API
  interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: {
      secure_url: string;
    };
    stock: number;
    createdAt: string;
    updatedAt: string;
  }

  interface ProductsAPI {
    getProducts: (params?: any) => AxiosPromise<ApiResponse<{ documents: Product[]; total: number }>>;
    getProduct: (id: string) => AxiosPromise<ApiResponse<Product>>;
    createProduct: (data: FormData) => AxiosPromise<ApiResponse<Product>>;
    updateProduct: (id: string, data: FormData) => AxiosPromise<ApiResponse<Product>>;
    deleteProduct: (id: string) => AxiosPromise<ApiResponse<null>>;
  }

  // Categories API
  interface Category {
    _id: string;
    name: string;
    image: {
      secure_url: string;
    };
    createdAt: string;
    updatedAt: string;
  }

  interface CategoriesAPI {
    getCategories: () => AxiosPromise<ApiResponse<Category[]>>;
    getCategory: (id: string) => AxiosPromise<ApiResponse<Category>>;
    createCategory: (data: { name: string; image: File }) => AxiosPromise<ApiResponse<Category>>;
    updateCategory: (id: string, data: { name?: string; image?: File }) => AxiosPromise<ApiResponse<Category>>;
    deleteCategory: (id: string) => AxiosPromise<ApiResponse<null>>;
  }

  // Cart API
  interface CartItem {
    _id: string;
    product: Product;
    quantity: number;
  }

  interface CartAPI {
    getCart: () => AxiosPromise<ApiResponse<{ items: CartItem[]; total: number }>>;
    addToCart: (data: { productId: string; quantity: number }) => AxiosPromise<ApiResponse<{ item: CartItem }>>;
    updateCartItem: (itemId: string, data: { quantity: number }) => AxiosPromise<ApiResponse<{ item: CartItem }>>;
    removeFromCart: (itemId: string) => AxiosPromise<ApiResponse<null>>;
    clearCart: () => AxiosPromise<ApiResponse<null>>;
  }

  // Orders API
  interface OrderProduct {
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    image: {
      secure_url: string;
    };
  }

  interface Order {
    _id: string;
    createdBy: string;
    products: OrderProduct[];
    sub_Total: number;
    finalPrice: number;
    status: 'pending' | 'placed' | 'shipped' | 'delivered' | 'canceled';
    paymentMethod: 'cash' | 'card';
    address: string;
    phone: string;
    note?: string;
    createdAt: string;
    updatedAt: string;
  }

  interface OrdersAPI {
    getOrders: (params?: any) => AxiosPromise<ApiResponse<{ documents: Order[]; total: number }>>;
    getOrder: (id: string) => AxiosPromise<ApiResponse<Order>>;
    createOrder: (data: {
      address: string;
      phone: string;
      paymentMethod: 'cash' | 'card';
      note?: string;
      discountPercent?: number;
    }) => AxiosPromise<ApiResponse<{ order: Order; paymentUrl?: string }>>;
    updateOrderStatus: (id: string, status: string) => AxiosPromise<ApiResponse<Order>>;
    cancelOrder: (id: string) => AxiosPromise<ApiResponse<Order>>;
    checkout: (data: { orderId: string; paymentMethod: 'cash' | 'card' }) => AxiosPromise<ApiResponse<{ paymentUrl?: string }>>;
  }

  // All APIs
  interface AllAPIs {
    auth: AuthAPI;
    products: ProductsAPI;
    categories: CategoriesAPI;
    cart: CartAPI;
    orders: OrdersAPI;
  }

  const allAPIs: AllAPIs;
  export default allAPIs;
  export const auth: AuthAPI;
  export const products: ProductsAPI;
  export const categories: CategoriesAPI;
  export const cart: CartAPI;
  export const orders: OrdersAPI;
}
