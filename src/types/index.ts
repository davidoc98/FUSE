export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  isVerified?: boolean;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
}

export interface Comment {
  id: string;
  videoId: string;
  author: User;
  text: string;
  likesCount: number;
  createdAt: string;
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
  trackId?: string;
}

export interface Episode {
  id: string;
  title: string;
  duration: number;
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
  progress: number;
  episodes: Episode[];
  tags: string[];
}

export interface World {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  membersCount: number;
  tags: string[];
}

export interface MixerSettings {
  mode: 'people' | 'ai' | 'any';
  familiarity: number;
  entertainment: number;
  locality: number;
  depth: number;
}
