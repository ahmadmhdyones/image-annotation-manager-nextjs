'use client';

import dynamic from 'next/dynamic';
import { useRef, useMemo, useState } from 'react';

import { Box } from '@mui/material';

import { IImage } from '@/types/models/image.types';

import { CANVAS_TOOLS } from '@/configs/canvas.config';

import CanvasDrawer from '../canvas-drawer';
import CanvasLoading from '../canvas-loading';
import { useAnnotations } from './hooks/use-annotations';
import { useElementSize } from './hooks/use-element-size';
import { useCanvasTools } from './hooks/use-canvas-tools';
import { useCanvasCursor } from './hooks/use-canvas-cursor';
import { useInvalidateAnnotations } from './hooks/use-invalidate-annotations';
const CanvasToolbar = dynamic(() => import('../canvas-toolbar'), { ssr: false });

// ----------------------------------------------------------------------

/**
 * CanvasContainer Component
 *
 * Manages canvas display states and component hierarchy:
 * - Shows loading screen during initial image fetch
 * - Displays "Syncing" overlay during annotation updates
 * - Renders toolbar only after data is ready
 * - Integrates Konva canvas for drawing functionality
 *
 * Display Flow:
 * 1. Loading -> while fetching image
 * 2. Syncing -> during annotation updates
 * 3. Toolbar -> when data is ready
 * 4. Canvas -> Konva-based drawing surface
 */

export default function Container({ image }: { image: IImage }) {
  const containerRef = useRef<HTMLElement>(null);
  const size = useElementSize(containerRef);
  const [loading, setLoading] = useState(true);

  const { color, setColor, setTool, tool } = useCanvasTools();

  useCanvasCursor(tool);

  const { annotations, createAnnotation, deleteAnnotation, isLoadingAnnotations, isRefetchingAnnotations } =
    useAnnotations(image.id);

  const isCanvasLoading = useMemo(
    () => loading || isLoadingAnnotations || isRefetchingAnnotations,
    [loading, isLoadingAnnotations, isRefetchingAnnotations]
  );

  useInvalidateAnnotations(image.id);

  return (
    <Box ref={containerRef} sx={{ height: '100%', position: 'relative', width: '100%' }}>
      {(loading || isLoadingAnnotations) && <CanvasLoading />}

      {isRefetchingAnnotations && <CanvasLoading text='Syncing...' />}

      {!isCanvasLoading && !isRefetchingAnnotations && (
        <CanvasToolbar
          colorPicker={{
            onColorChange: (color: string) => setColor(() => color),
            previewColor: color,
          }}
          onSelect={setTool}
          selected={tool}
          tools={CANVAS_TOOLS}
        />
      )}

      <CanvasDrawer
        annotations={annotations}
        color={color}
        handleLoading={setLoading}
        imageURL={image.url}
        loading={isCanvasLoading}
        onAnnotationCreate={createAnnotation}
        onAnnotationDelete={deleteAnnotation}
        size={size}
        tool={tool}
      />
    </Box>
  );
}
