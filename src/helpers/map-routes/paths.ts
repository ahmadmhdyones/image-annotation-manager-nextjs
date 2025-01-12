import { PageType } from './pages.enum';

// ----------------------------------------------------------------------

const ROOTS = {
  DASHBOARD: '/dashboard',
  HOME: '/',
};

// ----------------------------------------------------------------------

export const paths = {
  dashboard: {
    category: {
      new: { id: PageType.CategoryNewPage, to: () => `${ROOTS.DASHBOARD}/categories/new` },
      root: { id: PageType.CategoryListPage, to: () => `${ROOTS.DASHBOARD}/categories` },
    },
    image: {
      id: {
        canvas: {
          id: PageType.ImageCanvasPage,
          to: (imageId: string) => `${ROOTS.DASHBOARD}/images/${imageId}/canvas`,
        },
      },
      root: { id: PageType.ImageListPage, to: () => `${ROOTS.DASHBOARD}/images` },
      upload: { id: PageType.ImageUploadPage, to: () => `${ROOTS.DASHBOARD}/images/upload` },
    },
    root: { id: PageType.DashboardPage, to: () => `${ROOTS.DASHBOARD}` },
  },
  root: { id: PageType.HomePage, to: () => `${ROOTS.HOME}` },
} as const;
