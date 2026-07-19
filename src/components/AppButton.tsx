import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { tokens } from '../design-system/tokens';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const AppButton: React.FC<AppButtonProps> = ({ title, variant = 'primary', style, ...props }) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary && styles.primaryButton,
        isSecondary && styles.secondaryButton,
        style,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <Text
        style={[
          styles.text,
          isPrimary && styles.primaryText,
          isSecondary && styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: tokens.spacing.unit * 3,
    paddingHorizontal: tokens.spacing.unit * 6,
    borderRadius: tokens.rounded.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: tokens.colors['primary-container'],
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: tokens.colors.outline,
  },
  text: {
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: tokens.typography.bodyMd.fontSize,
    fontWeight: tokens.typography.bodyMd.fontWeight as any,
  },
  primaryText: {
    color: tokens.colors['on-primary-container'],
  },
  secondaryText: {
    color: tokens.colors['on-surface'],
  },
});
