import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Category } from '@mui/icons-material';
import { Tooltip, IconButton, CircularProgress } from '@mui/material';

import { queryKeys } from '@/helpers/react-query';
import { imageAPI } from '@/helpers/api/resources/image';

// ----------------------------------------------------------------------

interface Props {
  imageId: number;
  disabled?: boolean;
}

export default function AnnotationCountButton({ imageId }: Props) {
  const queryClient = useQueryClient();
  const {
    data: count,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    enabled: false,
    queryFn: async () => await imageAPI.getAnnotationsCount(imageId),
    queryKey: [queryKeys.imageAnnotationsCount(imageId)],
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: [queryKeys.imageAnnotationsCount(imageId)] });
    };
  }, [queryClient, imageId]);

  return (
    <Tooltip
      title={
        isFetching ? (
          <CircularProgress color='inherit' size={16} />
        ) : isError ? (
          'Something went wrong!'
        ) : (
          `${count ?? 0} annotations`
        )
      }
    >
      <IconButton
        disabled={false}
        onClick={() => refetch()}
        onMouseEnter={() => refetch()}
        size='small'
        sx={{ marginTop: 'auto' }}
      >
        <Category />
      </IconButton>
    </Tooltip>
  );
}
