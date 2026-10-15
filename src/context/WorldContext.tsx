import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { WorldId, WorldDefinition } from '../types';
import { WORLDS_CONFIG, getWorldDriveFolderId } from '../config/worlds';

interface WorldContextType {
  activeWorld: WorldId;
  targetWorld: WorldId | null;
  isTransitioning: boolean;
  activeConfig: WorldDefinition | null;
  configuredFolderId: string | null;
  isFolderConfigured: boolean;
  reducedMotion: boolean;
  soundMuted: boolean;
  setSoundMuted: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSound: () => void;
  navigateToWorld: (id: WorldId) => void;
  returnToLobby: () => void;
}

const WorldContext = createContext<WorldContextType | undefined>(undefined);

export function WorldProvider({ children }: { children: React.ReactNode }) {
  const [activeWorld, setActiveWorld] = useState<WorldId>('lobby');
  const [targetWorld, setTargetWorld] = useState<WorldId | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Track prefers-reduced-motion dynamically
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const activeConfig = useMemo(() => {
    if (activeWorld === 'lobby') return null;
    return WORLDS_CONFIG[activeWorld] || null;
  }, [activeWorld]);

  const configuredFolderId = useMemo(() => {
    if (activeWorld === 'lobby') return null;
    return getWorldDriveFolderId(activeWorld);
  }, [activeWorld]);

  const isFolderConfigured = Boolean(configuredFolderId);

  const navigateToWorld = useCallback(
    (id: WorldId) => {
      if (id === activeWorld || isTransitioning) return;
      setTargetWorld(id);
      setIsTransitioning(true);

      // Cinematic transition timing (shorter if user prefers reduced motion)
      const duration = reducedMotion ? 250 : 650;
      setTimeout(() => {
        setActiveWorld(id);
        setIsTransitioning(false);
        setTargetWorld(null);
      }, duration);
    },
    [activeWorld, isTransitioning, reducedMotion]
  );

  const returnToLobby = useCallback(() => {
    navigateToWorld('lobby');
  }, [navigateToWorld]);

  const toggleSound = useCallback(() => {
    setSoundMuted((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      activeWorld,
      targetWorld,
      isTransitioning,
      activeConfig,
      configuredFolderId,
      isFolderConfigured,
      reducedMotion,
      soundMuted,
      setSoundMuted,
      toggleSound,
      navigateToWorld,
      returnToLobby,
    }),
    [
      activeWorld,
      targetWorld,
      isTransitioning,
      activeConfig,
      configuredFolderId,
      isFolderConfigured,
      reducedMotion,
      soundMuted,
      toggleSound,
      navigateToWorld,
      returnToLobby,
    ]
  );

  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>;
}

export function useWorld(): WorldContextType {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error('useWorld must be used within a WorldProvider');
  }
  return context;
}
