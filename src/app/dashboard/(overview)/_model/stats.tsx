import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CollectionsIcon from '@mui/icons-material/Collections';

import { queryKeys } from '@/helpers/react-query';
import { imageAPI } from '@/helpers/api/resources/image';
import { categoryAPI } from '@/helpers/api/resources/category';
import { annotationAPI } from '@/helpers/api/resources/annotation';

// ----------------------------------------------------------------------

export const stats = [
  {
    icon: LocalOfferIcon,
    queryFn: async () => {
      'use server';
      return await categoryAPI.getCount();
    },
    queryKey: [queryKeys.categoriesCount()],
    title: 'Total Categories',
    type: 'card',
  },
  {
    icon: CollectionsIcon,
    queryFn: async () => {
      'use server';
      return await imageAPI.getCount();
    },
    queryKey: [queryKeys.imagesCount()],
    title: 'Total Images',
    type: 'card',
  },
  {
    icon: CategoryIcon,
    queryFn: async () => {
      'use server';
      return await annotationAPI.getCount();
    },
    queryKey: [queryKeys.annotationsCount()],
    title: 'Total Annotations',
    type: 'card',
  },
  {
    queryFn: async () => {
      'use server';
      return await annotationAPI.getMany();
    },
    queryKey: [queryKeys.annotations()],
    title: 'Annotations by Type',
    type: 'chart',
  },
  {
    queryFn: async () => {
      'use server';
      return await categoryAPI.getMany();
    },
    queryKey: [queryKeys.categories()],
    title: 'Category Popularity',
    type: 'chart',
  },
  {
    queryFn: async () => {
      'use server';
      return await imageAPI.getMany();
    },
    queryKey: [queryKeys.images()],
    title: 'Image Upload Trend',
    type: 'chart',
  },
] as const;
