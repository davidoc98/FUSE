import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { tokens } from '../../design-system/tokens';
import { AppIcon } from '../../components/AppIcon';
import { useStore } from '../../store/useStore';
import { useResponsive } from '../../hooks/useResponsive';

export const ChatScreen = () => {
  const { id, username } = useLocalSearchParams<{ id: string, username: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const currentUser = useStore((state) => state.currentUser);
  const { isDesktop } = useResponsive();

  // Local state for chat MVP
  const [messages, setMessages] = useState([
    { id: 'm1', text: 'Крутой фундамент получается!', senderId: 'other', time: '12:30' },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;
    setMessages([
      { id: Date.now().toString(), text: inputText.trim(), senderId: currentUser.id, time: 'Сейчас' },
      ...messages
    ]);
    setInputText('');
  };

  const renderMessage = ({ item }: any) => {
    const isMe = item.senderId === currentUser.id;
    return (
      <View style={[styles.msgWrapper, isMe ? styles.msgRight : styles.msgLeft]}>
        <View style={[styles.msgBubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
          <Text style={styles.msgText}>{item.text}</Text>
        </View>
        <Text style={styles.msgTime}>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: isDesktop ? tokens.spacing.stackLg : insets.top, paddingBottom: isDesktop ? tokens.spacing.stackLg : insets.bottom }]}>
      <KeyboardAvoidingView
          style={styles.contentWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <AppIcon name="arrow-back" size={24} color={tokens.colors['on-surface']} />
          </Pressable>
          <Text style={styles.headerTitle}>{username}</Text>
          <View style={styles.backBtn} />
        </View>

        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          inverted
          contentContainerStyle={styles.chatList}
        />

        <View style={styles.inputArea}>
          <AppIcon name="add" size={24} color={tokens.colors['on-surface-variant']} />
          <TextInput
            style={styles.input}
            placeholder="Сообщение..."
            placeholderTextColor={tokens.colors['on-surface-variant']}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <Pressable onPress={sendMessage} disabled={!inputText.trim()}>
            <AppIcon
              name="send"
              size={24}
              color={inputText.trim() ? tokens.colors.primary : tokens.colors['surface-container-highest']}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  contentWrapper: {
    flex: 1,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: tokens.colors['surface-container-lowest'],
    borderRadius: tokens.rounded.xl,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.containerMarginMobile,
    paddingVertical: tokens.spacing.stackSm,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors['surface-container-highest'],
  },
  headerTitle: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.headlineMd.fontFamily,
    fontSize: 16,
    fontWeight: '600',
  },
  backBtn: {
    padding: tokens.spacing.unit,
    width: 40,
  },
  chatList: {
    padding: tokens.spacing.containerMarginMobile,
  },
  msgWrapper: {
    marginBottom: tokens.spacing.stackMd,
    maxWidth: '80%',
  },
  msgLeft: {
    alignSelf: 'flex-start',
  },
  msgRight: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  msgBubble: {
    paddingHorizontal: tokens.spacing.stackSm,
    paddingVertical: tokens.spacing.unit * 2.5,
    borderRadius: tokens.rounded.md,
  },
  bubbleMe: {
    backgroundColor: tokens.colors.primary,
    borderBottomRightRadius: 2,
  },
  bubbleOther: {
    backgroundColor: tokens.colors['surface-container-high'],
    borderBottomLeftRadius: 2,
  },
  msgText: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 15,
  },
  msgTime: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 10,
    marginTop: 4,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: tokens.spacing.containerMarginMobile,
    paddingTop: tokens.spacing.stackSm,
    borderTopWidth: 1,
    borderTopColor: tokens.colors['surface-container-highest'],
    backgroundColor: tokens.colors.background,
  },
  input: {
    flex: 1,
    backgroundColor: tokens.colors['surface-container'],
    color: tokens.colors['on-surface'],
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 12,
    maxHeight: 100,
  }
});
