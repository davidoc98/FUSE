import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens } from '../../design-system/tokens';
import { useStore } from '../../store/useStore';
import { Avatar } from '../../components/Avatar';
import { AppIcon } from '../../components/AppIcon';
import { Badge } from '../../components/Badge';
import { useRouter } from 'expo-router';
import { useResponsive } from '../../hooks/useResponsive';

const TABS = ['Главное', 'Tracks', 'Видео', 'Миры', 'Сохраненное'];

export const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const currentUser = useStore((state) => state.currentUser);
  const router = useRouter();
  const { isDesktop } = useResponsive();
  const [activeTab, setActiveTab] = useState('Главное');

  return (
    <View style={[styles.container, { paddingTop: isDesktop ? 0 : insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
            {/* Header Area */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>{currentUser.username}</Text>
                    <View style={styles.headerIcons}>
                        <Pressable onPress={() => router.push('/inbox')}>
                            <AppIcon name="chatbubble-ellipses-outline" size={24} color={tokens.colors['on-surface']} />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.profileInfo}>
                    <Avatar url={currentUser.avatarUrl} size={80} hasBorder />
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{currentUser.followingCount}</Text>
                            <Text style={styles.statLabel}>Подписок</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{(currentUser.followersCount || 0) > 1000 ? `${((currentUser.followersCount || 0) / 1000).toFixed(1)}k` : currentUser.followersCount}</Text>
                            <Text style={styles.statLabel}>Подписчиков</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>24</Text>
                            <Text style={styles.statLabel}>Публикации</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.bioSection}>
                    <View style={styles.nameRow}>
                        <Text style={styles.fullName}>{currentUser.username}</Text>
                        {currentUser.isVerified && <AppIcon name="checkmark-circle" size={16} color={tokens.colors.tertiary} />}
                    </View>
                    {currentUser.bio && <Text style={styles.bioText}>{currentUser.bio}</Text>}
                </View>

                <View style={styles.actionButtons}>
                    <Pressable style={styles.editBtn}>
                        <Text style={styles.editBtnText}>Редактировать профиль</Text>
                    </Pressable>
                    <Pressable style={styles.shareBtn}>
                        <Text style={styles.editBtnText}>Поделиться</Text>
                    </Pressable>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabsRow}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
                    {TABS.map(tab => (
                        <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tabBtn}>
                            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
                            {activeTab === tab && <View style={styles.tabIndicator} />}
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            {/* Tab Content Placeholder */}
            <View style={styles.tabContent}>
                {activeTab === 'Главное' && (
                    <View style={styles.emptyState}>
                        <AppIcon name="grid-outline" size={48} color={tokens.colors['surface-container-highest']} />
                        <Text style={styles.emptyStateText}>Здесь будут ваши главные работы</Text>
                    </View>
                )}
                {activeTab === 'Сохраненное' && (
                    <View style={styles.emptyState}>
                        <AppIcon name="bookmark-outline" size={48} color={tokens.colors['surface-container-highest']} />
                        <Text style={styles.emptyStateText}>Вы пока ничего не сохранили</Text>
                    </View>
                )}
                {['Tracks', 'Видео', 'Миры'].includes(activeTab) && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>Раздел в разработке</Text>
                    </View>
                )}
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
  scrollContent: {
    paddingBottom: 120,
    alignItems: 'center', // for desktop centering
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 800,
  },
  header: {
    paddingHorizontal: tokens.spacing.containerMarginMobile,
    paddingTop: tokens.spacing.stackLg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: tokens.spacing.stackMd,
    position: 'relative',
  },
  headerTitle: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.headlineMd.fontFamily,
    fontSize: 18,
    fontWeight: '600',
  },
  headerIcons: {
    position: 'absolute',
    right: 0,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing.stackMd,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: tokens.spacing.stackMd,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.headlineMd.fontFamily,
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 12,
    marginTop: 2,
  },
  bioSection: {
    marginBottom: tokens.spacing.stackMd,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.unit,
    marginBottom: tokens.spacing.unit,
  },
  fullName: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 16,
    fontWeight: '600',
  },
  bioText: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 14,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: tokens.spacing.unit * 2,
    marginBottom: tokens.spacing.stackLg,
  },
  editBtn: {
    flex: 1,
    backgroundColor: tokens.colors['surface-container-high'],
    paddingVertical: tokens.spacing.unit * 2,
    borderRadius: tokens.rounded.md,
    alignItems: 'center',
  },
  shareBtn: {
    flex: 1,
    backgroundColor: tokens.colors['surface-container-high'],
    paddingVertical: tokens.spacing.unit * 2,
    borderRadius: tokens.rounded.md,
    alignItems: 'center',
  },
  editBtnText: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 14,
    fontWeight: '600',
  },
  tabsRow: {
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors['surface-container-highest'],
  },
  tabsContainer: {
    paddingHorizontal: tokens.spacing.containerMarginMobile,
  },
  tabBtn: {
    paddingVertical: tokens.spacing.stackSm,
    marginRight: tokens.spacing.stackLg,
    position: 'relative',
  },
  tabText: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 15,
  },
  tabTextActive: {
    color: tokens.colors['on-surface'],
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: tokens.colors.primary,
  },
  tabContent: {
    paddingTop: tokens.spacing.stackLg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: tokens.spacing.stackLg * 2,
  },
  emptyStateText: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 15,
    marginTop: tokens.spacing.stackSm,
  }
});
