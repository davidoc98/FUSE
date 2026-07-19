import React, { forwardRef, useMemo, useCallback, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { tokens } from '../../design-system/tokens';
import { useStore } from '../../store/useStore';
import { Avatar } from '../../components/Avatar';
import { AppIcon } from '../../components/AppIcon';

interface CommentsSheetProps {
    videoId: string;
}

export const CommentsSheet = forwardRef<BottomSheet, CommentsSheetProps>(({ videoId }, ref) => {
  const snapPoints = useMemo(() => ['60%', '90%'], []);
  const allComments = useStore((state) => state.comments);
  const currentUser = useStore((state) => state.currentUser);
  const comments = useMemo(() => allComments.filter(c => c.videoId === videoId), [allComments, videoId]);

  const [newComment, setNewComment] = useState('');

  const renderBackdrop = useCallback(
		(props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.7} />,
		[]
	);

  const handleClose = () => {
    if (ref && 'current' in ref && ref.current) {
        ref.current.close();
    }
  };

  const renderItem = ({ item }: any) => (
      <View style={styles.commentItem}>
          <Avatar url={item.author.avatarUrl} size={36} />
          <View style={styles.commentContent}>
              <View style={styles.commentHeader}>
                  <Text style={styles.commentAuthor}>{item.author.username}</Text>
                  {item.author.isVerified && <AppIcon name="checkmark-circle" size={14} color={tokens.colors.tertiary} />}
                  <Text style={styles.commentTime}> • {item.createdAt}</Text>
              </View>
              <Text style={styles.commentText}>{item.text}</Text>
              <Pressable style={styles.replyButton}>
                  <Text style={styles.replyText}>Ответить</Text>
              </Pressable>
          </View>
          <View style={styles.commentActions}>
              <AppIcon name="heart-outline" size={16} color={tokens.colors['on-surface-variant']} />
              <Text style={styles.likeCount}>{item.likesCount}</Text>
          </View>
      </View>
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      keyboardBehavior="interactive"
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>{comments.length} комментариев</Text>
            <Pressable onPress={handleClose} style={styles.closeBtn}>
                <AppIcon name="close" size={24} color={tokens.colors['on-surface']} />
            </Pressable>
        </View>

        <FlatList
            data={comments}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputArea}>
            <Avatar url={currentUser.avatarUrl} size={36} />
            <BottomSheetTextInput
                style={styles.input}
                placeholder="Добавить комментарий..."
                placeholderTextColor={tokens.colors['on-surface-variant']}
                value={newComment}
                onChangeText={setNewComment}
            />
            <Pressable style={[styles.sendBtn, !newComment.trim() && styles.sendBtnDisabled]}>
                <AppIcon name="arrow-up-circle" size={32} color={newComment.trim() ? tokens.colors.primary : tokens.colors['surface-container-highest']} />
            </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: tokens.colors['surface-container'],
    borderRadius: tokens.rounded.xl,
  },
  handleIndicator: {
    backgroundColor: tokens.colors['outline-variant'],
    width: 48,
    height: 6,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: tokens.spacing.stackSm,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors['surface-container-highest'],
    position: 'relative',
  },
  title: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: tokens.typography.bodyMd.fontSize,
    fontWeight: '600',
  },
  closeBtn: {
    position: 'absolute',
    right: tokens.spacing.containerMarginMobile,
  },
  listContent: {
    padding: tokens.spacing.containerMarginMobile,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: tokens.spacing.stackMd,
  },
  commentContent: {
    flex: 1,
    marginLeft: tokens.spacing.unit * 3,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthor: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 13,
    fontWeight: '600',
  },
  commentTime: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 12,
  },
  commentText: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: tokens.spacing.unit,
  },
  replyButton: {
    marginTop: tokens.spacing.unit,
  },
  replyText: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 13,
    fontWeight: '600',
  },
  commentActions: {
    alignItems: 'center',
    marginLeft: tokens.spacing.unit * 2,
    paddingTop: tokens.spacing.unit * 2,
  },
  likeCount: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.technicalData.fontFamily,
    fontSize: 12,
    marginTop: 4,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: tokens.spacing.containerMarginMobile,
    borderTopWidth: 1,
    borderTopColor: tokens.colors['surface-container-highest'],
    backgroundColor: tokens.colors['surface-container'],
  },
  input: {
    flex: 1,
    backgroundColor: tokens.colors['surface-container-high'],
    color: tokens.colors['on-surface'],
    borderRadius: tokens.rounded.full,
    paddingHorizontal: tokens.spacing.unit * 4,
    paddingVertical: tokens.spacing.unit * 2,
    marginLeft: tokens.spacing.unit * 3,
    marginRight: tokens.spacing.unit * 2,
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 15,
  },
  sendBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.5,
  }
});
CommentsSheet.displayName = 'CommentsSheet';
