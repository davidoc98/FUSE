import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { AppIcon } from './AppIcon';
import { tokens } from '../design-system/tokens';

interface VideoActionsProps {
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  onLike: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export const VideoActions: React.FC<VideoActionsProps> = ({
  likesCount,
  commentsCount,
  sharesCount,
  isLiked,
  onLike,
  onComment,
  onShare
}) => {
  return (
    <View style={styles.actionsRow}>
      <Pressable style={styles.actionButton} onPress={onLike}>
        <AppIcon name={isLiked ? "heart" : "heart-outline"} size={28} color={isLiked ? tokens.colors.primary : "white"} />
        <Text style={styles.actionText}>{likesCount}</Text>
      </Pressable>
      <Pressable style={styles.actionButton} onPress={onComment}>
        <AppIcon name="chatbubble-outline" size={28} color="white" />
        <Text style={styles.actionText}>{commentsCount}</Text>
      </Pressable>
      <Pressable style={styles.actionButton} onPress={onShare}>
        <AppIcon name="share-outline" size={28} color="white" />
        <Text style={styles.actionText}>{sharesCount}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: tokens.spacing.stackMd,
    gap: tokens.spacing.stackMd,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.unit,
  },
  actionText: {
    color: 'white',
    fontFamily: tokens.typography.technicalData.fontFamily,
    fontSize: tokens.typography.technicalData.fontSize,
  }
});
