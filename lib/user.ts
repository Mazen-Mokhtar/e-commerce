import api from './api';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'delivery';
  isConfirm: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserRoleData {
  role: 'user' | 'admin' | 'delivery';
}

export interface GetUsersQueryParams {
  page?: string;
  limit?: string;
  search?: string;
  role?: 'user' | 'admin' | 'delivery';
}

export const userAPI = {
  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  // Update current user profile
  updateProfile: async (data: UpdateProfileData) => {
    const response = await api.put('/user/profile', data);
    return response.data;
  },

  // Change password
  changePassword: async (data: ChangePasswordData) => {
    const response = await api.put('/user/change-password', data);
    return response.data;
  },

  // Admin only endpoints
  getAllUsers: async (params?: GetUsersQueryParams) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    const response = await api.get(`/user/all?${searchParams.toString()}`);
    return response.data;
  },

  getUserById: async (userId: string) => {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  },

  updateUserRole: async (userId: string, data: UpdateUserRoleData) => {
    const response = await api.put(`/user/${userId}/role`, data);
    return response.data;
  },

  deleteUser: async (userId: string) => {
    const response = await api.delete(`/user/${userId}`);
    return response.data;
  },
};