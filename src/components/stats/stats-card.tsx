import React from 'react';

import { Box, Card, Avatar, Typography, CardContent } from '@mui/material';

import { cardStyle } from './styles';
import ClientStatsCardValue, { ClientStatsCardValueProps } from './client-stats-card-value';

// ----------------------------------------------------------------------

interface StatsCardProps extends ClientStatsCardValueProps {
  icon: React.ElementType;
  title: string;
}

export default function StatsCard({ icon: Icon, title, ...other }: StatsCardProps) {
  return (
    <Card component={'article'} sx={cardStyle}>
      <CardContent sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', padding: 2 }}>
        <Box>
          <Typography variant='h6'>{title}</Typography>

          <Typography variant='h4'>
            <ClientStatsCardValue {...other} />
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: 'primary.main', color: 'white', height: 56, width: 56 }}>
          <Icon />
        </Avatar>
      </CardContent>
    </Card>
  );
}
