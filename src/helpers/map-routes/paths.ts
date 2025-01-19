import { PageType } from './pages.enum';

// ----------------------------------------------------------------------

const ROOTS = {
  DASHBOARD: '/dashboard',
  HOME: '/',
};

// ----------------------------------------------------------------------

/**
 * Application Route Mapper
 *
 * Single source of truth for all application routes:
 * - Prevents hardcoded URLs across components
 * - Provides type-safe route generation with parameters
 * - Centralizes route management for easier maintenance
 *
 * Usage: paths.dashboard.categories.root.to()
 * Instead of: '/dashboard/categories'
 */

export const paths = {
  dashboard: {
    categories: {
      id: {
        edit: {
          id: PageType.CategoriesEditPage,
          to: (categoryId: string) => `${ROOTS.DASHBOARD}/categories/${categoryId}/edit`,
        },
      },
      new: { id: PageType.CategoriesNewPage, to: () => `${ROOTS.DASHBOARD}/categories/new` },
      root: { id: PageType.CategoriesListPage, to: () => `${ROOTS.DASHBOARD}/categories` },
    },
    images: {
      id: {
        canvas: {
          id: PageType.ImagesCanvasPage,
          to: (imageId: string) => `${ROOTS.DASHBOARD}/images/${imageId}/canvas`,
        },
      },
      root: { id: PageType.ImagesListPage, to: () => `${ROOTS.DASHBOARD}/images` },
      upload: { id: PageType.ImagesUploadPage, to: () => `${ROOTS.DASHBOARD}/images/upload` },
    },
    root: { id: PageType.DashboardOverviewPage, to: () => `${ROOTS.DASHBOARD}` },
  },
  root: { id: PageType.HomePage, to: () => `${ROOTS.HOME}` },
} as const;
