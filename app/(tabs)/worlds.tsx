import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../../src/design-system/tokens';

export default function WorldsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Миры (Заглушка)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: tokens.colors.background },
  text: { color: tokens.colors['on-surface'], fontFamily: tokens.typography.headlineMd.fontFamily, fontSize: 24 },
});
