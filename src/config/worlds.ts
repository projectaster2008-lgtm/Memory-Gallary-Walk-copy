import { WorldDefinition, WorldId } from '../types';

export const WORLDS_CONFIG: Record<Exclude<WorldId, 'lobby'>, WorldDefinition> = {
  globe: {
    id: 'globe',
    name: 'The Globe',
    tagline: 'Spherical Memory Walk',
    storyteller: {
      id: 'clint',
      name: 'Clint',
      role: 'Heart & Memory Companion',
    },
    envFolderKey: 'VITE_DRIVE_FOLDER_GLOBE',
    defaultFolderId: '1GiWF-RbQLKGgUK54_JUfFz5421ms9r8F',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    bgGradient: 'from-emerald-950 via-slate-950 to-neutral-950',
    description:
      'The original 3D celestial sphere. Orbit around curated global destinations, traverse memory nodes, and experience cinematic dome walkthroughs.',
    iconName: 'Globe',
    available: true,
  },
  prism: {
    id: 'prism',
    name: 'The Prism',
    tagline: 'Ating Universe',
    storyteller: {
      id: 'lumi',
      name: 'Lumi',
      role: 'Celestial Guide of Ating Universe',
    },
    envFolderKey: 'VITE_DRIVE_FOLDER_PRISM',
    defaultFolderId: undefined,
    accentColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    bgGradient: 'from-purple-950 via-indigo-950 to-neutral-950',
    description:
      'A crystalline refraction chamber where light splits into radiant chromatic memory shards celebrating Ating Universe.',
    iconName: 'Sparkles',
    available: true,
  },
  forest: {
    id: 'forest',
    name: 'The Forest',
    tagline: 'Our First Year',
    storyteller: {
      id: '22',
      name: '22',
      role: 'Chronicler of Our First Year',
    },
    envFolderKey: 'VITE_DRIVE_FOLDER_FOREST',
    defaultFolderId: undefined,
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    bgGradient: 'from-amber-950 via-emerald-950 to-neutral-950',
    description:
      'A quiet evergreen sanctuary dappled in warm golden hour light, honoring the foundational steps of Our First Year.',
    iconName: 'Trees',
    available: true,
  },
  observatory: {
    id: 'observatory',
    name: 'The Observatory',
    tagline: 'Constellations & Deep Night',
    storyteller: {
      id: 'nyx',
      name: 'Nyx',
      role: 'Silent Watcher of the Vault',
    },
    envFolderKey: 'VITE_DRIVE_FOLDER_OBSERVATORY',
    defaultFolderId: undefined,
    accentColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    bgGradient: 'from-blue-950 via-slate-950 to-neutral-950',
    description:
      'An open-dome astronomical pavilion where memories form living constellations tracing coordinates across the night sky.',
    iconName: 'Compass',
    available: true,
  },
  theater: {
    id: 'theater',
    name: 'The Memory Theater',
    tagline: 'Motion & Unrehearsed Moments',
    storyteller: {
      id: 'clint',
      name: 'Curated Archives',
      role: 'Cinematic Reel Keeper',
    },
    envFolderKey: 'VITE_DRIVE_FOLDER_THEATER',
    defaultFolderId: undefined,
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    bgGradient: 'from-rose-950 via-red-950 to-neutral-950',
    description:
      'A velvet-curtained auditorium designed for uninterrupted continuous playback of cherished videos, laughter, and raw footage.',
    iconName: 'Film',
    available: true,
  },
};

export const WORLDS_LIST: WorldDefinition[] = Object.values(WORLDS_CONFIG);

/**
 * Returns the configured Google Drive Folder ID for a world.
 * Returns null if not configured (never silently falling back to another world).
 */
export function getWorldDriveFolderId(worldId: Exclude<WorldId, 'lobby'>): string | null {
  const world = WORLDS_CONFIG[worldId];
  if (!world) return null;

  // 1. Check Vite environment variable (import.meta.env)
  const envKey = world.envFolderKey;
  const envVal = (import.meta as any).env?.[envKey];
  if (typeof envVal === 'string' && envVal.trim().length > 0) {
    return envVal.trim();
  }

  // 2. Explicit world default if provided (e.g., The Globe)
  if (world.defaultFolderId) {
    return world.defaultFolderId;
  }

  // 3. Otherwise null: Never borrow from another world's collection
  return null;
}
