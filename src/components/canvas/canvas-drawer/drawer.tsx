import { Shape } from 'konva/lib/Shape';
import { ShapeConfig } from 'konva/lib/Shape';
import { KonvaEventObject } from 'konva/lib/Node';
import { Line, Rect, Stage, Layer } from 'react-konva';
import { useRef, useMemo, useState, useCallback } from 'react';
import { StageConfig, Stage as StageType } from 'konva/lib/Stage';

import { IImage } from '@/types/models/image.types';
import { CanvasTools } from '@/types/canvas-tools.enum';
import { AnnotationShapes } from '@/types/annotation-shapes.enum';
import { Size, TLine, TPoint, TRectangle, AnnotationShape } from '@/types/canvas.types';

import {
  CANVAS_TENSION,
  CANVAS_ZOOM_SCALE,
  CANVAS_STROKE_WIDTH,
  CANVAS_DASH_PATTERN,
  CANVAS_DEFAULT_POINT,
} from '@/configs/canvas.config';

import LayerImage from './layer-image';
import { getStagePoint, isDrawingTool, getRectDimensions } from '../helpers';

// ----------------------------------------------------------------------

interface Props extends StageConfig {
  tool: CanvasTools;
  size: Size;
  imageURL: IImage['url'];
  loading: boolean;
  handleLoading: (value: boolean) => void;
  color: string;
}

// Constants

export default function Drawer({ color, handleLoading, imageURL, loading, size, tool, ...rest }: Props) {
  const [lines, setLines] = useState<AnnotationShape<TLine>[]>([]);
  const [rectangles, setRectangles] = useState<AnnotationShape<TRectangle>[]>([]);
  const [tempRectangle, setTempRectangle] = useState<TRectangle | null>(null);
  const isDrawing = useRef(false);
  const startPos = useRef<TPoint | null>(null);

  const startDrawLine = useCallback((stagePoint: TPoint, color: string) => {
    setLines(prev => [...prev, { color, points: [stagePoint.x, stagePoint.y] }]);
  }, []);
  const resizeDrawLine = useCallback(
    (stagePoint: TPoint) => {
      const lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([stagePoint.x, stagePoint.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    },
    [lines]
  );

  const startDrawRectangle = useCallback((stagePoint: TPoint) => {
    startPos.current = stagePoint;
    setTempRectangle({ height: 0, width: 0, x: stagePoint.x, y: stagePoint.y });
  }, []);
  const resizeDrawRectangle = useCallback(
    (stagePoint: TPoint) => {
      if (startPos.current && tempRectangle) {
        const newRect = getRectDimensions(startPos.current, stagePoint);
        setTempRectangle(newRect);
      }
    },
    [tempRectangle]
  );
  const finalizeDrawRectangle = useCallback(() => {
    if (tempRectangle) {
      setRectangles(prev => [...prev, { ...tempRectangle, color }]);
      setTempRectangle(null);
      startPos.current = null;
    }
  }, [tempRectangle, color]);

  const handleZoom = useCallback((e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = e.target.getStage();
    if (!stage) return;

    const scaleBy = CANVAS_ZOOM_SCALE;
    const oldScale = stage.scaleX();
    const pointerPosition = stage.getPointerPosition() ?? CANVAS_DEFAULT_POINT;

    const mousePointTo = {
      x: pointerPosition.x / oldScale - stage.x() / oldScale,
      y: pointerPosition.y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: -(mousePointTo.x - pointerPosition.x / newScale) * newScale,
      y: -(mousePointTo.y - pointerPosition.y / newScale) * newScale,
    };

    stage.position(newPos);
  }, []);

  const handleErase = useCallback((target: Shape<ShapeConfig> | StageType) => {
    const elementName = target.name();
    const elementIndex = Number(target.id());

    if (elementName === AnnotationShapes.LINE) {
      setLines(prev => prev.filter((_, index) => index !== elementIndex));
    } else if (elementName === AnnotationShapes.RECTANGLE) {
      setRectangles(prev => prev.filter((_, index) => index !== elementIndex));
    }
  }, []);

  const handleMouseDown = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (tool === CanvasTools.GRAB) return;
      if (tool === CanvasTools.ERASE) {
        handleErase(e.target);
        return;
      }
      if (isDrawingTool(tool)) {
        const stage = e.target.getStage();
        if (!stage) return;

        isDrawing.current = true;

        const stagePoint = getStagePoint(stage, stage.getPointerPosition() ?? CANVAS_DEFAULT_POINT);

        if (tool === CanvasTools.RECTANGLE) {
          startDrawRectangle(stagePoint);
        } else {
          startDrawLine(stagePoint, color);
        }
      }
    },
    [tool, handleErase, startDrawRectangle, startDrawLine, color]
  );

  const handleMouseMove = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (tool === CanvasTools.GRAB) return;
      if (!isDrawing.current) return;

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
    [tool, resizeDrawRectangle, resizeDrawLine]
  );

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;

    if (tool === CanvasTools.RECTANGLE) finalizeDrawRectangle();
  }, [tool, finalizeDrawRectangle]);

  const drawingLayer = useMemo(
    () => (
      <Layer>
        {rectangles.map((rect, i) => (
          <Rect id={i.toString()} key={i} name='rectangle' {...rect} stroke={rect.color} />
        ))}
        {tempRectangle && <Rect dash={CANVAS_DASH_PATTERN} stroke={color} {...tempRectangle} />}
        {lines.map((line, i) => (
          <Line
            id={i.toString()}
            key={i}
            lineCap='round'
            lineJoin='round'
            name='line'
            points={line.points}
            stroke={line.color}
            strokeWidth={CANVAS_STROKE_WIDTH}
            tension={CANVAS_TENSION}
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
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onWheel={handleZoom}
      style={{ pointerEvents: loading ? 'none' : 'auto' }}
      width={size.width}
      {...rest}
    >
      <LayerImage handleLoading={handleLoading} imageURL={imageURL} x={size.width} y={size.height} />

      {drawingLayer}
    </Stage>
  );
}
