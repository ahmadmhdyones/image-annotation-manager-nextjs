export interface IImage {
  id: number;
  name: string;
  url: string;
  uploadDate: string;
  metadata: IImageMetadata;
  categoryId: number;
}

interface IImageMetadata {
  size: string;
  format: string;
  resolution: string;
}
