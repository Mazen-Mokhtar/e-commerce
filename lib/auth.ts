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

export interface SignupData {
  name: string;
  email: string;
  password: string;
  cPassword: string;
  phone: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ConfirmEmailData {
  email: string;
  code: string;
}

export const authAPI = {
  signup: async (data: SignupData) => {
    const response = await api.post('/auth/singup', data);
    return response.data;
  },

  confirmEmail: async (data: ConfirmEmailData) => {
    const response = await api.post('/auth/confirm-email', data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    console.log('Login API response:', response.data);
    
    // The backend returns { data: { accessToken, refreshToken } }
    if (response.data && response.data.data) {
      return {
        ...response.data.data,
        email: data.email // Add email to the response for fallback
      };
    }
    throw new Error('Invalid response format from login API');
  },

  getProfile: async () => {
    const response = await api.get('/user/profile');
    console.log('Profile API response:', response.data);
    // The profile endpoint returns the user data directly
    if (response.data) {
      return response.data;
    }
  },
};

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing stored user:', error);
    return null;
  }
};

export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const setAuthData = (token: string, user: User) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('lastWelcomeTime');
};