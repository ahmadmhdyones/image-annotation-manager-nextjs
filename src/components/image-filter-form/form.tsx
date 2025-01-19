'use client';

import { Clear, Search } from '@mui/icons-material';
import { Box, Chip, Stack, Button, TextField, IconButton, Autocomplete, InputAdornment } from '@mui/material';

import { _imageFormats, _imageResolutions } from '@/__mock__/assets';

import { useImageFilters } from './hooks/use-image-filters';

// ----------------------------------------------------------------------

const FORMAT_OPTIONS = _imageFormats;
const RESOLUTION_OPTIONS = _imageResolutions;

export default function Form() {
  const { filters, handleChange, handleReset } = useImageFilters();

  return (
    <Box sx={{ mb: 3 }}>
      <Stack spacing={2}>
        <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1}>
          <TextField
            fullWidth
            InputProps={{
              endAdornment: filters.name ? (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={() => handleChange({ name: '' })} size='small'>
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ) : null,
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
              sx: { pr: 0.5 },
            }}
            onChange={e => handleChange({ name: e.target.value })}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                handleChange(filters);
              }
            }}
            placeholder='Search images...'
            size='medium'
            sx={{ '& .MuiInputBase-root': { height: 40 } }}
            value={filters.name}
          />
          <Button
            onClick={() => handleChange(filters)}
            sx={{ height: 40, px: 3, width: { sm: 'auto', xs: '100%' } }}
            variant='contained'
          >
            Search
          </Button>
          <Button
            onClick={handleReset}
            sx={{ height: 40, px: 3, width: { sm: 'auto', xs: '100%' } }}
            variant='outlined'
          >
            Reset
          </Button>
        </Stack>

        <Stack direction={{ sm: 'row', xs: 'column' }} spacing={2}>
          <Autocomplete
            onChange={(_, newValue) => handleChange({ format: newValue })}
            options={FORMAT_OPTIONS}
            renderInput={params => <TextField {...params} label='Format' placeholder='Select formats' />}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} key={option} size='small' />
              ))
            }
            slotProps={{ clearIndicator: { sx: { mr: 0.5 } } }}
            sx={{ width: { sm: 200, xs: '100%' } }}
            value={filters.format || null}
          />

          <Autocomplete
            onChange={(_, newValue) => handleChange({ resolution: newValue })}
            options={RESOLUTION_OPTIONS}
            renderInput={params => <TextField {...params} label='Resolution' placeholder='Select resolutions' />}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} key={option} size='small' />
              ))
            }
            slotProps={{ clearIndicator: { sx: { mr: 0.5 } } }}
            sx={{ width: { sm: 200, xs: '100%' } }}
            value={filters.resolution || null}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
