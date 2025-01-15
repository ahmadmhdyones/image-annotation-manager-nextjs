import { IAnnotation } from '@/types/models/annotation.type';

import { endpoints } from '../endpoints';
import { ResourceApiManager } from '../resource-api-manager';

// ----------------------------------------------------------------------

export const annotationAPI = new ResourceApiManager<IAnnotation>(endpoints.annotations);
