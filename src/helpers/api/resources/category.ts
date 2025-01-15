import { ICategory } from '@/types/models/category.type';

import { endpoints } from '../endpoints';
import { ResourceApiManager } from '../resource-api-manager';

// ----------------------------------------------------------------------

class CategoryApiManager extends ResourceApiManager<ICategory> {
  constructor() {
    super(endpoints.categories);
  }
}

export const categoryAPI = new CategoryApiManager();
