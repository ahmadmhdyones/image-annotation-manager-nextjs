import { IImage } from '@/types/models/image.type';

import { endpoints } from '../endpoints';
import { ResourceApiManager } from '../resource-api-manager';

// ----------------------------------------------------------------------

export const imageAPI = new ResourceApiManager<IImage>(endpoints.images);
