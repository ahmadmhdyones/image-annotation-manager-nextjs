import useImage from 'use-image';
import { Layer } from 'react-konva';
import { LayerConfig } from 'konva/lib/Layer';
import { Image as KonvaImage } from 'react-konva';

import { Size } from '@/types/canvas.types';
import { IImage } from '@/types/models/image.types';

// ----------------------------------------------------------------------

/**
 * LayerImage Component
 *
 * Handles image loading and positioning in Konva:
 * - Centralizes image within canvas viewport
 * - Calculates center position based on image dimensions
 * - Reports loading state to parent for UI feedback
 *
 * Note: Image is automatically centered using (canvasWidth/2 - imageWidth/2) formula
 */

interface Props extends LayerConfig {
  imageURL: IImage['url'];
  x: Size['width'];
  y: Size['height'];
  handleLoading: (value: boolean) => void;
}

export default function LayerImage({ handleLoading, imageURL, x, y, ...layerProps }: Props) {
  const [image, status] = useImage(imageURL);

  if (status === 'loading') handleLoading(true);
  if (status !== 'loading') handleLoading(false);

  if (!image) return null;

  const centerX = x / 2 - image.width / 2;
  const centerY = y / 2 - image.height / 2;

  return (
    <Layer {...layerProps}>
      <KonvaImage image={image} x={centerX} y={centerY} />
    </Layer>
  );
}
