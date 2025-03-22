import { Order } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8063/api';

export class OrderService {
  static async getAll(page = 1, limit = 10, status?: string): Promise<{ orders: Order[]; pages: number }> {
    const response = await fetch(
      `${API_URL}/orders?page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`
    );
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  }

  static async getById(id: string): Promise<Order> {
    const response = await fetch(`${API_URL}/orders/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  }

  static async create(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  }

  static async updateStatus(id: string, status: Order['status']): Promise<Order> {
    const response = await fetch(`${API_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  }

  static async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete order');
  }

  static async getStats(): Promise<{
    totalOrders: number;
    monthlyOrders: number;
    totalRevenue: number;
    monthlyRevenue: number;
  }> {
    const response = await fetch(`${API_URL}/orders/stats`);
    if (!response.ok) throw new Error('Failed to fetch order stats');
    return response.json();
  }
} 