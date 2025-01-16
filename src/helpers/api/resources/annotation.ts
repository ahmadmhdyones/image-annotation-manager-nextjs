import { IAnnotation } from '@/types/models/annotation.type';

import { request } from '../axios';
import { endpoints } from '../endpoints';
import { ResourceApiService } from '../resource-api-service';

// ----------------------------------------------------------------------

class AnnotationApiService extends ResourceApiService<IAnnotation> {
  constructor() {
    super(endpoints.annotations);
  }

  public async getCount() {
    return request<number>({ method: 'GET', url: `${this.endpoint}/count` });
  }
}

export const annotationAPI = new AnnotationApiService();
