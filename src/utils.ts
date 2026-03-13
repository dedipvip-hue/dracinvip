import { Drama } from './types';

export const getDramaId = (drama: Drama): string => {
  return drama.bookId || drama.id || '';
};

export const getDramaTitle = (drama: Drama): string => {
  return drama.bookName || drama.title || drama.tagName || 'Unknown Title';
};

export const getDramaCover = (drama: Drama): string => {
  return drama.coverWap || drama.cover || drama.verticalImage || 'https://picsum.photos/seed/drama/400/600';
};

export const getDramaVip = (drama: Drama): boolean => {
  return drama.corner?.name?.toLowerCase().includes('vip') || false;
};
