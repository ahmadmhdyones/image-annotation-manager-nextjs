import { ButtonProps } from '@mui/material';

import { CanvasTools } from './canvas-tools.enum';

export interface Size {
  width: number;
  height: number;
}

export interface LineDraw {
  tool: any;
  points: number[];
  color: string;
}

export type CanvasToolbarTool =
  | ({
      icon: React.ReactNode;
      label: string;
      tool: CanvasTools;
    } & ButtonProps)
  | null;
