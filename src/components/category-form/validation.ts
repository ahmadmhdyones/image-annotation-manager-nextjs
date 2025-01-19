import { z } from 'zod';

// ----------------------------------------------------------------------

export const formSchema = z.object({
  description: z.string().min(3).max(500).optional(),
  image: z
    .string()
    .url()
    .refine(
      async url => {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          const contentType = res.headers.get('content-type');
          return contentType?.startsWith('image/');
        } catch {
          return false;
        }
      },
      { message: 'Invalid image URL' }
    ),
  name: z.string().min(3).max(100),
});
