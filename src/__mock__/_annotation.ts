import { IAnnotation } from '@/types/models/annotation.types';

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
const generateCoordinates = (type: 'rectangle' | 'line') => {
  if (type === 'rectangle') {
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
export const _annotations: IAnnotation[] = [...Array(1200)].map((_, index) => {
  const type = index % 3 === 0 ? 'line' : 'rectangle'; // Mix of rectangle and line annotations
  const imageId = (index % _images.length) + 1; // Link to existing images cyclically

  return {
    color: _annotationColors[index % _annotationColors.length],
    coordinates: generateCoordinates(type),
    id: index + 1,
    imageId,
    type,
  } as IAnnotation;
});
