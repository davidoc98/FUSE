import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../design-system/tokens';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';

interface AlgorithmSliderProps {
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
  onValueChange?: (val: number) => void;
}

export const AlgorithmSlider: React.FC<AlgorithmSliderProps> = ({ label, value, leftLabel, rightLabel, onValueChange }) => {
  const width = 300; // Mock width
  const translateX = useSharedValue(value * width);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      let newX = translateX.value + event.translationX;
      if (newX < 0) newX = 0;
      if (newX > width) newX = width;

      if (onValueChange) {
        translateX.value = newX;
        runOnJS(onValueChange)(newX / width);
      }
    });

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedFillStyle = useAnimatedStyle(() => ({
    width: translateX.value,
  }));

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderLabel}>{label}</Text>

      <GestureDetector gesture={pan}>
        <View style={[styles.sliderTrack, { width }]}>
          <Animated.View style={[styles.sliderFill, animatedFillStyle]} />
          <Animated.View style={[styles.sliderThumb, animatedThumbStyle]} />
        </View>
      </GestureDetector>

      <View style={styles.sliderLabels}>
        <Text style={styles.sliderSideLabel}>{leftLabel}</Text>
        <Text style={styles.sliderSideLabel}>{rightLabel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginBottom: tokens.spacing.stackMd,
    alignItems: 'center', // Center content since track has fixed width
  },
  sliderLabel: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: tokens.typography.bodyMd.fontSize,
    marginBottom: tokens.spacing.stackSm,
    alignSelf: 'flex-start',
  },
  sliderTrack: {
    height: 12,
    backgroundColor: tokens.colors['surface-container-highest'],
    borderRadius: 6,
    marginBottom: tokens.spacing.unit * 2,
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: tokens.colors.primary,
    borderRadius: 6,
    position: 'absolute',
    left: 0,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: tokens.colors.primary,
    position: 'absolute',
    left: -12, // Offset to center thumb
    borderWidth: 4,
    borderColor: tokens.colors.background,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  sliderSideLabel: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.labelCaps.fontFamily,
    fontSize: tokens.typography.labelCaps.fontSize,
    textTransform: 'uppercase',
    letterSpacing: tokens.typography.labelCaps.letterSpacing,
  },
});
