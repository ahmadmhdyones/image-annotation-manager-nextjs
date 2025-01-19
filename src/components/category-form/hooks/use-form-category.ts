import { z } from 'zod';
import { useState } from 'react';

import { ICategory } from '@/types/models/category.types';

import { formSchema } from '../validation';

// ----------------------------------------------------------------------

export function useCategoryForm(initialCategory?: ICategory) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [name, setName] = useState<string>(initialCategory?.name || '');
  const [description, setDescription] = useState<string>(initialCategory?.description || '');
  const [image, setImage] = useState<string>(initialCategory?.image || '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = async (formValues: { description: string; image: string; name: string }) => {
    try {
      await formSchema.parseAsync(formValues);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const { fieldErrors } = error.flatten();
        setErrors(fieldErrors as unknown as Record<string, string>);
      }
      return false;
    }
  };

  return {
    formState: { description, errors, image, isSubmitting, name },
    setters: { setDescription, setImage, setIsSubmitting, setName },
    validateForm,
  };
}
