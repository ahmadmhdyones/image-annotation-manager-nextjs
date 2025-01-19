'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { Alert, Stack } from '@mui/material';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';

import { ICategory } from '@/types/models/category.types';

import { RouteParams } from '@/helpers/map-params';

import FormSkeleton from './form-skeleton';
import useGetCategory from './hooks/use-get-category';
import { DescriptionField } from './field-description';
import useCreateCategory from './hooks/use-create-category';
import useUpdateCategory from './hooks/use-update-category';
import { useCategoryForm } from './hooks/use-form-category';

// ----------------------------------------------------------------------

export default function Form({ category }: { category?: ICategory | undefined }) {
  const params = useParams<{ [RouteParams.ID]: string }>();
  const isEdit = !!params.id;

  const {
    formState: { description, errors, image, isSubmitting, name },
    setters: { setDescription, setImage, setIsSubmitting, setName },
    validateForm,
  } = useCategoryForm(category);

  const { isPending: isCreating, mutateAsync: createCategory } = useCreateCategory();
  const { isPending: isUpdating, mutateAsync: updateCategory } = useUpdateCategory(category!);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formValues = { description, image, name };
    setIsSubmitting(true);

    try {
      const isValid = await validateForm(formValues);
      if (!isValid) return;

      if (isEdit) {
        await updateCategory(formValues);
      } else {
        await createCategory(formValues);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabled = isSubmitting || isCreating || isUpdating;

  const {
    data: fetchedCategory,
    isFetched: isFetchedCategory,
    isLoading: isLoadingCategory,
    isStale,
  } = useGetCategory(Number(params.id), {
    initialData: category,
  });

  useEffect(() => {
    if (isFetchedCategory && fetchedCategory) {
      setName(fetchedCategory.name);
      setDescription(fetchedCategory.description);
      setImage(fetchedCategory.image);
    }
  }, [fetchedCategory, isFetchedCategory, setName, setDescription, setImage]);

  if (isEdit && isLoadingCategory && (isStale || !category)) {
    return <FormSkeleton />;
  }

  return (
    <Box
      component='form'
      noValidate
      onSubmit={handleSubmit}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        margin: '0 auto',
        mt: 4,
        p: 2,
        width: { md: 600, xs: '100%' },
      }}
    >
      <Typography sx={{ mb: 2, textAlign: 'center' }} variant='h5'>
        {category ? 'Edit Category' : 'Create a New Category'}
      </Typography>

      <TextField
        error={!!errors.name}
        fullWidth
        helperText={errors.name}
        id='name'
        label='Category Name'
        name='name'
        onChange={e => setName(e.target.value)}
        placeholder='Tech, Health, Education...'
        required
        value={name}
        variant='outlined'
      />

      <TextField
        error={!!errors.image}
        fullWidth
        helperText={errors.image}
        id='image'
        label='Image URL'
        name='image'
        onChange={e => setImage(e.target.value)}
        placeholder='https://example.com/image.jpg'
        required
        value={image}
        variant='outlined'
      />

      <DescriptionField error={errors.description} onChange={setDescription} value={description} />

      <Stack alignItems='center' direction='row' justifyContent='center' spacing={2}>
        <Button color='primary' disabled={disabled} fullWidth sx={{ height: 50 }} type='submit' variant='contained'>
          {disabled ? <CircularProgress size={24} /> : isEdit ? 'Update' : 'Create'}
        </Button>
      </Stack>

      {errors.submit && (
        <Alert severity='error' sx={{ mt: 2 }}>
          {errors.submit}
        </Alert>
      )}
    </Box>
  );
}
