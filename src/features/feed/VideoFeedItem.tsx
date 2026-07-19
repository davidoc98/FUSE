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
import { CommentsSheet } from '../comments/CommentsSheet';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useResponsive } from '../../hooks/useResponsive';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

interface VideoFeedItemProps {
  video: Video;
  isActive: boolean;
  onOpenMixer: () => void;
  onOpenComments: () => void;
}

export const VideoFeedItem: React.FC<VideoFeedItemProps> = ({ video, isActive, onOpenMixer, onOpenComments }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isDesktop } = useResponsive();

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

  const wrapperStyle = isDesktop ? styles.desktopWrapper : styles.container;
  const videoBoxStyle = isDesktop ? styles.desktopVideoBox : StyleSheet.absoluteFillObject;

  return (
    <View style={[wrapperStyle, { height: screenHeight }]}>

      <View style={[videoBoxStyle, isDesktop && { marginTop: insets.top }]}>
        <GestureDetector gesture={gestures}>
          <View style={StyleSheet.absoluteFill}>
            <VideoView
              style={StyleSheet.absoluteFill}
              player={player}
            />
            {!isDesktop && (
                <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
                locations={[0.5, 0.8, 1]}
                style={StyleSheet.absoluteFill}
                />
            )}
            {isDesktop && (
                <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)']}
                locations={[0.7, 1]}
                style={StyleSheet.absoluteFill}
                />
            )}
          </View>
        </GestureDetector>

        {/* Video specific info layered on top */}
        <View style={[styles.bottomOverlay, isDesktop && styles.desktopBottomOverlay]}>
          <View style={styles.authorRow}>
            <Avatar url={video.author.avatarUrl} size={32} />
            <Text style={styles.authorName}>{video.author.username}</Text>
            {video.author.isVerified && (
               <AppIcon name="checkmark-circle" size={16} color={tokens.colors.tertiary} />
            )}
          </View>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.description} numberOfLines={isDesktop ? 4 : 2}>{video.description}</Text>

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

          {!isDesktop && (
            <VideoActions
              likesCount={video.likesCount}
              commentsCount={video.commentsCount}
              sharesCount={video.sharesCount}
              isLiked={isLiked}
              onLike={() => toggleLike(video.id)}
              onComment={onOpenComments}
            />
          )}
        </View>
      </View>

      {/* Side Actions (Desktop) or Top Overlay (Mobile) */}
      {!isDesktop ? (
         <View style={[styles.topOverlay, { paddingTop: insets.top + tokens.spacing.containerMarginMobile }]}>
          <Pressable onPress={onOpenMixer} style={styles.iconButton}>
            <AppIcon name="options-outline" size={24} color="white" />
          </Pressable>
         </View>
      ) : (
         <View style={styles.desktopSideActions}>
            <View style={styles.desktopSideActionsContainer}>
              <Pressable style={styles.sideActionBtn} onPress={() => toggleLike(video.id)}>
                <AppIcon name={isLiked ? "heart" : "heart-outline"} size={32} color={isLiked ? tokens.colors.primary : tokens.colors['on-surface']} />
                <Text style={styles.sideActionText}>{video.likesCount}</Text>
              </Pressable>

              <Pressable style={styles.sideActionBtn} onPress={onOpenComments}>
                <AppIcon name="chatbubble-outline" size={32} color={tokens.colors['on-surface']} />
                <Text style={styles.sideActionText}>{video.commentsCount}</Text>
              </Pressable>

              <Pressable style={styles.sideActionBtn}>
                <AppIcon name="share-outline" size={32} color={tokens.colors['on-surface']} />
                <Text style={styles.sideActionText}>{video.sharesCount}</Text>
              </Pressable>

              <Pressable style={[styles.sideActionBtn, { marginTop: 40 }]} onPress={onOpenMixer}>
                <AppIcon name="options-outline" size={32} color={tokens.colors['on-surface']} />
                <Text style={styles.sideActionText}>Лента</Text>
              </Pressable>
            </View>
         </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    backgroundColor: tokens.colors.background,
  },
  desktopWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colors.background,
  },
  desktopVideoBox: {
    width: 400,
    height: '90%',
    maxHeight: 800,
    borderRadius: tokens.rounded.xl,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'black',
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
  desktopBottomOverlay: {
    paddingBottom: tokens.spacing.stackLg,
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
  desktopSideActions: {
    marginLeft: tokens.spacing.stackLg,
    height: '90%',
    maxHeight: 800,
    justifyContent: 'flex-end',
    paddingBottom: tokens.spacing.stackLg,
  },
  desktopSideActionsContainer: {
    backgroundColor: tokens.colors['surface-container-low'],
    padding: tokens.spacing.unit * 3,
    borderRadius: tokens.rounded.xl,
    alignItems: 'center',
    gap: tokens.spacing.stackMd,
  },
  sideActionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideActionText: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.technicalData.fontFamily,
    fontSize: 12,
    marginTop: 4,
  }
});
