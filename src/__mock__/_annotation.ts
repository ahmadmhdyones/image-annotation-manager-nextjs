import { IAnnotation } from '@/types/models/annotation.types';
import { AnnotationShapes } from '@/types/annotation-shapes.enum';

import { API_MOCK_INITIAL_DATA_COUNT_ANNOTATIONS } from '@/configs/global.config';

import { _images } from './_image';

// ----------------------------------------------------------------------

// Add color palette for annotations
const _annotationColors = [
  '#FF0000', // red
  '#00FF00', // green
  '#0000FF', // blue
  '#FFA500', // orange
  '#800080', // purple
  '#FFFF00', // yellow
  '#00FFFF', // cyan
  '#FF00FF', // magenta
  '#008000', // dark green
  '#000080', // navy
  '#FFC0CB', // pink
  '#8B4513', // saddle brown
];

// Helper function to generate random coordinates within typical image dimensions
const generateCoordinates = (type: AnnotationShapes.RECTANGLE | AnnotationShapes.LINE) => {
  if (type === AnnotationShapes.RECTANGLE) {
    return {
      height: Math.floor(Math.random() * 200) + 50, // height between 50-250
      width: Math.floor(Math.random() * 200) + 50, // width between 50-250
      x: Math.floor(Math.random() * 600), // assuming max width 800
      y: Math.floor(Math.random() * 400), // assuming max height 600
    };
  }

  // Generate points for line: [x1, y1, x2, y2]
  return {
    points: [
      Math.floor(Math.random() * 600), // x1
      Math.floor(Math.random() * 400), // y1
      Math.floor(Math.random() * 600), // x2
      Math.floor(Math.random() * 400), // y2
    ],
  };
};

// Generate 1000+ annotations
export const _annotations: IAnnotation[] = [...Array(API_MOCK_INITIAL_DATA_COUNT_ANNOTATIONS)].map((_, index) => {
  const type = index % 3 === 0 ? AnnotationShapes.LINE : AnnotationShapes.RECTANGLE;
  const imageId = Math.floor(Math.random() * _images.length) + 1;

  return {
    color: _annotationColors[index % _annotationColors.length],
    coordinates: generateCoordinates(type),
    id: index + 1,
    imageId,
    type,
  } as IAnnotation;
});
