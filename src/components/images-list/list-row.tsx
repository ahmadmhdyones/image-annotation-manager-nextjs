import { memo, useRef, useState, useEffect } from 'react';

import { IImage } from '@/types/models/image.types';

import ListItem from './list-item';
import ListItemSkeleton from './list-item-skeleton';

// ----------------------------------------------------------------------

/**
 * VirtualizedRow Component
 *
 * Optimizes large image list performance:
 * - Uses virtualization to render only visible rows
 * - Shows skeletons during scroll to prevent layout shifts
 * - Delays actual content rendering for smooth scrolling
 * - Caches rendered state to avoid skeleton flicker on re-visit
 *
 * Note: Skeleton state is managed via hasRendered ref to prevent unnecessary re-renders
 */

interface RowProps {
  index: number;
  style: React.CSSProperties;
  isScrolling?: boolean;
  data: {
    images: IImage[];
    columnCount: number;
    onDelete: (id: number) => void;
    isRefetching: boolean;
  };
}

const Row = memo(({ data, index, isScrolling, style }: RowProps) => {
  const { columnCount, images, isRefetching, onDelete } = data;
  const startIndex = index * columnCount;
  const itemsInRow = images.slice(startIndex, startIndex + columnCount);
  const [shouldShowSkeleton, setShouldShowSkeleton] = useState(isScrolling);
  const hasRendered = useRef(false);

  useEffect(() => {
    if (!isScrolling) {
      const timer = setTimeout(() => {
        setShouldShowSkeleton(false);
        hasRendered.current = true;
      }, 100);
      return () => clearTimeout(timer);
    }
    setShouldShowSkeleton(isScrolling && !hasRendered.current);
  }, [isScrolling]);

  return (
    <div
      style={{
        ...style,
        display: 'flex',
        gap: '16px',
        padding: '16px',
      }}
    >
      {itemsInRow.map(image => (
        <div
          key={image.id}
          style={{
            flex: `0 0 calc(${100 / columnCount}% - ${((columnCount - 1) * 16) / columnCount}px)`,
          }}
        >
          {shouldShowSkeleton ? (
            <ListItemSkeleton />
          ) : (
            <ListItem image={image} isRefetching={isRefetching} onDelete={onDelete} />
          )}
        </div>
      ))}
    </div>
  );
});

Row.displayName = 'VirtualizedRow';

export default Row;
