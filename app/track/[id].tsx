import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { TrackScreen } from '../../src/features/tracks/TrackScreen';
import { tokens } from '../../src/design-system/tokens';

export default function TrackRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <TrackScreen trackId={id as string} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.colors.background },
});
