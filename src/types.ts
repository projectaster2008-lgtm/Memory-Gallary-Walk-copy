export interface MemoryItem {
  id: string;
  driveFileId?: string;
  name: string;
  title: string;
  location: string;
  date: string;
  imageUrl: string;
  thumbnailUrl: string;
  description?: string;
  aiStory?: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
  isVideo?: boolean;
  category?: string;
  tags: string[];
  width?: number;
  height?: number;
  mimeType?: string;
  webViewLink?: string;
}

export interface DriveFolderInfo {
  id: string;
  name: string;
  itemCount: number;
}

export type ViewMode = 'sphere' | 'inside_dome' | 'orbit';

export type TimeOfDay = 'sunrise' | 'noon' | 'sunset' | 'night' | 'auto';

export type WorldId = 'lobby' | 'globe' | 'prism' | 'forest' | 'observatory' | 'theater';

export type StorytellerId = 'nyx' | 'clint' | 'lumi' | '22';

export interface WorldStoryteller {
  id: StorytellerId;
  name: string;
  role: string;
}

export interface WorldDefinition {
  id: Exclude<WorldId, 'lobby'>;
  name: string;
  tagline: string;
  storyteller: WorldStoryteller;
  envFolderKey: string;
  defaultFolderId?: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  description: string;
  iconName: string;
  available: boolean;
}

