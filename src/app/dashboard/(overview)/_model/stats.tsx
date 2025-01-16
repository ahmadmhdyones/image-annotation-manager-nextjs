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
    queryFn: async () => await categoryAPI.getCount(),
    queryKey: [queryKeys.categoriesCount()],
    title: 'Total Categories',
    type: 'card',
  },
  {
    icon: CollectionsIcon,
    queryFn: async () => await imageAPI.getCount(),
    queryKey: [queryKeys.imagesCount()],
    title: 'Total Images',
    type: 'card',
  },
  {
    icon: CategoryIcon,
    queryFn: async () => await annotationAPI.getCount(),
    queryKey: [queryKeys.annotationsCount()],
    title: 'Total Annotations',
    type: 'card',
  },
  {
    queryFn: async () => await annotationAPI.getMany(),
    queryKey: [queryKeys.annotations()],
    title: 'Annotations by Type',
    type: 'chart',
  },
  {
    queryFn: async () => await categoryAPI.getMany(),
    queryKey: [queryKeys.categories()],
    title: 'Category Popularity',
    type: 'chart',
  },
  {
    queryFn: async () => await imageAPI.getMany(),
    queryKey: [queryKeys.images()],
    title: 'Image Upload Trend',
    type: 'chart',
  },
] as const;
