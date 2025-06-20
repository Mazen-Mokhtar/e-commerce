import api from './api';

// Admin API functions
export const adminAPI = {
  // Dashboard Stats
  getDashboardStats: async () => {
    const token = localStorage.getItem('token');
    const response = await api.get('/order/admin/stats', {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  getRecentOrders: async () => {
    const token = localStorage.getItem('token');
    console.log('Admin API token:', token);
    const response = await api.get('/order/admin/all?page=1&sort=-createdAt', {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  // Products Management
  getProducts: async (params?: any) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const token = localStorage.getItem('token');
    const response = await api.get(`/product?${searchParams.toString()}`, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  createProduct: async (formData: FormData) => {
    const token = localStorage.getItem('token');
    const response = await api.post('/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: token } : {}),
      },
    });
    return response.data;
  },

  updateProduct: async (productId: string, formData: FormData) => {
    const token = localStorage.getItem('token');
    const response = await api.patch(`/product/update/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: token } : {}),
      },
    });
    return response.data;
  },

  deleteProduct: async (productId: string) => {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/product/${productId}`, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  // Categories Management
  getCategories: async (params?: any) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const token = localStorage.getItem('token');
    const response = await api.get(`/category/AllCategory?${searchParams.toString()}`, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  createCategory: async (formData: FormData) => {
    const token = localStorage.getItem('token');
    const response = await api.post('/category', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: token } : {}),
      },
    });
    return response.data;
  },

  updateCategory: async (categoryId: string, formData: FormData) => {
    const token = localStorage.getItem('token');
    const response = await api.patch(`/category/update/${categoryId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: token } : {}),
      },
    });
    return response.data;
  },

  deleteCategory: async (categoryId: string) => {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/category/${categoryId}`, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  // Orders Management
  getOrders: async (params?: any) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const token = localStorage.getItem('token');
    const response = await api.get(`/order/admin/all?${searchParams.toString()}`, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  getOrder: async (orderId: string) => {
    const token = localStorage.getItem('token');
    const response = await api.get(`/order/admin/${orderId}`, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  updateOrderStatus: async (orderId: string, data: { status: string; rejectedReason?: string }) => {
    const token = localStorage.getItem('token');
    const response = await api.patch(`/order/admin/${orderId}/status`, data, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  // Coupons Management
  getCoupons: async (params?: any) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const token = localStorage.getItem('token');
    const response = await api.get(`/coupon?${searchParams.toString()}`, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  createCoupon: async (data: any) => {
    const token = localStorage.getItem('token');
    const response = await api.post('/coupon', data, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  updateCoupon: async (couponId: string, data: any) => {
    const token = localStorage.getItem('token');
    const response = await api.patch(`/coupon/${couponId}`, data, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  deleteCoupon: async (couponId: string) => {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/coupon/${couponId}`, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  validateCoupon: async (data: { code: string; orderAmount: number }) => {
    const token = localStorage.getItem('token');
    const response = await api.post('/coupon/validate', data, {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },

  // Dashboard Widgets
  getRevenueTrend: async (period = 'monthly') => {
    const token = localStorage.getItem('token');
    const response = await api.get(`/dashboard/revenue-trend?period=${period}`,
      { headers: token ? { Authorization: token } : {} });
    return response.data;
  },

  getTopProducts: async (limit = 5) => {
    const token = localStorage.getItem('token');
    const response = await api.get(`/dashboard/top-products?limit=${limit}`,
      { headers: token ? { Authorization: token } : {} });
    return response.data;
  },

  getCustomerActivity: async () => {
    const token = localStorage.getItem('token');
    const response = await api.get('/dashboard/customer-activity',
      { headers: token ? { Authorization: token } : {} });
    return response.data;
  },
};