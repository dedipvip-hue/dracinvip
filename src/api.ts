import axios from 'axios';
import { ApiResponse, Drama } from './types';

// Use local proxy to avoid CORS and adblocker issues
const MAGMA_BASE_URL = '/api';

const fetchFromApi = async (endpoint: string): Promise<Drama[]> => {
  try {
    const targetUrl = `${MAGMA_BASE_URL}${endpoint}`;
    
    const response = await axios.get(targetUrl);
    
    const data = response.data;
    console.log(`Data from ${endpoint}:`, data); // Debugging as requested
    
    // Extract list from result or data
    const list = data.result || data.data || [];
    return Array.isArray(list) ? list : [];
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};

export const getTrending = async (): Promise<Drama[]> => {
  return await fetchFromApi('/dramabox/trending');
};

export const getLatest = async (): Promise<Drama[]> => {
  return await fetchFromApi('/dramabox/latest');
};

export const getForYou = async (): Promise<Drama[]> => {
  return await fetchFromApi('/dramabox/foryou');
};

export const getRandom = async (): Promise<Drama[]> => {
  return await fetchFromApi('/dramabox/random');
};

export const getVip = async (): Promise<Drama[]> => {
  return await fetchFromApi('/dramabox/vip');
};

export const searchDramas = async (query: string): Promise<Drama[]> => {
  return await fetchFromApi(`/dramabox/search?query=${encodeURIComponent(query)}`);
};

export const getPopularSearch = async (): Promise<Drama[]> => {
  return await fetchFromApi('/dramabox/populersearch');
};

// Mocking detail and episodes since the exact endpoint is unknown
export const getDetail = async (id: string): Promise<Drama | null> => {
  try {
    // Try to fetch from trending first as a fallback to find the drama
    const trending = await getTrending();
    const drama = trending.find(d => (d.bookId === id || d.id === id));
    if (drama) return drama;
    
    const latest = await getLatest();
    const dramaLatest = latest.find(d => (d.bookId === id || d.id === id));
    if (dramaLatest) return dramaLatest;
    
    return null;
  } catch (error) {
    console.error("Error fetching detail:", error);
    return null;
  }
};
