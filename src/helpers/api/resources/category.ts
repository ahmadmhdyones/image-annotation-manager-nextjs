import { ICategory } from '@/types/models/category.type';

import { endpoints } from '../endpoints';
import { ResourceApiManager } from '../resource-api-manager';

// ----------------------------------------------------------------------

export const categoryAPI = new ResourceApiManager<ICategory>(endpoints.categories);
