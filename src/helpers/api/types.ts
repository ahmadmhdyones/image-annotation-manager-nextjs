import { Method, AxiosRequestConfig } from 'axios';

// ----------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TRequest<Data = any, Params = Record<string, string | number | boolean>>
  extends AxiosRequestConfig<Data> {
  url: string;
  method: Method;
  showNotification?: boolean;
  params?: Params;
}

export type ResourceWithoutId<TResource> = Omit<TResource, 'id'>;
