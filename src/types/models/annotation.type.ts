export interface IAnnotation {
  id: number;
  type: string;
  color: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  imageId: number;
}
