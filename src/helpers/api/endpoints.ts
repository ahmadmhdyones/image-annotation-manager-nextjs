/**
 * API Endpoints
 *
 * Centralizes all API endpoint strings:
 * - Prevents hardcoded URLs in components
 * - Ensures consistent naming across the application
 * - Provides type-safe access to endpoints
 */

export const endpoints = {
  annotations: '/annotations',
  categories: '/categories',
  images: '/images',
} as const;
