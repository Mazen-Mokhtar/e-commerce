import api from './api';

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  stock: number;
  orginalPrice: number;
  discountPrecent: number;
  finalPrice: number;
  colors: string[];
  size: ('s' | 'm' | 'l')[];
  image: {
    secure_url: string;
    public_id: string;
  };
  gallery: {
    secure_url: string;
    public_id: string;
  }[];
  categoryId: string | {
    _id: string;
    name: string;
  };
  createdBy: string;
  folderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  stock?: number;
  categoryId?: string;
  select?: string;
  sort?: string;
  page?: number;
}

export const productsAPI = {
  getProducts: async (filters?: ProductFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    const response = await api.get(`/product?${params.toString()}`);
    return response.data;
  },

  getProduct: async (productId: string) => {
    const response = await api.get(`/product/${productId}`);
    return response.data;
  },

  createProduct: async (formData: FormData) => {
    const response = await api.post('/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateProduct: async (productId: string, formData: FormData) => {
    const response = await api.patch(`/product/update/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getRecentOrders: async () => {
    const token = localStorage.getItem('token');
    const response = await api.get('/order/admin/all?page=1&sort=-createdAt', {
      headers: token ? { Authorization: token } : {},
    });
    return response.data;
  },
};