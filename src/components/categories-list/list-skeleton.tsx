import ListItemSkeleton from './list-item-skeleton';

// ----------------------------------------------------------------------

export default function ListSkeleton({ items = 5 }: { items?: number }) {
  return Array.from({ length: items }).map((_, index) => <ListItemSkeleton key={index} />);
}
