import { Layer } from 'react-konva';
import { LayerConfig } from 'konva/lib/Layer';

// ----------------------------------------------------------------------

interface Props extends LayerConfig {}

export default function LayerDrawing({ ...layerProps }: Props) {
  return (
    <Layer {...layerProps}>
      {/*  */}
      {/*  */}
    </Layer>
  );
}
