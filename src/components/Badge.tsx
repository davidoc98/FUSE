import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../design-system/tokens';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'proof';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default' }) => {
  return (
    <View style={[styles.container, variant === 'proof' && styles.proofContainer]}>
      <Text style={[styles.text, variant === 'proof' && styles.proofText]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: tokens.spacing.unit * 2,
    paddingVertical: tokens.spacing.unit,
    borderRadius: tokens.rounded.sm,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  proofContainer: {
    backgroundColor: tokens.colors['tertiary-container'],
  },
  text: {
    fontFamily: tokens.typography.labelCaps.fontFamily,
    fontSize: tokens.typography.labelCaps.fontSize,
    color: tokens.colors['on-surface'],
    textTransform: 'uppercase',
  },
  proofText: {
    color: tokens.colors['on-tertiary-container'],
  },
});
