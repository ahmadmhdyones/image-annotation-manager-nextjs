'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

import { Box } from '@mui/material';

import { useBoolean } from '@/hooks/use-boolean';

import { IImage } from '@/types/models/image.types';
import { CanvasTools } from '@/types/canvas-tools.enum';

import { CANVAS_TOOLS, CANVAS_DEFAULT_TOOL, CANVAS_DEFAULT_COLOR } from '@/configs/canvas.config';

import CanvasDrawer from './canvas-drawer';
import CanvasLoading from './canvas-loading';
import { useElementSize } from './hooks/use-element-size';
import { useCanvasCursor } from './hooks/use-canvas-cursor';
const CanvasToolbar = dynamic(() => import('./canvas-toolbar'), { ssr: false });

// ----------------------------------------------------------------------

interface Props {
  image: IImage;
}

export default function CanvasContainer({ image }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const size = useElementSize(containerRef);

  const loading = useBoolean(true);

  const [tool, setTool] = useState<CanvasTools>(CANVAS_DEFAULT_TOOL);
  const [color, setColor] = useState<string>(CANVAS_DEFAULT_COLOR);

  useCanvasCursor(tool);

  return (
    <Box ref={containerRef} sx={{ height: '100%', position: 'relative', width: '100%' }}>
      {loading.value && <CanvasLoading />}

      {!loading.value && (
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
        color={color}
        handleLoading={loading.setValue}
        imageURL={image.url}
        loading={loading.value}
        size={size}
        tool={tool}
      />
    </Box>
  );
}
