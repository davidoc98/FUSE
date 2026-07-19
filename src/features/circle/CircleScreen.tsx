import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Image, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens } from '../../design-system/tokens';
import { useStore } from '../../store/useStore';
import { Video } from '../../types';
import { Avatar } from '../../components/Avatar';
import { AppIcon } from '../../components/AppIcon';
import { useRouter } from 'expo-router';

const FILTERS = ['Всё', 'Авторы', 'Миры', 'Tracks', 'Эфиры', 'Близкие', 'Непросмотренное'];

export const CircleScreen = () => {
  const insets = useSafeAreaInsets();
  const circleVideos = useStore((state) => state.circleVideos);
  const [activeFilter, setActiveFilter] = useState('Всё');
  const router = useRouter();

  const renderFilter = ({ item }: { item: string }) => (
    <Pressable
      style={[styles.filterChip, activeFilter === item && styles.filterChipActive]}
      onPress={() => setActiveFilter(item)}
    >
      <Text style={[styles.filterText, activeFilter === item && styles.filterTextActive]}>{item}</Text>
    </Pressable>
  );

  const renderItem = ({ item }: { item: Video }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Avatar url={item.author.avatarUrl} size={40} />
        <View style={styles.postAuthorInfo}>
          <Text style={styles.postAuthorName}>{item.author.username}</Text>
          <Text style={styles.postTime}>Только что</Text>
        </View>
        <AppIcon name="ellipsis-horizontal" size={20} color={tokens.colors['on-surface-variant']} />
      </View>
      <Text style={styles.postDescription} numberOfLines={2}>{item.description}</Text>

      {/* Thumbnail placeholder since we can't auto-play all videos in list easily without complex setup */}
      <Pressable style={styles.videoContainer} onPress={() => {/* would navigate to detail or play inline */}}>
         <View style={styles.videoPlaceholder}>
            <AppIcon name="play-circle" size={48} color="white" />
         </View>
         {item.trackId && (
            <View style={styles.trackBadge}>
                <AppIcon name="layers-outline" size={12} color="white" />
                <Text style={styles.trackBadgeText}>Track</Text>
            </View>
         )}
      </Pressable>

      <View style={styles.postActions}>
         <View style={styles.actionGroup}>
            <AppIcon name="heart-outline" size={24} color={tokens.colors['on-surface']} />
            <Text style={styles.actionCount}>{item.likesCount}</Text>
         </View>
         <View style={styles.actionGroup}>
            <AppIcon name="chatbubble-outline" size={24} color={tokens.colors['on-surface']} />
            <Text style={styles.actionCount}>{item.commentsCount}</Text>
         </View>
         <View style={styles.actionGroup}>
            <AppIcon name="share-outline" size={24} color={tokens.colors['on-surface']} />
         </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Круг</Text>
        <AppIcon name="search-outline" size={24} color={tokens.colors['on-surface']} />
      </View>

      <View style={styles.filtersWrapper}>
        <FlatList
            data={FILTERS}
            renderItem={renderFilter}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
        />
      </View>

      <FlatList
        data={circleVideos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
            <View style={styles.footerMsg}>
                <Text style={styles.footerText}>Вы просмотрели все новые публикации.</Text>
                <Pressable onPress={() => router.push({ pathname: '/' } as any)} style={styles.footerBtn}>
                    <Text style={styles.footerBtnText}>Вернуться в Пульс</Text>
                </Pressable>
            </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.containerMarginMobile,
    paddingBottom: tokens.spacing.stackSm,
  },
  headerTitle: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.headlineMd.fontFamily,
    fontSize: tokens.typography.headlineMd.fontSize,
    fontWeight: tokens.typography.headlineMd.fontWeight as any,
  },
  filtersWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors['surface-container-highest'],
  },
  filtersContainer: {
    paddingHorizontal: tokens.spacing.containerMarginMobile,
    paddingVertical: tokens.spacing.stackSm,
    gap: tokens.spacing.unit * 2,
  },
  filterChip: {
    paddingHorizontal: tokens.spacing.unit * 4,
    paddingVertical: tokens.spacing.unit * 2,
    borderRadius: tokens.rounded.full,
    backgroundColor: tokens.colors['surface-container'],
  },
  filterChipActive: {
    backgroundColor: tokens.colors['on-surface'],
  },
  filterText: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 14,
  },
  filterTextActive: {
    color: tokens.colors.background,
    fontWeight: '600',
  },
  listContainer: {
    padding: tokens.spacing.containerMarginMobile,
    paddingBottom: 120, // space for bottom nav
  },
  postCard: {
    marginBottom: tokens.spacing.stackLg,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing.stackSm,
  },
  postAuthorInfo: {
    flex: 1,
    marginLeft: tokens.spacing.unit * 3,
  },
  postAuthorName: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontWeight: '600',
    fontSize: 16,
  },
  postTime: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 12,
  },
  postDescription: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: tokens.typography.bodyMd.fontSize,
    lineHeight: tokens.typography.bodyMd.lineHeight,
    marginBottom: tokens.spacing.stackSm,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 3/4,
    backgroundColor: tokens.colors['surface-container-highest'],
    borderRadius: tokens.rounded.lg,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackBadge: {
    position: 'absolute',
    bottom: tokens.spacing.unit * 3,
    left: tokens.spacing.unit * 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: tokens.spacing.unit * 2,
    paddingVertical: tokens.spacing.unit,
    borderRadius: tokens.rounded.sm,
    gap: 4,
  },
  trackBadgeText: {
    color: 'white',
    fontFamily: tokens.typography.labelCaps.fontFamily,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: tokens.spacing.stackSm,
    gap: tokens.spacing.stackLg,
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.unit * 1.5,
  },
  actionCount: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.technicalData.fontFamily,
    fontSize: 14,
  },
  footerMsg: {
    alignItems: 'center',
    paddingVertical: tokens.spacing.stackLg,
    borderTopWidth: 1,
    borderTopColor: tokens.colors['surface-container-highest'],
  },
  footerText: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: tokens.typography.bodyMd.fontSize,
    marginBottom: tokens.spacing.stackMd,
  },
  footerBtn: {
    paddingVertical: tokens.spacing.unit * 2,
    paddingHorizontal: tokens.spacing.unit * 4,
    borderRadius: tokens.rounded.full,
    borderWidth: 1,
    borderColor: tokens.colors.primary,
  },
  footerBtnText: {
    color: tokens.colors.primary,
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 14,
    fontWeight: '600',
  }
});
