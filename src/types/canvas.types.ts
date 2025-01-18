import { ButtonProps } from '@mui/material';

import { CanvasTools } from './canvas-tools.enum';
import { IAnnotation } from './models/annotation.types';

// ----------------------------------------------------------------------

export interface Size {
  width: number;
  height: number;
}

export type CanvasToolbarTool =
  | ({
      icon: React.ReactNode;
      label: string;
      tool: CanvasTools;
    } & ButtonProps)
  | null;

export interface TPoint {
  x: number;
  y: number;
}

export interface TRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TLine {
  points: number[];
}

export type AnnotationShape<T = never> = {
  id: IAnnotation['id'] | undefined;
  uuid: string;
  color: string;
  coordinates: T;
};
