import { request } from './axios';
import { TRequest, ResourceCreateUpdateInput } from './types';

// ----------------------------------------------------------------------

export class ResourceApiService<Resource extends { id: number | string }> {
  constructor(protected readonly endpoint: string) {}

  public async getOne(id: Resource['id']) {
    return await request<Resource>({ method: 'GET', url: `${this.endpoint}/${id}` });
  }

  public async getMany<Params extends TRequest['params'] = {}>(
    options?: Omit<TRequest<never, Params>, 'method' | 'url'>
  ) {
    return await request<Resource[]>({ ...options, method: 'GET', url: this.endpoint });
  }

  public async create(data: ResourceCreateUpdateInput<Resource>) {
    return await request<Resource>({ data, method: 'POST', url: this.endpoint });
  }

  public async update(id: Resource['id'], data: Partial<ResourceCreateUpdateInput<Resource>>) {
    return await request<Resource>({ data, method: 'PUT', url: `${this.endpoint}/${id}` });
  }

  public async delete(id: Resource['id']) {
    return await request<{}>({ method: 'DELETE', url: `${this.endpoint}/${id}` });
  }
}
