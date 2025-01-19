import MDEditor from '@uiw/react-md-editor';

import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface DescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function DescriptionField({ error, onChange, value }: DescriptionFieldProps) {
  return (
    <Box data-color-mode='dark' sx={{ width: '100%' }}>
      <Typography
        gutterBottom
        sx={{ color: error ? 'error.main' : 'text.primary', fontWeight: 500 }}
        variant='subtitle1'
      >
        Description
      </Typography>
      <MDEditor
        height={300}
        id='description'
        onChange={value => onChange(value as string)}
        preview='edit'
        previewOptions={{ disallowedElements: ['style'] }}
        style={{
          border: error ? '1px solid #d32f2f' : '1px solid #ccc',
          borderRadius: 8,
          overflow: 'hidden',
        }}
        textareaProps={{ placeholder: 'Describe your category...' }}
        value={value}
      />
      {error && (
        <Typography color='error' sx={{ mt: 1 }} variant='body2'>
          {error}
        </Typography>
      )}
      <input name='description' type='hidden' value={value} />
    </Box>
  );
}
