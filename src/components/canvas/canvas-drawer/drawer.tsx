import { useMemo, useCallback } from 'react';
import { StageConfig } from 'konva/lib/Stage';
import { KonvaEventObject } from 'konva/lib/Node';
import { Line, Rect, Stage, Layer } from 'react-konva';

import { Size } from '@/types/canvas.types';
import { IImage } from '@/types/models/image.types';
import { CanvasTools } from '@/types/canvas-tools.enum';
import { IAnnotation } from '@/types/models/annotation.types';

import {
  CANVAS_TENSION,
  CANVAS_STROKE_WIDTH,
  CANVAS_DASH_PATTERN,
  CANVAS_DEFAULT_POINT,
} from '@/configs/canvas.config';

import { ResourceCreateUpdateInput } from '@/helpers/api/types';

import LayerImage from './layer-image';
import { useZoom } from './hooks/use-zoom';
import { useErase } from './hooks/use-erase';
import { useDrawing } from './hooks/use-drawing';
import { useAnnotations } from './hooks/use-annotations';
import { getStagePoint, isDrawingTool } from '../helpers';

// ----------------------------------------------------------------------

interface Props extends StageConfig {
  annotations?: IAnnotation[];
  tool: CanvasTools;
  size: Size;
  imageURL: IImage['url'];
  loading: boolean;
  handleLoading: (value: boolean) => void;
  color: string;
  onAnnotationCreate: (annotation: Omit<ResourceCreateUpdateInput<IAnnotation>, 'imageId'>) => Promise<IAnnotation>;
  onAnnotationDelete: (id: IAnnotation['id']) => void;
}

/**
 * Drawer Component
 *
 * Core Konva canvas manager:
 * - Orchestrates drawing and image layers
 * - Handles mouse interactions for all tools
 * - Manages annotations state and rendering
 * - Controls canvas tools (draw, erase, grab, rectangle)
 *
 * Structure:
 * - Image Layer: Base canvas image
 * - Drawing Layer: User annotations
 */

export default function Drawer({
  annotations = [],
  color,
  handleLoading,
  imageURL,
  loading,
  onAnnotationCreate,
  onAnnotationDelete,
  size,
  tool,
  ...rest
}: Props) {
  const { lines, rectangles, setLines, setRectangles } = useAnnotations(annotations);

  const { handleTouchEnd, handleTouchMove, handleWheel } = useZoom();

  const {
    finalizeDrawLine,
    finalizeDrawRectangle,
    isDrawing,
    resizeDrawLine,
    resizeDrawRectangle,
    startDrawLine,
    startDrawRectangle,
    tempRectangle,
  } = useDrawing({
    color,
    onAnnotationCreate,
    setLines,
    setRectangles,
  });

  const { handleErase } = useErase({ lines, onAnnotationDelete, rectangles, setLines, setRectangles });

  const handlePointerDown = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      switch (tool) {
        case CanvasTools.GRAB:
          return;
        case CanvasTools.ERASE:
          handleErase(e.target);
          return;
        default:
          break;
      }

      if (isDrawingTool(tool)) {
        const stage = e.target.getStage();
        if (!stage) return;

        isDrawing.current = true;

        const pos = stage.getPointerPosition() ?? CANVAS_DEFAULT_POINT;
        const stagePoint = getStagePoint(stage, pos);

        switch (tool) {
          case CanvasTools.RECTANGLE:
            startDrawRectangle(stagePoint);
            break;
          case CanvasTools.DRAW:
            startDrawLine(stagePoint);
            break;
          default:
            break;
        }
      }
    },
    [tool, handleErase, isDrawing, startDrawRectangle, startDrawLine]
  );

  const handlePointerMove = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (tool === CanvasTools.GRAB) return;
      if (!isDrawing.current) return;

      e.evt.preventDefault();
      e.evt.stopPropagation();

      const stage = e.target.getStage();
      if (!stage) return;

      const point = stage.getPointerPosition() ?? { x: 0, y: 0 };
      const stagePoint = getStagePoint(stage, point);

      if (tool === CanvasTools.RECTANGLE) {
        resizeDrawRectangle(stagePoint);
      } else if (tool === CanvasTools.DRAW) {
        resizeDrawLine(stagePoint);
      }
    },
    [tool, isDrawing, resizeDrawRectangle, resizeDrawLine]
  );

  const handlePointerEnd = useCallback(
    (_e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      isDrawing.current = false;

      if (tool === CanvasTools.RECTANGLE) finalizeDrawRectangle();
      if (tool === CanvasTools.DRAW) finalizeDrawLine();
    },
    [isDrawing, tool, finalizeDrawRectangle, finalizeDrawLine]
  );

  const drawingLayer = useMemo(
    () => (
      <Layer id='canvas-drawing-layer'>
        {/* Rectangles */}
        {rectangles.map(rect => (
          <Rect id={rect.uuid} key={rect.uuid} name='rectangle' stroke={rect.color} {...rect.coordinates} />
        ))}
        {tempRectangle && <Rect dash={CANVAS_DASH_PATTERN} stroke={color} {...tempRectangle} />}

        {/* Lines */}
        {lines.map(line => (
          <Line
            id={line.uuid}
            key={line.uuid}
            lineCap='round'
            lineJoin='round'
            name='line'
            stroke={line.color}
            strokeWidth={CANVAS_STROKE_WIDTH}
            tension={CANVAS_TENSION}
            {...line.coordinates}
          />
        ))}
      </Layer>
    ),
    [rectangles, tempRectangle, lines, color]
  );

  return (
    <Stage
      draggable={tool === CanvasTools.GRAB}
      height={size.height}
      onMouseDown={handlePointerDown}
      onMouseLeave={handlePointerEnd}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerEnd}
      onTouchEnd={e => {
        handleTouchEnd(e);
        handlePointerEnd(e);
      }}
      onTouchMove={e => {
        // Handle multi-touch zoom
        if (e.evt.touches.length === 2) {
          isDrawing.current = false; // Reset drawing state for zoom
          const stage = e.target.getStage();
          if (stage) {
            stage.draggable(false);
            handleTouchMove(e);
          }
        } else {
          const stage = e.target.getStage();
          if (stage && tool === CanvasTools.GRAB) {
            stage.draggable(true);
          }
          handlePointerMove(e);
        }
      }}
      onTouchStart={handlePointerDown}
      onWheel={handleWheel}
      style={{ pointerEvents: loading ? 'none' : 'auto', touchAction: 'none' }}
      width={size.width}
      {...rest}
    >
      <LayerImage
        handleLoading={handleLoading}
        id='canvas-image-layer'
        imageURL={imageURL}
        x={size.width}
        y={size.height}
      />

      {drawingLayer}
    </Stage>
  );
}
