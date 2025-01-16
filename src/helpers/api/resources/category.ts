import { ICategory } from '@/types/models/category.types';

import { request } from '../axios';
import { endpoints } from '../endpoints';
import { ResourceApiService } from '../resource-api-service';

// ----------------------------------------------------------------------

class CategoryApiService extends ResourceApiService<ICategory> {
  constructor() {
    super(endpoints.categories);
  }

  public async getCount() {
    return request<number>({ method: 'GET', url: `${this.endpoint}/count` });
  }
}

export const categoryAPI = new CategoryApiService();
