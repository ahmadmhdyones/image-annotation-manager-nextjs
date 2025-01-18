import { imageAPI } from '@/helpers/api/resources/image';

import ListContent from './list-content';

// ----------------------------------------------------------------------

export default async function ListContainer() {
  const images = await imageAPI.getMany();

  return <ListContent initialData={images} />;
}
