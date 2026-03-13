import axios from 'axios';
import { ApiResponse, Drama } from './types';

// Use a public CORS proxy for external deployments (like Cloudflare Workers)
// In local development, it will still use the Express proxy if available, 
// but this ensures it works when deployed statically.
const MAGMA_BASE_URL = 'https://magma-api.biz.id';
const CORS_PROXY = 'https://corsproxy.io/?';

const fetchFromApi = async (endpoint: string) => {
  try {
    // Try the local proxy first (works in AI Studio)
    const response = await axios.get(`/api/proxy${endpoint}`, { timeout: 3000 });
    return response;
  } catch (error) {
    // Fallback to public CORS proxy (works on Cloudflare Workers/Pages)
    const targetUrl = `${MAGMA_BASE_URL}${endpoint}`;
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(targetUrl)}`;
    return await axios.get(proxyUrl);
  }
};

export const getTrending = async (): Promise<Drama[]> => {
  try {
    const response = await fetchFromApi('/dramabox/trending');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

export const getLatest = async (): Promise<Drama[]> => {
  try {
    const response = await fetchFromApi('/dramabox/latest');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

export const getForYou = async (): Promise<Drama[]> => {
  try {
    const response = await fetchFromApi('/dramabox/foryou');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

export const getRandom = async (): Promise<Drama[]> => {
  try {
    const response = await fetchFromApi('/dramabox/random');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

export const getVip = async (): Promise<Drama[]> => {
  try {
    const response = await fetchFromApi('/dramabox/vip');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

export const searchDramas = async (query: string): Promise<Drama[]> => {
  try {
    const response = await fetchFromApi(`/dramabox/search?query=${query}`);
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch {
    return [];
  }
};

export const getPopularSearch = async (): Promise<Drama[]> => {
  try {
    const response = await fetchFromApi('/dramabox/populersearch');
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
