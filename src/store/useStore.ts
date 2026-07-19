import { create } from 'zustand';
import { Video, MixerSettings, User, Comment, World } from '../types';
import { mockVideos, mockUsers, mockComments, mockWorlds } from '../data/mockData';

interface AppState {
  currentUser: User;
  videos: Video[];
  circleVideos: Video[]; // Mock for subscribed feed
  worlds: World[];
  comments: Comment[];
  mixerSettings: MixerSettings;
  likedVideos: Set<string>;
  savedVideos: Set<string>;
  setMixerSettings: (settings: Partial<MixerSettings>) => void;
  toggleLike: (videoId: string) => void;
  toggleSave: (videoId: string) => void;
  applyMixerSettings: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  currentUser: mockUsers.user1,
  videos: mockVideos,
  circleVideos: [mockVideos[1], mockVideos[0]], // Just a subset for circle feed
  worlds: mockWorlds,
  comments: mockComments,
  mixerSettings: {
    mode: 'ai',
    familiarity: 0.5,
    entertainment: 0.5,
    locality: 0.5,
    depth: 0.5,
  },
  likedVideos: new Set(),
  savedVideos: new Set(),
  setMixerSettings: (settings) =>
    set((state) => ({ mixerSettings: { ...state.mixerSettings, ...settings } })),
  toggleLike: (videoId) =>
    set((state) => {
      const newLiked = new Set(state.likedVideos);
      if (newLiked.has(videoId)) {
        newLiked.delete(videoId);
      } else {
        newLiked.add(videoId);
      }
      return { likedVideos: newLiked };
    }),
  toggleSave: (videoId) =>
    set((state) => {
      const newSaved = new Set(state.savedVideos);
      if (newSaved.has(videoId)) {
        newSaved.delete(videoId);
      } else {
        newSaved.add(videoId);
      }
      return { savedVideos: newSaved };
    }),
  applyMixerSettings: () => {
    set((state) => {
        const shuffled = [...state.videos].sort(() => Math.random() - 0.5);
        return { videos: shuffled };
    });
  },
}));
