'use client';

import { Clear, Search } from '@mui/icons-material';
import { Box, Chip, Stack, Button, TextField, IconButton, Autocomplete, InputAdornment } from '@mui/material';

import { _imageFormats, _imageResolutions } from '@/__mock__/assets';

import { useImageFilters } from './hooks/use-image-filters';

// ----------------------------------------------------------------------

const FORMAT_OPTIONS = _imageFormats;
const RESOLUTION_OPTIONS = _imageResolutions;

export default function Form() {
  const { format, handleChange, name, resolution, setFormat, setName, setResolution } = useImageFilters();

  return (
    <Box sx={{ mb: 3 }}>
      <Stack spacing={2}>
        <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1}>
          <TextField
            fullWidth
            InputProps={{
              endAdornment: name ? (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={() => {
                      setName('');
                      handleChange('', format, resolution);
                    }}
                    size='small'
                  >
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
            onChange={e => {
              setName(e.target.value);
              handleChange(e.target.value, format, resolution);
            }}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                handleChange(name, format, resolution);
              }
            }}
            placeholder='Search images...'
            size='medium'
            sx={{ '& .MuiInputBase-root': { height: 40 } }}
            value={name}
          />
          <Button
            onClick={() => handleChange(name, format, resolution)}
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
              handleChange(name, newValue, resolution);
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
              handleChange(name, format, newValue);
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
