export const { NODE_ENV: ENV } = process.env;

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const configTanstack = {
  reactQueryDevtoolsInitialIsOpen: false,
} as const;
