import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { tokens } from '../design-system/tokens';

interface AvatarProps {
  url: string;
  size?: number;
  hasBorder?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ url, size = 40, hasBorder = false }) => {
  return (
    <View style={[hasBorder && styles.borderContainer, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image source={{ uri: url }} style={{ width: '100%', height: '100%', borderRadius: size / 2 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 2,
    borderColor: tokens.colors.primary,
    padding: 2,
  },
});
