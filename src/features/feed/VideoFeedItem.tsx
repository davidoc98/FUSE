import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Video } from '../../types';
import { tokens } from '../../design-system/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useStore } from '../../store/useStore';
import { Avatar } from '../../components/Avatar';
import { AppIcon } from '../../components/AppIcon';
import { VideoActions } from '../../components/VideoActions';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

interface VideoFeedItemProps {
  video: Video;
  isActive: boolean;
  onOpenMixer: () => void;
}

export const VideoFeedItem: React.FC<VideoFeedItemProps> = ({ video, isActive, onOpenMixer }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const toggleLike = useStore((state) => state.toggleLike);
  const isLiked = useStore((state) => state.likedVideos.has(video.id));

  const player = useVideoPlayer(video.url, player => {
    player.loop = true;
  });

  const [isPlaying, setIsPlaying] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      player.play();
      setTimeout(() => setIsPlaying(true), 0);
    } else {
      player.pause();
      setTimeout(() => setIsPlaying(false), 0);
    }
  }, [isActive, player]);


  // Sync state manually to avoid worklet issues
  const togglePlayState = () => {
     if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const safeSingleTap = Gesture.Tap().onEnd(() => {
    togglePlayState();
  }).runOnJS(true);


  const doubleTap = Gesture.Tap().numberOfTaps(2).onEnd(() => {
    toggleLike(video.id);
  }).runOnJS(true);

  const gestures = Gesture.Exclusive(doubleTap, safeSingleTap);

  const handleTrackPress = () => {
    if (video.trackId) {
      router.push({ pathname: "/track/[id]" as any, params: { id: video.trackId } });
    }
  };

  return (
    <View style={[styles.container, { height: screenHeight }]}>
      <GestureDetector gesture={gestures}>
        <View style={StyleSheet.absoluteFill}>
          <VideoView
            style={StyleSheet.absoluteFill}
            player={player}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
            locations={[0.5, 0.8, 1]}
            style={StyleSheet.absoluteFill}
          />
        </View>
      </GestureDetector>

      {/* Top Overlay */}
      <View style={[styles.topOverlay, { paddingTop: insets.top + tokens.spacing.containerMarginMobile }]}>
        <Pressable onPress={onOpenMixer} style={styles.iconButton}>
          <AppIcon name="options-outline" size={24} color="white" />
        </Pressable>
      </View>

      {/* Bottom Overlay */}
      <View style={[styles.bottomOverlay, { paddingBottom: insets.bottom + 100 }]}>
        <View style={styles.authorRow}>
          <Avatar url={video.author.avatarUrl} size={32} />
          <Text style={styles.authorName}>{video.author.username}</Text>
          {video.author.isVerified && (
             <AppIcon name="checkmark-circle" size={16} color={tokens.colors.tertiary} />
          )}
        </View>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{video.description}</Text>

        {video.trackId && (
          <Pressable style={styles.ctaButton} onPress={handleTrackPress}>
             <LinearGradient
                colors={[tokens.colors['primary-container'], tokens.colors['secondary-container']]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaGradient}
              >
               <Text style={styles.ctaText}>Продолжить историю</Text>
               <AppIcon name="chevron-forward" size={16} color="white" />
             </LinearGradient>
          </Pressable>
        )}

        <VideoActions
          likesCount={video.likesCount}
          commentsCount={video.commentsCount}
          sharesCount={video.sharesCount}
          isLiked={isLiked}
          onLike={() => toggleLike(video.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    backgroundColor: tokens.colors.background,
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    right: tokens.spacing.containerMarginMobile,
    zIndex: 10,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: tokens.spacing.containerMarginMobile,
    zIndex: 10,
  },
  iconButton: {
    padding: tokens.spacing.unit * 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: tokens.rounded.full,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing.unit * 2,
  },
  authorName: {
    color: 'white',
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontWeight: tokens.typography.bodyMd.fontWeight as any,
    fontSize: tokens.typography.bodyMd.fontSize,
    marginLeft: tokens.spacing.unit * 2,
    marginRight: tokens.spacing.unit,
  },
  title: {
    color: 'white',
    fontFamily: tokens.typography.headlineMd.fontFamily,
    fontWeight: tokens.typography.headlineMd.fontWeight as any,
    fontSize: tokens.typography.headlineMd.fontSize,
    marginBottom: tokens.spacing.unit,
  },
  description: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: tokens.typography.bodyMd.fontSize,
    marginBottom: tokens.spacing.stackSm,
  },
  ctaButton: {
    marginTop: tokens.spacing.unit * 2,
    marginBottom: tokens.spacing.stackSm,
    borderRadius: tokens.rounded.xl,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: tokens.spacing.unit * 2.5,
    paddingHorizontal: tokens.spacing.unit * 5,
  },
  ctaText: {
    color: 'white',
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontWeight: tokens.typography.bodyMd.fontWeight as any,
    fontSize: tokens.typography.bodyMd.fontSize,
    marginRight: tokens.spacing.unit,
  },
});
