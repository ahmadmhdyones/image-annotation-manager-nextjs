import { ICategory } from '@/types/models/category.types';

import { API_MOCK_INITIAL_DATA_COUNT_CATEGORIES } from '@/configs/global.config';

import { _mock } from './_mock';
import { _tags } from './assets';

// ----------------------------------------------------------------------

export const _categories: ICategory[] = [...Array(API_MOCK_INITIAL_DATA_COUNT_CATEGORIES)].map((_, index) => ({
  description: _mock.description(index),
  id: index + 1,
  image: `https://picsum.photos/500/300?random=${index + 1}`,
  name: _tags[index % _tags.length],
}));
