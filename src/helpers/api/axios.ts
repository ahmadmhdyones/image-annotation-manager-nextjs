import * as Sentry from '@sentry/nextjs';
import axios, { AxiosError } from 'axios';
import { notFound } from 'next/navigation';

import { API_URL } from '@/configs/global.config';

import { setupMocks } from './mocks';
import { TRequest, TResponse } from './types';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    // Uploading Files using FormData
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    const { response } = error;

    switch (response?.status) {
      case 404:
        notFound();
      default:
        break;
    }

    // TODO: show toast

    return Promise.reject(error);
  }
);

setupMocks(axiosInstance);

// ----------------------------------------------------------------------

export const request = async <Res = any, Payload = any, Params = any>({
  method,
  showNotification = method !== 'GET',
  url,
  ...args
}: TRequest<Payload, Params>): Promise<Res> => {
  try {
    const response = await axiosInstance.request<TResponse<Res>>({ method, url, ...args });

    const { data } = response.data;

    if (showNotification) {
      // TODO: show toast
    }

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      Sentry.captureException(error, {
        extra: {
          message: 'Request failed',
          request: {
            data: error.config?.data,
            headers: error.config?.headers.toJSON(),
            method: error.config?.method,
            url: error.config?.url,
          },
          response: {
            data: error.response?.data,
            status: error.response?.status,
          },
        },
        level: 'error',
        tags: { category: 'http' },
      });
    }
    throw error;
  }
};
