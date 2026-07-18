import { Video, Track, User } from '../types';

export const mockUsers: Record<string, User> = {
  user1: {
    id: 'user1',
    username: 'Marina Arch',
    avatarUrl: 'https://i.pravatar.cc/150?u=user1',
    isVerified: true,
  },
  user2: {
    id: 'user2',
    username: 'Eco Builder',
    avatarUrl: 'https://i.pravatar.cc/150?u=user2',
  },
};

export const mockVideos: Video[] = [
  {
    id: 'vid1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: '100 дней стройки: Фундамент',
    description: 'Начинаем новый проект эко-дома. Заливаем фундамент и обсуждаем материалы.',
    author: mockUsers.user1,
    likesCount: 12400,
    commentsCount: 342,
    sharesCount: 120,
    tags: ['Eco', 'Construction', 'Day1'],
    trackId: 'track1',
  },
  {
    id: 'vid2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'Архитектура будущего',
    description: 'Как будут выглядеть города через 50 лет? Разбираем новые концепты.',
    author: mockUsers.user2,
    likesCount: 8900,
    commentsCount: 156,
    sharesCount: 45,
    tags: ['Architecture', 'Future'],
  },
  {
    id: 'vid3',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'День 5: Каркас',
    description: 'Возводим деревянный каркас. Сложности и решения.',
    author: mockUsers.user1,
    likesCount: 15000,
    commentsCount: 420,
    sharesCount: 200,
    tags: ['Eco', 'Construction', 'Day5'],
    trackId: 'track1',
  }
];

export const mockTracks: Record<string, Track> = {
  track1: {
    id: 'track1',
    title: '100 Day Build',
    description: 'Полный процесс строительства автономного эко-дома с нуля до новоселья.',
    author: mockUsers.user1,
    coverUrl: 'https://picsum.photos/seed/track1/800/600',
    progress: 0.3,
    tags: ['Архитектура', 'Своими руками', 'Эко'],
    episodes: [
      {
        id: 'ep1',
        title: 'Фундамент',
        duration: 120,
        status: 'watched',
        thumbnailUrl: 'https://picsum.photos/seed/ep1/400/300',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      },
      {
        id: 'ep2',
        title: 'Каркас',
        duration: 180,
        status: 'current',
        thumbnailUrl: 'https://picsum.photos/seed/ep2/400/300',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
      {
        id: 'ep3',
        title: 'Крыша',
        duration: 150,
        status: 'future',
        thumbnailUrl: 'https://picsum.photos/seed/ep3/400/300',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      }
    ]
  }
};
