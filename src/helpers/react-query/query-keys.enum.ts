import { IImage } from '@/types/models/image.types';

// ----------------------------------------------------------------------

export const queryKeys = {
  // Annotations
  annotations: () => 'annotations',
  annotationsCount: () => 'annotations-count',

  // Categories
  categories: () => 'categories',
  categoriesCount: () => 'categories-count',

  // Images
  image: (id: IImage['id']) => `image-${id}`,
  imageAnnotations: (imageId: IImage['id']) => `image-annotations-${imageId}`,
  imageAnnotationsCount: (imageId: IImage['id']) => `image-annotations-count-${imageId}`,
  images: () => 'images',
  imagesCount: () => 'images-count',
} as const;
