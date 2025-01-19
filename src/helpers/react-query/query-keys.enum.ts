import { IImage } from '@/types/models/image.types';
import { ICategory } from '@/types/models/category.types';

// ----------------------------------------------------------------------

/**
 * React Query Keys Map
 *
 * Centralized key generators for React Query operations:
 * - Ensures consistent cache keys across the application
 * - Provides type-safe key generation with proper parameters
 * - Groups related queries (e.g., all category-related keys)
 */

export const queryKeys = {
  // Annotations
  annotations: () => 'annotations',
  annotationsCount: () => 'annotations-count',

  // Categories
  categories: () => 'categories',
  categoriesCount: () => 'categories-count',
  category: (id: ICategory['id']) => `category-${id}`,

  // Images
  image: (id: IImage['id']) => `image-${id}`,
  imageAnnotations: (imageId: IImage['id']) => `image-annotations-${imageId}`,
  imageAnnotationsCount: (imageId: IImage['id']) => `image-annotations-count-${imageId}`,
  images: () => 'images',
  imagesCount: () => 'images-count',
} as const;
