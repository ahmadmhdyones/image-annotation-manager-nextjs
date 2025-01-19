import { TLine, TRectangle } from '../canvas.types';
import { AnnotationShapes } from '../annotation-shapes.enum';

// ----------------------------------------------------------------------

export type IAnnotation = {
  id: number;
  color: string;
  imageId: number;
} & (LineAnnotation | RectangleAnnotation);

type RectangleAnnotation = {
  type: AnnotationShapes.RECTANGLE;
  coordinates: TRectangle;
};

type LineAnnotation = {
  type: AnnotationShapes.LINE;
  coordinates: TLine;
};
