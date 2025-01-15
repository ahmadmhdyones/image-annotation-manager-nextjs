import { IImage } from '@/types/models/image.type';
import { IAnnotation } from '@/types/models/annotation.type';

import { request } from '../axios';
import { endpoints } from '../endpoints';
import { ResourceApiManager } from '../resource-api-manager';

// ----------------------------------------------------------------------

class ImageApiManager extends ResourceApiManager<IImage> {
  constructor() {
    super(endpoints.images);
  }

  public async getAnnotations(imageId: IImage['id']) {
    return await request<IAnnotation[]>({ method: 'GET', url: `${this.endpoint}/${imageId}/annotations` });
  }
}

export const imageAPI = new ImageApiManager();
