'use client';

import { useState } from 'react';

import { Search } from '@mui/icons-material';
import { Box, Chip, Stack, Button, TextField, Autocomplete, InputAdornment } from '@mui/material';

import { _imageFormats, _imageResolutions } from '@/__mock__/assets';

// ----------------------------------------------------------------------

const FORMAT_OPTIONS = _imageFormats;
const RESOLUTION_OPTIONS = _imageResolutions;

export type ImageFilters = {
  search: string;
  format: string | undefined;
  resolution: string | undefined;
};

type Props = {
  onFiltersChange?: (filters: ImageFilters) => void;
};

export default function Form({ onFiltersChange = () => {} }: Props) {
  const [search, setSearch] = useState('');
  const [format, setFormat] = useState<string | null>(null);
  const [resolution, setResolution] = useState<string | null>(null);

  const handleChange = (newSearch: string, newFormat: string | null, newResolution: string | null) => {
    onFiltersChange({
      format: newFormat ?? undefined,
      resolution: newResolution ?? undefined,
      search: newSearch,
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Stack spacing={2}>
        <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1}>
          <TextField
            fullWidth
            onChange={e => {
              setSearch(e.target.value);
              handleChange(e.target.value, format, resolution);
            }}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                handleChange(search, format, resolution);
              }
            }}
            placeholder='Search images...'
            size='medium'
            slotProps={{
              input: {
                startAdornment: <InputAdornment position='start'>{<Search />}</InputAdornment>,
              },
            }}
            sx={{ '& .MuiInputBase-root': { height: 40 } }}
            value={search}
          />
          <Button
            onClick={() => handleChange(search, format, resolution)}
            sx={{
              height: 40,
              px: 3,
              width: { sm: 'auto', xs: '100%' },
            }}
            variant='contained'
          >
            Search
          </Button>
        </Stack>

        <Stack direction={{ sm: 'row', xs: 'column' }} spacing={2}>
          <Autocomplete
            onChange={(_, newValue) => {
              setFormat(newValue);
              handleChange(search, newValue, resolution);
            }}
            options={FORMAT_OPTIONS}
            renderInput={params => <TextField {...params} label='Format' placeholder='Select formats' />}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} key={option} size='small' />
              ))
            }
            slotProps={{ clearIndicator: { sx: { mr: 0.5 } } }}
            sx={{ width: { sm: 200, xs: '100%' } }}
            value={format}
          />

          <Autocomplete
            onChange={(_, newValue) => {
              setResolution(newValue);
              handleChange(search, format, newValue);
            }}
            options={RESOLUTION_OPTIONS}
            renderInput={params => <TextField {...params} label='Resolution' placeholder='Select resolutions' />}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} key={option} size='small' />
              ))
            }
            slotProps={{ clearIndicator: { sx: { mr: 0.5 } } }}
            sx={{ width: { sm: 200, xs: '100%' } }}
            value={resolution}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
