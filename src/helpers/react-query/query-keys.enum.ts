import { IImage } from '@/types/models/image.types';
import { IAnnotation } from '@/types/models/annotation.types';

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

export const invalidateOnCategoryCreate = () => [queryKeys.categories(), queryKeys.categoriesCount()];

export const invalidateOnAnnotationCreate = (imageId?: IImage['id']) => [
  ...(imageId ? [queryKeys.imageAnnotations(imageId), queryKeys.imageAnnotationsCount(imageId)] : []),
  queryKeys.annotations(),
  queryKeys.annotationsCount(),
];

export const invalidateOnAnnotationDelete = (imageId?: IImage['id'], annotationId?: IAnnotation['id']) => [
  ...invalidateOnAnnotationCreate(imageId),
  ...(annotationId ? [queryKeys.annotation(annotationId)] : []),
];

export const invalidateOnImageCreate = () => [queryKeys.images(), queryKeys.imagesCount()];

export const invalidateOnImageDelete = (imageId: IImage['id']) => [
  ...invalidateOnImageCreate(),
  ...(imageId
    ? [queryKeys.image(imageId), queryKeys.imageAnnotations(imageId), queryKeys.imageAnnotationsCount(imageId)]
    : []),
  queryKeys.annotations(),
  queryKeys.annotationsCount(),
];
