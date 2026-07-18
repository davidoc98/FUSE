import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { tokens } from '../design-system/tokens';

export interface AppIconProps {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: string;
  variant?: 'outline' | 'filled';
}

export const AppIcon: React.FC<AppIconProps> = ({ name, size = 24, color = tokens.colors['on-surface'], variant = 'outline' }) => {
  return (
    <Ionicons name={name} size={size} color={color} />
  );
};
