import { IImage } from '@/types/models/image.type';
import { IAnnotation } from '@/types/models/annotation.type';

// ----------------------------------------------------------------------

export const queryKeys = {
  // Annotations
  annotation: (id: IAnnotation['id']) => `annotation-${id}`,
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
