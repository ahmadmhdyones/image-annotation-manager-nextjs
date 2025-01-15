/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/nextjs';
import axios, { AxiosError } from 'axios';

import { API_URL } from '@/configs/global.config';

import { TRequest } from './types';

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
        // TODO: show 404 page
        break;
      default:
        break;
    }

    // TODO: show toast

    return Promise.reject(error);
  }
);

// ----------------------------------------------------------------------

export const request = async <Res = any, Payload = any, Params = any>({
  method,
  showNotification = method !== 'GET',
  url,
  ...args
}: TRequest<Payload, Params>): Promise<Res> => {
  try {
    const response = await axiosInstance.request<Res>({ method, url, ...args });

    const { data } = response;

    if (showNotification) {
      // TODO: show toast
    }

    return data;
  } catch (error) {
    Sentry.captureException(error, {
      extra: {
        message: 'Request failed',
        method,
        params: args.params,
        requestData: args.data,
        url,
      },
      level: 'error',
      tags: { category: 'http' },
    });
    throw error;
  }
};
