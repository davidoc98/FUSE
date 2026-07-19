import React, { useCallback, useRef, useState, useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { useStore } from '../../store/useStore';
import { VideoFeedItem } from './VideoFeedItem';
import { tokens } from '../../design-system/tokens';
import { AlgorithmMixerSheet } from '../mixer/AlgorithmMixerSheet';
import { CommentsSheet } from '../comments/CommentsSheet';
import { Video } from '../../types';
import BottomSheet from '@gorhom/bottom-sheet';

const { height: screenHeight } = Dimensions.get('window');

export const PulseFeed: React.FC = () => {
  const videos = useStore((state) => state.videos);
  const [activeIndex, setActiveIndex] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const commentsSheetRef = useRef<BottomSheet>(null);
  const [activeVideoIdForComments, setActiveVideoIdForComments] = useState<string | null>(null);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useMemo(() => [{
    viewabilityConfig: {
      itemVisiblePercentThreshold: 50,
    },
    onViewableItemsChanged,
  }], [onViewableItemsChanged]);

  const openMixer = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const openComments = useCallback((videoId: string) => {
    setActiveVideoIdForComments(videoId);
    commentsSheetRef.current?.expand();
  }, []);

  const renderItem = useCallback(({ item, index }: ListRenderItemInfo<Video>) => (
    <VideoFeedItem
      video={item}
      isActive={index === activeIndex}
      onOpenMixer={openMixer}
      onOpenComments={() => openComments(item.id)}
    />
  ), [activeIndex, openMixer, openComments]);

  return (
    <View style={styles.container}>
      <FlashList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item: Video) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        estimatedItemSize={screenHeight}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs as any}
      />
      <AlgorithmMixerSheet ref={bottomSheetRef} />
      {activeVideoIdForComments && (
         <CommentsSheet ref={commentsSheetRef} videoId={activeVideoIdForComments} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
});
