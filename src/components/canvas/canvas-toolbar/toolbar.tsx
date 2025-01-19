import { Dispatch, SetStateAction } from 'react';

import { Box, Paper, Tooltip, TextField } from '@mui/material';

import { CanvasTools } from '@/types/canvas-tools.enum';
import { CanvasToolbarTool } from '@/types/canvas.types';

import { ToolButton, ColorButton, ToolDivider } from './tool-buttons';

// ----------------------------------------------------------------------

interface Props {
  selected: CanvasTools;
  tools: CanvasToolbarTool[];
  onSelect: Dispatch<SetStateAction<CanvasTools>>;
  colorPicker: { previewColor: string; onColorChange: (color: string) => void } | undefined;
}

export default function Toolbar({ colorPicker, onSelect, selected, tools }: Props) {
  return (
    <Box sx={{ bottom: 32, left: '50%', position: 'absolute', transform: 'translateX(-50%)', zIndex: 20 }}>
      <Paper
        elevation={3}
        sx={{ backgroundColor: 'background.paper', borderRadius: 3, display: 'flex', gap: 1, px: 2, py: 1 }}
      >
        {tools.map((item, index) =>
          item === null ? (
            <ToolDivider key={`divider-${index}`} />
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

        {colorPicker && (
          <>
            <ToolDivider />

            <Tooltip arrow enterDelay={500} placement='top' title='Select Color'>
              <Box sx={{ position: 'relative' }}>
                <ColorButton color={colorPicker.previewColor as any} size='small' />

                <TextField
                  onChange={e => colorPicker.onColorChange(e.target.value)}
                  style={{
                    cursor: 'pointer',
                    height: '100%',
                    left: 0,
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                  }}
                  type='color'
                  value={colorPicker.previewColor}
                />
              </Box>
            </Tooltip>
          </>
        )}
      </Paper>
    </Box>
  );
}
