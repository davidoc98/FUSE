import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../design-system/tokens';

interface ProgressTimelineProps {
  progress: number;
}

export const ProgressTimeline: React.FC<ProgressTimelineProps> = ({ progress }) => {
  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressLabel}>Прогресс {Math.round(progress * 100)}%</Text>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    marginBottom: tokens.spacing.stackLg,
    backgroundColor: tokens.colors['surface-container-high'],
    padding: tokens.spacing.unit * 4,
    borderRadius: tokens.rounded.md,
  },
  progressLabel: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.labelCaps.fontFamily,
    fontSize: tokens.typography.labelCaps.fontSize,
    textTransform: 'uppercase',
    marginBottom: tokens.spacing.unit * 2,
    letterSpacing: tokens.typography.labelCaps.letterSpacing,
  },
  progressTrack: {
    height: 6,
    backgroundColor: tokens.colors['surface-container-highest'],
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: tokens.colors.primary,
    borderRadius: 3,
  },
});
