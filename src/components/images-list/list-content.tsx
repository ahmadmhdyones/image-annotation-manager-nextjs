'use client';

import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList, ListOnItemsRenderedProps } from 'react-window';

import { Box } from '@mui/material';
import { Collections } from '@mui/icons-material';

import EmptyContent from '@/components/ui/empty-content';
import ErrorContent from '@/components/ui/error-content';

import { IImage } from '@/types/models/image.types';

import Row from './list-row';
import ListSkeleton from './list-skeleton';
import useGetImages from './hooks/use-get-images';
import { useDeleteImage } from './hooks/use-delete-image';
import { useResponsiveGrid } from './hooks/use-responsive-grid';
import useInvalidateImages from './hooks/use-invalidate-images';

// ----------------------------------------------------------------------

/**
 * ListContent Component
 *
 * Implements an optimized responsive image grid:
 * - Combines react-window virtualization with infinite scroll
 * - Maintains responsive grid layout across all devices
 * - Dynamically calculates columns and row heights
 * - Uses AutoSizer for container-based responsive sizing
 *
 * Integration: react-window + react-virtualized-auto-sizer + custom responsive hooks
 */

export default function ListContent({ initialData }: { initialData?: IImage[] }) {
  const { getColumnCount, getPadding, getRowHeight } = useResponsiveGrid();
  const { data: images = [], error, isError, isFetching, isLoading, isRefetching } = useGetImages(initialData);
  const { error: deleteError, isError: isDeleteError, isSuccess: isDeleted, mutate: deleteMutation } = useDeleteImage();

  useInvalidateImages({ shouldInvalidate: isDeleted || isDeleteError });

  if (isError) return <ErrorContent error={error} />;
  if (isLoading || isFetching) return <ListSkeleton />;
  if (isDeleteError) return <ErrorContent error={deleteError} />;
  if (images.length === 0) {
    return (
      <EmptyContent description='Start by uploading your first image' icon={<Collections />} title='No Images Found' />
    );
  }

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', width: '100%' }}>
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = getColumnCount();
          const rowCount = Math.ceil(images.length / columnCount);
          const columnWidth = width / columnCount;
          const rowHeight = getRowHeight(columnWidth);

          return (
            <InfiniteLoader
              isItemLoaded={(index: number) => index < rowCount}
              itemCount={rowCount}
              loadMoreItems={() => Promise.resolve()}
            >
              {({
                onItemsRendered,
                ref,
              }: {
                onItemsRendered: (props: ListOnItemsRenderedProps) => void;
                ref: (node: any) => void;
              }) => (
                <FixedSizeList
                  height={height}
                  itemCount={rowCount}
                  itemData={{
                    columnCount,
                    images,
                    isRefetching,
                    onDelete: deleteMutation,
                  }}
                  itemSize={rowHeight}
                  onItemsRendered={onItemsRendered}
                  overscanCount={2}
                  ref={ref}
                  style={getPadding()}
                  useIsScrolling
                  width={width}
                >
                  {Row}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </Box>
  );
}
