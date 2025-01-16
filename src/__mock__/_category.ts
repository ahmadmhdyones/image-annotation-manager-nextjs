import { ICategory } from '@/types/models/category.types';

import { _mock } from './_mock';
import { _tags } from './assets';

// ----------------------------------------------------------------------

export const _categories: ICategory[] = [...Array(24)].map((_, index) => ({
  description: _mock.description(index),
  id: index + 1,
  image: `https://picsum.photos/500/300?random=${index + 1}`,
  name: _tags[index % _tags.length],
}));
