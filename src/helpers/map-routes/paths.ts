import { PageType } from './pages.enum';

// ----------------------------------------------------------------------

const ROOTS = {
  DASHBOARD: '/dashboard',
  HOME: '/',
};

// ----------------------------------------------------------------------

export const paths = {
  dashboard: {
    categories: {
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
    root: { id: PageType.DashboardPage, to: () => `${ROOTS.DASHBOARD}` },
  },
  root: { id: PageType.HomePage, to: () => `${ROOTS.HOME}` },
} as const;
