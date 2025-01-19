import * as Sentry from '@sentry/nextjs';
import axios, { AxiosError } from 'axios';
import { notFound } from 'next/navigation';

import { API_URL, API_MOCK_ENABLED } from '@/configs/global.config';

import { setupMocks } from './mocks';
import { TRequest, TResponse } from './types';

// ----------------------------------------------------------------------

/**
 * Axios Instance Configuration
 *
 * Centralized HTTP client setup that:
 * - Configures base API settings and headers
 * - Handles file uploads via FormData
 * - Manages global error handling with Sentry
 * - Provides type-safe request wrapper for API calls
 * - Enables mock API integration when needed
 *
 * Usage: import { request } from './axios'
 * Instead of: using axios directly
 */

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

    return Promise.reject(error);
  }
);

// ----------------------------------------------------------------------

if (API_MOCK_ENABLED) setupMocks(axiosInstance);

// ----------------------------------------------------------------------

export const request = async <Res = any, Payload = any, Params = any>({
  method,
  url,
  ...args
}: TRequest<Payload, Params>): Promise<Res> => {
  try {
    const response = await axiosInstance.request<TResponse<Res>>({ method, url, ...args });

    const { data } = response;

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
