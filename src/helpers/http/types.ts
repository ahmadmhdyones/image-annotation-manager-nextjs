/* eslint-disable @typescript-eslint/no-explicit-any */
import { Method, AxiosRequestConfig } from 'axios';

// ----------------------------------------------------------------------

export interface TRequest<D = any, P = any> extends AxiosRequestConfig<D> {
  url: string;
  method: Method;
  showNotification?: boolean;
  params?: P;
}
