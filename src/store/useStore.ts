import { create } from 'zustand';
import { Video, MixerSettings } from '../types';
import { mockVideos } from '../data/mockData';

interface AppState {
  videos: Video[];
  mixerSettings: MixerSettings;
  likedVideos: Set<string>;
  setMixerSettings: (settings: Partial<MixerSettings>) => void;
  toggleLike: (videoId: string) => void;
  applyMixerSettings: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  videos: mockVideos,
  mixerSettings: {
    mode: 'ai',
    familiarity: 0.5,
    entertainment: 0.5,
    locality: 0.5,
    depth: 0.5,
  },
  likedVideos: new Set(),
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
  applyMixerSettings: () => {
    // В реальном приложении здесь был бы запрос к API
    // Для мока просто перемешиваем видео, чтобы имитировать изменение
    set((state) => {
        const shuffled = [...state.videos].sort(() => Math.random() - 0.5);
        return { videos: shuffled };
    });
  },
}));
