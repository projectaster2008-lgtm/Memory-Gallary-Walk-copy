import React, { useEffect } from 'react';
import { ArrowLeft, Volume2, VolumeX, Folder, FolderCheck, FolderX, Sparkles } from 'lucide-react';
import { useWorld } from '../context/WorldContext';

export default function WorldNavigationHeader() {
  const {
    activeWorld,
    activeConfig,
    isFolderConfigured,
    soundMuted,
    toggleSound,
    returnToLobby,
  } = useWorld();

  // Escape key to return to lobby
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeWorld !== 'lobby') {
        returnToLobby();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWorld, returnToLobby]);

  if (activeWorld === 'lobby' || !activeConfig) {
    return null;
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-40 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between pointer-events-none select-none">
      {/* Return to Lobby Button */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={returnToLobby}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/15 hover:border-white/35 backdrop-blur-md shadow-lg transition-all duration-200 active:scale-95 cursor-pointer text-xs sm:text-sm font-medium"
          title="Return to Sanctuary Lobby (Esc)"
          aria-label="Return to Sanctuary Lobby"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Sanctuary Lobby</span>
        </button>

        {/* World Storyteller Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>
            Guide: <strong className="text-white font-medium">{activeConfig.storyteller.name}</strong> ({activeConfig.storyteller.role})
          </span>
        </div>
      </div>

      {/* World Identity & Status Center */}
      <div className="hidden md:flex flex-col items-center pointer-events-auto">
        <h1 className="text-sm font-semibold tracking-wide text-white drop-shadow-md">
          {activeConfig.name}
        </h1>
        <p className="text-[11px] text-white/60 tracking-wider font-light">
          {activeConfig.tagline}
        </p>
      </div>

      {/* Folder Status & Audio Control */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {/* Honest Folder Status */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs backdrop-blur-md border transition-colors ${
            isFolderConfigured
              ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-200'
              : 'bg-amber-950/60 border-amber-500/30 text-amber-200'
          }`}
          title={
            isFolderConfigured
              ? `Connected to dedicated Drive folder: ${activeConfig.envFolderKey}`
              : `Awaiting owner folder configuration (${activeConfig.envFolderKey})`
          }
        >
          {isFolderConfigured ? (
            <>
              <FolderCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline font-mono text-[11px]">Drive Active</span>
            </>
          ) : (
            <>
              <FolderX className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline font-mono text-[11px]">Folder Unset</span>
            </>
          )}
        </div>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="p-2 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white border border-white/15 backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer"
          title={soundMuted ? 'Unmute Atmosphere' : 'Mute Atmosphere'}
          aria-label={soundMuted ? 'Unmute Atmosphere' : 'Mute Atmosphere'}
        >
          {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>
      </div>
    </header>
  );
}
