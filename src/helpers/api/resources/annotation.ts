import { IAnnotation } from '@/types/models/annotation.type';

import { endpoints } from '../endpoints';
import { ResourceApiService } from '../resource-api-service';

// ----------------------------------------------------------------------

class AnnotationApiService extends ResourceApiService<IAnnotation> {
  constructor() {
    super(endpoints.annotations);
  }
}

export const annotationAPI = new AnnotationApiService();
