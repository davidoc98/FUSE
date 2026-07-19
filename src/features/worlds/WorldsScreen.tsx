import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens } from '../../design-system/tokens';
import { useStore } from '../../store/useStore';
import { World } from '../../types';
import { AppIcon } from '../../components/AppIcon';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const WorldsScreen = () => {
  const insets = useSafeAreaInsets();
  const worlds = useStore((state) => state.worlds);

  const renderWorldCard = ({ item }: { item: World }) => (
    <Pressable style={styles.card}>
      <Image source={{ uri: item.coverUrl }} style={styles.cardImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.cardOverlay}
      />
      <View style={styles.cardContent}>
        <View style={styles.tagsRow}>
            <View style={styles.memberBadge}>
                <AppIcon name="people" size={12} color="white" />
                <Text style={styles.memberCount}>{item.membersCount}</Text>
            </View>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Миры</Text>
        <AppIcon name="add-circle-outline" size={28} color={tokens.colors['on-surface']} />
      </View>

      <FlatList
        data={worlds}
        renderItem={renderWorldCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
    paddingBottom: tokens.spacing.stackMd,
  },
  headerTitle: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.headlineMd.fontFamily,
    fontSize: tokens.typography.headlineMd.fontSize,
    fontWeight: tokens.typography.headlineMd.fontWeight as any,
  },
  listContainer: {
    padding: tokens.spacing.containerMarginMobile,
    paddingBottom: 120, // Bottom nav space
    gap: tokens.spacing.stackMd,
  },
  card: {
    width: '100%',
    height: 220,
    borderRadius: tokens.rounded.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: tokens.spacing.stackSm,
  },
  tagsRow: {
    flexDirection: 'row',
    marginBottom: tokens.spacing.unit * 2,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: tokens.rounded.sm,
    gap: 4,
  },
  memberCount: {
    color: 'white',
    fontFamily: tokens.typography.technicalData.fontFamily,
    fontSize: 12,
  },
  cardTitle: {
    color: 'white',
    fontFamily: tokens.typography.headlineMd.fontFamily,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDescription: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 14,
  }
});
