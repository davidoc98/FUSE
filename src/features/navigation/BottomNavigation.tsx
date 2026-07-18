import React from 'react';
import { BlurView } from 'expo-blur';
import { View, Platform, StyleSheet } from 'react-native';
import { tokens } from '../../design-system/tokens';

export const BottomNavigation = () => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        tint="dark"
        intensity={80}
        style={{
          ...StyleSheet.absoluteFill,
          borderTopColor: 'rgba(255,255,255,0.1)',
          borderTopWidth: 1,
        } as any}
      />
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors['surface-container'], borderTopColor: 'rgba(255,255,255,0.1)', borderTopWidth: 1 }} />
  );
};
