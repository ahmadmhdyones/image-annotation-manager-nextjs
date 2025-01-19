import { Method, AxiosRequestConfig } from 'axios';

// ----------------------------------------------------------------------

/**
 * Request Configuration Type
 *
 * Extends AxiosRequestConfig to add custom properties:
 * - url: string;
 * - method: Method;
 * - params?: Params;
 */
export interface TRequest<Data = never, Params = Record<string, string | number | boolean>>
  extends AxiosRequestConfig<Data> {
  url: string;
  method: Method;
  params?: Params;
}

// Our custom response wrapper
export type TResponse<Data = never> = Data;

// Custom payload type - especially for update and create payload APIs
export type ResourceCreateUpdateInput<TResource> = Omit<TResource, 'id' | 'createdAt' | 'updatedAt' | 'uploadedAt'>;
