import axios from 'axios';
import api from './api';

// Auth API
export const authAPI = {
  login: (data: { email: string; password: string }) => 
    api.post('/auth/login', data),
  
  register: (data: { name: string; email: string; password: string; phone: string }) => 
    api.post('/auth/register', data),
  
  logout: () => 
    api.post('/auth/logout'),
  
  verifyEmail: (token: string) => 
    api.post(`/auth/verify-email/${token}`),
  
  forgotPassword: (email: string) => 
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, data: { password: string }) => 
    api.post(`/auth/reset-password/${token}`, data),
};

// Products API
export const productsAPI = {
  getProducts: (params?: any) => 
    api.get('/products', { params }),
  
  getProduct: (id: string) => 
    api.get(`/products/${id}`),
  
  createProduct: (data: FormData) => 
    api.post('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  updateProduct: (id: string, data: FormData) => 
    api.patch(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  deleteProduct: (id: string) => 
    api.delete(`/products/${id}`),
};

// Categories API
export const categoriesAPI = {
  getCategories: () => 
    api.get('/categories'),
  
  getCategory: (id: string) => 
    api.get(`/categories/${id}`),
  
  createCategory: (data: { name: string; image: File }) => 
    api.post('/categories', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  updateCategory: (id: string, data: { name?: string; image?: File }) => 
    api.patch(`/categories/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  deleteCategory: (id: string) => 
    api.delete(`/categories/${id}`),
};

// Cart API
export const cartAPI = {
  getCart: () => 
    api.get('/cart'),
  
  addToCart: (data: { productId: string; quantity: number }) => 
    api.post('/cart', data),
  
  updateCartItem: (itemId: string, data: { quantity: number }) => 
    api.patch(`/cart/${itemId}`, data),
  
  removeFromCart: (itemId: string) => 
    api.delete(`/cart/${itemId}`),
  
  clearCart: () => 
    api.delete('/cart'),
};

// Orders API
export const ordersAPI = {
  getOrders: (params?: any) => 
    api.get('/orders', { params }),
  
  getOrder: (id: string) => 
    api.get(`/orders/${id}`),
  
  createOrder: (data: {
    address: string;
    phone: string;
    paymentMethod: 'cash' | 'card';
    note?: string;
    discountPercent?: number;
  }) => api.post('/orders', data),
  
  updateOrderStatus: (id: string, status: string) => 
    api.patch(`/orders/${id}/status`, { status }),
  
  cancelOrder: (id: string) => 
    api.post(`/orders/${id}/cancel`),
  
  checkout: (data: { orderId: string; paymentMethod: 'cash' | 'card' }) => 
    api.post('/orders/checkout', data),
};

// Export all APIs in a single object for easier imports
export const allAPIs = {
  auth: authAPI,
  products: productsAPI,
  categories: categoriesAPI,
  cart: cartAPI,
  orders: ordersAPI,
};

// For backward compatibility
export default allAPIs;
