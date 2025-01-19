import { List } from '@mui/material';

import { categoryAPI } from '@/helpers/api/resources/category';

import ListContent from './list-content';

// ----------------------------------------------------------------------

export default async function ListContainer() {
  const categories = await categoryAPI.getMany(); // Initial data from server (on server-side rendering)

  return (
    <List sx={{ padding: { md: 1, xs: 0 } }}>
      <ListContent initialData={categories} />
    </List>
  );
}
