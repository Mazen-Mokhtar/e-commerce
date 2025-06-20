import api from './api';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  _id: string;
  products: {
    productId: {
      _id: string;
      name: string;
      finalPrice: number;
      image: {
        secure_url: string;
        public_id: string;
      };
      stock: number;
    };
    quantity: number;
  }[];
  createdBy: string;
}

export const cartAPI = {
  addToCart: async (data: CartItem) => {
    const response = await api.post('/cart', data);
    return response.data;
  },

  removeFromCart: async (productsIds: string[]) => {
    const response = await api.patch('/cart', { productsIds });
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete('/cart');
    return response.data;
  },

  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },
};