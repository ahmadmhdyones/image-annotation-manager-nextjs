import { IAnnotation } from '@/types/models/annotation.type';

import { endpoints } from '../endpoints';
import { ResourceApiManager } from '../resource-api-manager';

// ----------------------------------------------------------------------

class AnnotationApiManager extends ResourceApiManager<IAnnotation> {
  constructor() {
    super(endpoints.annotations);
  }
}

export const annotationAPI = new AnnotationApiManager();
