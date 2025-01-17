'use client';

import { z } from 'zod';
import MDEditor from '@uiw/react-md-editor';
import { useRouter } from 'next/navigation';
import { useState, useActionState } from 'react';

import { Alert, Stack } from '@mui/material';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';

import { ICategory } from '@/types/models/category.types';

import { paths } from '@/helpers/map-routes';
import { categoryAPI } from '@/helpers/api/resources/category';

import { formSchema } from './validation';

// ----------------------------------------------------------------------

export default function Form({ category }: { category?: ICategory | undefined }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [description, setDescription] = useState<string>(category?.description || '');
  const [name, setName] = useState<string>(category?.name || '');
  const [image, setImage] = useState<string>(category?.image || '');
  const router = useRouter();

  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        description: formData.get('description') as string,
        image: formData.get('image') as string,
        name: formData.get('name') as string,
      };

      await formSchema.parseAsync(formValues);

      if (category) {
        await categoryAPI.update(category.id, formValues);
      } else {
        await categoryAPI.create(formValues);
      }

      // TODO: Fix this. Should revalidate the page to clear cached data to not affect the react-query initial data from the server
      // revalidatePath('/', 'page');
      router.push(paths.dashboard.categories.root.to());

      return {
        ...prevState,
        error: '',
        status: 'SUCCESS',
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors } = error.flatten();

        setErrors(fieldErrors as unknown as Record<string, string>);

        return { ...prevState, error: 'Validation failed', status: 'ERROR' };
      }

      return {
        ...prevState,
        error: 'An unexpected error has occurred',
        status: 'ERROR',
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleSubmit, { error: '', status: 'INITIAL' });

  return (
    <Box
      action={formAction}
      component='form'
      noValidate
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

      {/* Name Field */}
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

      {/* Image URL Field */}
      <TextField
        error={!!errors.image}
        fullWidth
        helperText={errors.image}
        id='image'
        label='Image URL'
        name='image'
        onChange={e => setImage(e.target.value)}
        placeholder='https://example.com/image.jpg'
        value={image}
        variant='outlined'
      />

      {/* Description Field */}
      <Box data-color-mode='dark' sx={{ width: '100%' }}>
        <Typography
          gutterBottom
          sx={{ color: errors.description ? 'error.main' : 'text.primary', fontWeight: 500 }}
          variant='subtitle1'
        >
          Description
        </Typography>
        <MDEditor
          height={300}
          id='description'
          onChange={value => setDescription(value as string)}
          preview='edit'
          previewOptions={{ disallowedElements: ['style'] }}
          style={{
            border: errors.description ? '1px solid #d32f2f' : '1px solid #ccc',
            borderRadius: 8,
            overflow: 'hidden',
          }}
          textareaProps={{ placeholder: 'Describe your category...' }}
          value={description}
        />
        {errors.description && (
          <Typography color='error' sx={{ mt: 1 }} variant='body2'>
            {errors.description}
          </Typography>
        )}
        <input name='description' type='hidden' value={description} />
      </Box>

      {/* Submit Button */}
      <Stack alignItems='center' direction='row' justifyContent='center' spacing={2}>
        <Button color='primary' disabled={isPending} fullWidth sx={{ height: 50 }} type='submit' variant='contained'>
          {isPending ? <CircularProgress size={24} /> : category ? 'Update' : 'Create'}
        </Button>
      </Stack>

      {/* Error or Success Messages */}
      {state.error && (
        <Alert severity='error' sx={{ mt: 2 }}>
          {state.error}
        </Alert>
      )}
    </Box>
  );
}
