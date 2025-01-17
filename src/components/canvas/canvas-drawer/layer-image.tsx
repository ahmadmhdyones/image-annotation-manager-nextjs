import useImage from 'use-image';
import { Layer } from 'react-konva';
import { LayerConfig } from 'konva/lib/Layer';
import { Image as KonvaImage } from 'react-konva';

import { Size } from '@/types/canvas.types';
import { IImage } from '@/types/models/image.types';

// ----------------------------------------------------------------------

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
