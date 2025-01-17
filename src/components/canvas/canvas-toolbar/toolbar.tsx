import { Dispatch, SetStateAction } from 'react';

import { Box, Paper, Tooltip } from '@mui/material';

import { CanvasTools } from '@/types/canvas-tools.enum';
import { CanvasToolbarTool } from '@/types/canvas.types';

import ToolButton from './tool-button';

// ----------------------------------------------------------------------

interface Props {
  selected: CanvasTools;
  tools: CanvasToolbarTool[];
  onSelect: Dispatch<SetStateAction<CanvasTools>>;
}

export default function Toolbar({ onSelect, selected, tools }: Props) {
  return (
    <Box
      sx={{
        bottom: 32,
        left: '50%',
        position: 'absolute',
        transform: 'translateX(-50%)',
        zIndex: 20,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 3,
          display: 'flex',
          gap: 1,
          px: 2,
          py: 1,
        }}
      >
        {tools.map((item, index) =>
          item === null ? (
            <Box key={`divider-${index}`} sx={{ borderColor: 'divider', borderRight: 1, mx: 1, width: 1 }} />
          ) : (
            <Tooltip arrow enterDelay={500} enterNextDelay={500} key={item.tool} placement='top' title={item.label}>
              <ToolButton
                isSelected={selected === item.tool}
                onClick={() => onSelect(item.tool)}
                size='small'
                {...item}
              >
                {item.icon}
              </ToolButton>
            </Tooltip>
          )
        )}
      </Paper>
    </Box>
  );
}
