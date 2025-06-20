import api from './api';

export interface OrderProduct {
  _id?: string;
  name: string;
  quantity: number;
  unitPrice: number;
  finalPrice: number;
  productId: string;
}

export interface Order {
  _id: string;
  address: string;
  orderId: string;
  phone: string;
  note?: string;
  refundAmount?: number;
  refundDate?: Date;
  intent?: string;
  createdBy: string;
  updatedBy?: string;
  paidAt?: Date;
  rejectedReason?: string;
  products: OrderProduct[];
  status: 'pending' | 'placed' | 'on_way' | 'delivered' | 'canceled';
  paymentMethod: 'card' | 'cash';
  sub_Total: number;
  discountAmount?: number;
  finalPrice: number;
}

export interface CreateOrderData {
  address: string;
  phone: string;
  note: string;
  paymentMethod: 'card' | 'cash';
  couponCode?: string;
}

export const ordersAPI = {
  createOrder: async (data: CreateOrderData) => {
    const response = await api.post('/order', data);
    return response.data;
  },

  checkout: async (orderId: string) => {
    const response = await api.post(`/order/${orderId}`);
    return response.data;
  },

  cancelOrder: async (orderId: string) => {
    const response = await api.patch(`/order/${orderId}/cancel`);
    return response.data;
  },
};