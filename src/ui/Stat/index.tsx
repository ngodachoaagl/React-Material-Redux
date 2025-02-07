import * as React from 'react';
import { styled, useThemeProps } from '@mui/material/styles';

export interface StatProps {
  value: number | string;
  unit: string;
  variant?: 'outlined';
}

interface StatOwnerState extends StatProps {
}

const StatRoot = styled('div', {
  name: 'MuiStat',
  slot: 'root',
})<{ ownerState: StatOwnerState }>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(3, 4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  letterSpacing: '-0.025em',
  fontWeight: 600,
  variants: [
    {
      props: {
        variant: 'outlined',
      },
      style: {
        border: `2px solid ${theme.palette.divider}`,
        boxShadow: 'none',
      },
    },
  ],
}));

const StatValue = styled('div', {
  name: 'MuiStat',
  slot: 'value',
})<{ ownerState: StatOwnerState }>(({ theme }) => ({
  ...theme.typography.h3,
}));

const StatUnit = styled('div', {
  name: 'MuiStat',
  slot: 'unit',
})<{ ownerState: StatOwnerState }>(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  function Stat(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: 'MuiStat' });
    const { value, unit, variant, ...other } = props;

    const ownerState = { ...props, variant };

    return (
      <StatRoot ref={ref} ownerState={ownerState} {...other}>
        <StatValue ownerState={ownerState}>{value}</StatValue>
        <StatUnit ownerState={ownerState}>{unit}</StatUnit>
      </StatRoot>
    );
  },
);