export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  isVerified?: boolean;
}

export interface Video {
  id: string;
  url: string;
  title: string;
  description: string;
  author: User;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  tags: string[];
  trackId?: string; // ID of the track this video belongs to
}

export interface Episode {
  id: string;
  title: string;
  duration: number; // in seconds
  status: 'watched' | 'current' | 'future';
  thumbnailUrl: string;
  videoUrl: string;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  author: User;
  coverUrl: string;
  progress: number; // 0 to 1
  episodes: Episode[];
  tags: string[];
}

export interface MixerSettings {
  mode: 'people' | 'ai' | 'any';
  familiarity: number; // 0 to 1
  entertainment: number; // 0 to 1
  locality: number; // 0 to 1
  depth: number; // 0 to 1
}
