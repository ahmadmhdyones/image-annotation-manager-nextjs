import { IImage } from '@/types/models/image.types';

import { _mock } from './_mock';
import { _categories } from './_category';

// ----------------------------------------------------------------------

export const _images: IImage[] = [...Array(250)].map((_, index) => ({
  categoryId: (index % _categories.length) + 1,
  id: index + 1,
  metadata: {
    format: _mock.file.format(index) as IImage['metadata']['format'],
    resolution: _mock.file.resolution(index),
    size: _mock.file.size(index),
  },
  name: _mock.file.imageName(index),
  uploadAt: _mock.time(index).toISOString(),
  url: `https://picsum.photos/800/600?random=${index + 1}`,
}));
