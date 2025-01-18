import { Method, AxiosRequestConfig } from 'axios';

// ----------------------------------------------------------------------

export interface TRequest<Data = never, Params = Record<string, string | number | boolean>>
  extends AxiosRequestConfig<Data> {
  url: string;
  method: Method;
  params?: Params;
}

export type TResponse<Data = never> = Data;

export type ResourceCreateUpdateInput<TResource> = Omit<TResource, 'id' | 'createdAt' | 'updatedAt' | 'uploadedAt'>;
