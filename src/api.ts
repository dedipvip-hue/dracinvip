import axios from 'axios';
import { ApiResponse, Drama } from './types';

// The API supports CORS natively, so we can fetch directly without a proxy
const api = axios.create({
  baseURL: 'https://magma-api.biz.id',
});

export const getTrending = async (): Promise<Drama[]> => {
  try {
    const response = await api.get<ApiResponse>('/dramabox/trending');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

export const getLatest = async (): Promise<Drama[]> => {
  try {
    const response = await api.get<ApiResponse>('/dramabox/latest');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

export const getForYou = async (): Promise<Drama[]> => {
  try {
    const response = await api.get<ApiResponse>('/dramabox/foryou');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

export const getRandom = async (): Promise<Drama[]> => {
  try {
    const response = await api.get<ApiResponse>('/dramabox/random');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

export const getVip = async (): Promise<Drama[]> => {
  try {
    const response = await api.get<ApiResponse>('/dramabox/vip');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

export const searchDramas = async (query: string): Promise<Drama[]> => {
  try {
    const response = await api.get<ApiResponse>(`/dramabox/search?query=${query}`);
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

export const getPopularSearch = async (): Promise<Drama[]> => {
  try {
    const response = await api.get<ApiResponse>('/dramabox/populersearch');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

// Mocking detail and episodes since the exact endpoint is unknown
export const getDetail = async (id: string): Promise<Drama | null> => {
  try {
    // Try to fetch from trending first as a fallback to find the drama
    const trending = await getTrending();
    const drama = trending.find(d => d.bookId === id);
    if (drama) return drama;
    
    const latest = await getLatest();
    const dramaLatest = latest.find(d => d.bookId === id);
    if (dramaLatest) return dramaLatest;
    
    return null;
  } catch (error) {
    console.error("Error fetching detail:", error);
    return null;
  }
};
