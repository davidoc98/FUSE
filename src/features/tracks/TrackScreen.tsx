import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { tokens } from '../../design-system/tokens';
import { mockTracks } from '../../data/mockData';
import { Avatar } from '../../components/Avatar';
import { Badge } from '../../components/Badge';
import { AppIcon } from '../../components/AppIcon';
import { TrackEpisodeCard } from './TrackEpisodeCard';
import { ProgressTimeline } from './ProgressTimeline';
import { useResponsive } from '../../hooks/useResponsive';

interface TrackScreenProps {
  trackId: string;
}

export const TrackScreen: React.FC<TrackScreenProps> = ({ trackId }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const track = mockTracks[trackId];
  const { isDesktop } = useResponsive();

  if (!track) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>Трек не найден</Text>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Вернуться</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDesktop && { paddingTop: tokens.spacing.stackLg }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        <View style={styles.contentWrapper}>
            {/* Cover */}
            <View style={[styles.coverContainer, isDesktop && { borderRadius: tokens.rounded.xl }]}>
            <Image source={{ uri: track.coverUrl }} style={styles.coverImage} />
            <View style={[styles.coverOverlay, StyleSheet.absoluteFillObject]} />
            <Pressable
                onPress={() => router.back()}
                style={[styles.headerBackButton, { top: (isDesktop ? tokens.spacing.unit * 2 : insets.top + tokens.spacing.unit * 2) }]}
            >
                <AppIcon name="arrow-back" size={24} color="white" />
            </Pressable>
            </View>

            {/* Info */}
            <View style={styles.infoContainer}>
            <View style={styles.tagsRow}>
                {track.tags.map(tag => (
                    <Badge key={tag} label={tag} variant="proof" />
                ))}
            </View>
            <Text style={styles.title}>{track.title}</Text>
            <View style={styles.authorRow}>
                <Avatar url={track.author.avatarUrl} size={32} />
                <Text style={styles.authorName}>{track.author.username}</Text>
            </View>
            <Text style={styles.description}>{track.description}</Text>

            <ProgressTimeline progress={track.progress} />

            {/* Tabs */}
            <View style={styles.tabsRow}>
                <Text style={[styles.tabText, styles.tabTextActive]}>Выпуски</Text>
                <Text style={styles.tabText}>Материалы</Text>
                <Text style={styles.tabText}>Обсуждение</Text>
                <Text style={styles.tabText}>О проекте</Text>
            </View>

            {/* Episodes List */}
            <View style={styles.episodesList}>
                {track.episodes.map((ep, index) => (
                    <TrackEpisodeCard key={ep.id} episode={ep as any} index={index} />
                ))}
            </View>
            </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  contentWrapper: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  errorText: {
    color: tokens.colors.error,
    fontSize: tokens.typography.bodyLg.fontSize,
    fontFamily: tokens.typography.bodyLg.fontFamily,
  },
  backButton: {
    marginTop: tokens.spacing.stackMd,
    padding: tokens.spacing.unit * 3,
    backgroundColor: tokens.colors['surface-container'],
    borderRadius: tokens.rounded.default,
  },
  backButtonText: {
    color: tokens.colors['on-surface'],
  },
  coverContainer: {
    width: '100%',
    height: 320,
    position: 'relative',
    borderBottomLeftRadius: tokens.rounded.xl,
    borderBottomRightRadius: tokens.rounded.xl,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headerBackButton: {
    position: 'absolute',
    left: tokens.spacing.containerMarginMobile,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: tokens.spacing.containerMarginMobile,
    marginTop: tokens.spacing.stackSm,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: tokens.spacing.unit * 2,
    marginBottom: tokens.spacing.stackSm,
  },
  title: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.headlineXl.fontFamily,
    fontSize: tokens.typography.headlineXlMobile.fontSize,
    fontWeight: tokens.typography.headlineXlMobile.fontWeight as any,
    marginBottom: tokens.spacing.stackSm,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.unit * 2,
    marginBottom: tokens.spacing.stackMd,
  },
  authorName: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: tokens.typography.bodyMd.fontSize,
  },
  description: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: tokens.typography.bodyMd.fontSize,
    lineHeight: tokens.typography.bodyMd.lineHeight,
    marginBottom: tokens.spacing.stackLg,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors['surface-container-highest'],
    marginBottom: tokens.spacing.stackMd,
  },
  tabText: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: tokens.typography.bodyMd.fontSize,
    paddingVertical: tokens.spacing.unit * 3,
    marginRight: tokens.spacing.stackMd,
  },
  tabTextActive: {
    color: tokens.colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: tokens.colors.primary,
    fontWeight: '600',
  },
  episodesList: {
    gap: tokens.spacing.unit * 4,
  },
});
