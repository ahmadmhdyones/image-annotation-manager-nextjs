import { ICategory } from '@/types/models/category.type';

import { endpoints } from '../endpoints';
import { ResourceApiService } from '../resource-api-service';

// ----------------------------------------------------------------------

class CategoryApiService extends ResourceApiService<ICategory> {
  constructor() {
    super(endpoints.categories);
  }
}

export const categoryAPI = new CategoryApiService();
