import { ButtonProps } from '@mui/material';

import { CanvasTools } from './canvas-tools.enum';

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

export type AnnotationShape<T> = {
  color: string;
} & T;
