import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { tokens } from '../../design-system/tokens';
import { AppIcon } from '../../components/AppIcon';
import { Avatar } from '../../components/Avatar';
import { mockUsers } from '../../data/mockData';

// Mock dialogs for MVP
const MOCK_DIALOGS = [
  { id: 'chat1', user: mockUsers.user2, lastMessage: 'Крутой фундамент получается!', time: '12:30', unread: 2 },
  { id: 'chat2', user: { id: 'u3', username: 'Alex', avatarUrl: 'https://i.pravatar.cc/150?u=a3' }, lastMessage: 'Смотрел новый проект?', time: 'Вчера', unread: 0 },
];

export const InboxScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <Pressable style={styles.dialogRow} onPress={() => router.push({ pathname: '/chat/[id]' as any, params: { id: item.id, username: item.user.username } })}>
      <Avatar url={item.user.avatarUrl} size={50} />
      <View style={styles.dialogInfo}>
        <View style={styles.dialogHeader}>
          <Text style={styles.username}>{item.user.username}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <Text style={[styles.lastMsg, item.unread > 0 && styles.unreadMsg]} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <AppIcon name="arrow-back" size={24} color={tokens.colors['on-surface']} />
        </Pressable>
        <Text style={styles.headerTitle}>Сообщения</Text>
        <View style={styles.backBtn} />
      </View>

      <FlatList
        data={MOCK_DIALOGS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors['surface-container-highest'],
  },
  headerTitle: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.headlineMd.fontFamily,
    fontSize: 18,
    fontWeight: '600',
  },
  backBtn: {
    padding: tokens.spacing.unit,
    width: 40,
  },
  list: {
    padding: tokens.spacing.containerMarginMobile,
  },
  dialogRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing.stackMd,
  },
  dialogInfo: {
    flex: 1,
    marginLeft: tokens.spacing.unit * 3,
    justifyContent: 'center',
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 16,
    fontWeight: '600',
  },
  timeText: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 12,
  },
  lastMsg: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 14,
  },
  unreadMsg: {
    color: tokens.colors['on-surface'],
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: tokens.colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: tokens.spacing.unit * 2,
    paddingHorizontal: 4,
  },
  unreadText: {
    color: tokens.colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  }
});
