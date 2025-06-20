import api from './api';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  logo: {
    secure_url: string;
    public_id: string;
  };
  createdBy: string;
  folderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFilters {
  name?: string;
  page?: number;
  sort?: string;
}

export const categoriesAPI = {
  getCategories: async (filters?: CategoryFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    const response = await api.get(`/category/AllCategory?${params.toString()}`);
    return response.data;
  },

  getCategory: async (categoryId: string) => {
    const response = await api.get(`/category/${categoryId}`);
    return response.data;
  },

  createCategory: async (formData: FormData) => {
    const response = await api.post('/category', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateCategory: async (categoryId: string, formData: FormData) => {
    const response = await api.patch(`/category/update/${categoryId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};