import { SiteSettings } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8063/api';

export class SettingsService {
  static async get(): Promise<SiteSettings> {
    const response = await fetch(`${API_URL}/settings`);
    if (!response.ok) throw new Error('Failed to fetch settings');
    return response.json();
  }

  static async update(data: Partial<SiteSettings>): Promise<SiteSettings> {
    const response = await fetch(`${API_URL}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update settings');
    return response.json();
  }

  static async getSiteSettings(): Promise<SiteSettings> {
    const response = await fetch(`${API_URL}/settings/site`);
    if (!response.ok) throw new Error('Failed to fetch site settings');
    return response.json();
  }

  static async updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
    const response = await fetch(`${API_URL}/settings/site`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update site settings');
    return response.json();
  }
} 