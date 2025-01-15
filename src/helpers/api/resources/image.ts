import { IImage } from '@/types/models/image.type';
import { IAnnotation } from '@/types/models/annotation.type';

import { request } from '../axios';
import { endpoints } from '../endpoints';
import { ResourceApiService } from '../resource-api-service';

// ----------------------------------------------------------------------

class ImageApiService extends ResourceApiService<IImage> {
  constructor() {
    super(endpoints.images);
  }

  public async getAnnotations(imageId: IImage['id']) {
    return await request<IAnnotation[]>({ method: 'GET', url: `${this.endpoint}/${imageId}/annotations` });
  }
}

export const imageAPI = new ImageApiService();
