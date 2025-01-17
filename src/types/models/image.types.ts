import { ImageFormat } from '../image-format.enum';

// ----------------------------------------------------------------------

export interface IImage {
  id: number;
  name: string;
  url: string;
  uploadAt: string;
  metadata: IImageMetadata;
  categoryId: number;
}

interface IImageMetadata {
  size: string;
  format: ImageFormat;
  resolution: string;
}
