import React from 'react';
import { ArrowLeft, FolderX, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';
import { WorldDefinition } from '../types';
import { useWorld } from '../context/WorldContext';

interface UnconfiguredWorldNoticeProps {
  world: WorldDefinition;
}

export default function UnconfiguredWorldNotice({ world }: UnconfiguredWorldNoticeProps) {
  const { returnToLobby } = useWorld();

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b ${world.bgGradient} text-white select-none`}>
      {/* Ambient background glow */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ backgroundColor: world.accentColor }}
      />

      <div className="relative z-10 max-w-lg w-full bg-black/60 border border-white/15 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
        {/* Storyteller & World Accent Icon */}
        <div
          className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5 shadow-lg border border-white/20"
          style={{ backgroundColor: `${world.accentColor}25` }}
        >
          <FolderX className="w-8 h-8" style={{ color: world.accentColor }} />
        </div>

        {/* World Title & Tagline */}
        <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
          {world.name}
        </h2>
        <p className="text-sm font-medium tracking-wide mb-4" style={{ color: world.accentColor }}>
          {world.tagline} • Guided by {world.storyteller.name}
        </p>

        {/* World Lore / Description */}
        <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-light">
          {world.description}
        </p>

        {/* Honest Isolation Explanation */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left mb-6">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-300 space-y-1">
              <p className="font-semibold text-white">Dedicated Drive Folder Required</p>
              <p>
                Each world reads exclusively from its own Google Drive folder. To preserve memory integrity, this world will never silently borrow photos or videos from another collection.
              </p>
              <p className="pt-1 font-mono text-[11px] text-amber-300">
                Configure: <span className="underline">{world.envFolderKey}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={returnToLobby}
          className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-98 border border-white/20 text-white font-medium text-sm transition-all shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Sanctuary Lobby</span>
        </button>
      </div>
    </div>
  );
}
