import { request } from './axios';
import { TRequest, ResourceWithoutId, TRequestGetManyOptions } from './types';

// ----------------------------------------------------------------------

export class ResourceApiManager<Resource> {
  constructor(private readonly endpoint: string) {}

  public async getOne(id: string, options?: Omit<TRequest, 'method' | 'url'>) {
    return await request<Resource>({ ...options, method: 'GET', url: `${this.endpoint}/${id}` });
  }

  public async getMany<Params extends TRequest['params'] = {}>(options?: TRequestGetManyOptions<Params>) {
    return await request<Resource[]>({ ...options, method: 'GET', url: this.endpoint });
  }

  public async create(data: ResourceWithoutId<Resource>, options?: Omit<TRequest, 'method' | 'url' | 'data'>) {
    return await request<Resource>({ ...options, data, method: 'POST', url: this.endpoint });
  }

  public async update(
    id: string,
    data: Partial<ResourceWithoutId<Resource>>,
    options?: Omit<TRequest, 'method' | 'url' | 'data'>
  ) {
    return await request<Resource>({ ...options, data, method: 'PUT', url: `${this.endpoint}/${id}` });
  }

  public async delete(id: string, options?: Omit<TRequest, 'method' | 'url'>) {
    return await request<{}>({ ...options, method: 'DELETE', url: `${this.endpoint}/${id}` });
  }
}
