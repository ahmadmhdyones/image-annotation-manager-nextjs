import { IImage } from '@/types/models/image.types';
import { IAnnotation } from '@/types/models/annotation.types';

import { request } from '../axios';
import { endpoints } from '../endpoints';
import { ResourceApiService } from '../resource-api-service';

// ----------------------------------------------------------------------

class ImageApiService extends ResourceApiService<IImage> {
  constructor() {
    super(endpoints.images);
  }

  public async getCount() {
    return request<number>({ method: 'GET', url: `${this.endpoint}/count` });
  }

  public async getAnnotations(imageId: IImage['id']) {
    return await request<IAnnotation[]>({ method: 'GET', url: `${this.endpoint}/${imageId}/annotations` });
  }

  public async getAnnotationsCount(imageId: IImage['id']) {
    return request<number>({ method: 'GET', url: `${this.endpoint}/${imageId}/annotations/count` });
  }
}

export const imageAPI = new ImageApiService();
