import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { tokens } from '../../design-system/tokens';
import { AppIcon } from '../../components/AppIcon';

interface Episode {
  id: string;
  title: string;
  duration: number; // in seconds
  status: 'watched' | 'current' | 'future';
  thumbnailUrl: string;
}

interface TrackEpisodeCardProps {
  episode: Episode;
  index: number;
  onPress?: () => void;
}

export const TrackEpisodeCard: React.FC<TrackEpisodeCardProps> = ({ episode, index, onPress }) => {
  return (
    <Pressable style={styles.episodeCard} onPress={onPress}>
      <Image source={{ uri: episode.thumbnailUrl }} style={styles.epThumbnail} />
      <View style={styles.epInfo}>
        <Text style={styles.epTitle}>{index + 1}. {episode.title}</Text>
        <Text style={styles.epDuration}>
          {Math.round(episode.duration / 60)} мин •{' '}
          {episode.status === 'watched' ? 'Просмотрено' : episode.status === 'current' ? 'Текущий' : 'Впереди'}
        </Text>
      </View>
      {episode.status === 'watched' && <AppIcon name="checkmark-circle" size={24} color={tokens.colors.primary} />}
      {episode.status === 'current' && <AppIcon name="play-circle" size={24} color={tokens.colors.primary} />}
      {episode.status === 'future' && <AppIcon name="lock-closed" size={20} color={tokens.colors['on-surface-variant']} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  episodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors['surface-container'],
    borderRadius: tokens.rounded.md,
    padding: tokens.spacing.unit * 2,
  },
  epThumbnail: {
    width: 90,
    height: 68,
    borderRadius: tokens.rounded.sm,
    marginRight: tokens.spacing.unit * 3,
  },
  epInfo: {
    flex: 1,
  },
  epTitle: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontWeight: '600',
    fontSize: tokens.typography.bodyMd.fontSize,
    marginBottom: tokens.spacing.unit,
  },
  epDuration: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.technicalData.fontFamily,
    fontSize: tokens.typography.technicalData.fontSize,
  }
});
