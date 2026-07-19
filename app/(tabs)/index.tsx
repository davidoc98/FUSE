import React from 'react';
import { View, StyleSheet } from 'react-native';
import { tokens } from '../../src/design-system/tokens';
import { PulseFeed } from '../../src/features/feed/PulseFeed';

export default function PulseScreen() {
  return (
    <View style={styles.container}>
      <PulseFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
});
