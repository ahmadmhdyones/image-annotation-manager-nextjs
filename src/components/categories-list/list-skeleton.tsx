import ListItemSkeleton from './list-item-skeleton';

// ----------------------------------------------------------------------

export default function ListSkeleton({ count = 5 }: { count?: number }) {
  return Array.from({ length: count }).map((_, index) => <ListItemSkeleton key={index} />);
}
