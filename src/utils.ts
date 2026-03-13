import { Drama } from './types';

export const getDramaId = (drama: Drama | null | undefined): string => {
  if (!drama) return '';
  return drama.bookId || drama.id || '';
};

export const getDramaTitle = (drama: Drama | null | undefined): string => {
  if (!drama) return 'Unknown Title';
  return drama.bookName || drama.title || drama.tagName || 'Unknown Title';
};

export const getDramaCover = (drama: Drama | null | undefined): string => {
  if (!drama) return 'https://picsum.photos/seed/drama/400/600';
  return drama.coverWap || drama.cover || drama.verticalImage || 'https://picsum.photos/seed/drama/400/600';
};

export const getDramaVip = (drama: Drama | null | undefined): boolean => {
  if (!drama) return false;
  return drama.corner?.name?.toLowerCase().includes('vip') || false;
};
