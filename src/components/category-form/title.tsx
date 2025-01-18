'use client';

import { ICategory } from '@/types/models/category.types';

import useGetCategory from './hooks/use-get-category';

// ----------------------------------------------------------------------

export default function Title({ id }: { id: ICategory['id'] }) {
  const { data: category, isError, isLoading } = useGetCategory(id);

  if (isLoading) return 'Loading...';
  if (isError) return 'Something went wrong!';

  return category ? category.name : 'Category';
}
