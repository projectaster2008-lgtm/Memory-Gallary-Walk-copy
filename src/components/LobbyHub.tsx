import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Sparkles, 
  Trees, 
  Compass, 
  Film, 
  ArrowRight, 
  FolderCheck, 
  FolderX,
  Volume2,
  VolumeX,
  Eye,
  Info
} from 'lucide-react';
import { WORLDS_LIST } from '../config/worlds';
import { useWorld } from '../context/WorldContext';
import { WorldId } from '../types';

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Sparkles,
  Trees,
  Compass,
  Film,
};

export default function LobbyHub() {
  const { navigateToWorld, soundMuted, toggleSound } = useWorld();

  return (
    <div className="relative w-full h-full min-h-screen bg-[#07090e] text-white overflow-y-auto overflow-x-hidden select-none">
      {/* Cinematic Sanctuary Ambient Backdrop */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-900/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-emerald-900/15 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-purple-900/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,9,14,0.75)_100%)]" />
      </div>

      {/* Top Header */}
      <header className="relative z-20 w-full px-6 py-5 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Sparkles className="w-4 h-4 text-indigo-300" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Sanctuary of Worlds
            </h1>
            <p className="text-xs text-white/50 tracking-wide font-light">
              Memory Gallery Walk • Guided by Nyx
            </p>
          </div>
        </div>

        {/* Audio control */}
        <button
          onClick={toggleSound}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 border border-white/15 backdrop-blur-md text-white/80 hover:text-white transition-all shadow-md cursor-pointer"
          title={soundMuted ? 'Unmute Atmosphere' : 'Mute Atmosphere'}
          aria-label={soundMuted ? 'Unmute Atmosphere' : 'Mute Atmosphere'}
        >
          {soundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-indigo-300" />}
        </button>
      </header>

      {/* Main Sanctuary Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-6 pb-20 flex flex-col items-center">
        {/* Nyx Introduction Teaser Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-3xl mb-10 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-xl flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0 mt-0.5">
            <Eye className="w-5 h-5 text-indigo-300" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold tracking-wider uppercase text-indigo-300">
                Nyx, Sanctuary Guide
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
                Lobby Host
              </span>
            </div>
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              "Welcome to the sanctuary threshold. Five distinct worlds branch outward from this hall—each preserving its own dedicated realm of memory and time. Select any portal below to enter."
            </p>
          </div>
        </motion.div>

        {/* Five World Portals Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {WORLDS_LIST.map((world, idx) => {
            const Icon = ICON_MAP[world.iconName] || Globe;
            const isConfigured = Boolean(
              (import.meta as any).env?.[world.envFolderKey] || world.defaultFolderId
            );

            return (
              <motion.div
                key={world.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
                onClick={() => navigateToWorld(world.id)}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white/[0.035] hover:bg-white/[0.07] border border-white/10 hover:border-white/30 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer overflow-hidden"
              >
                {/* Subtle World Hue Accent Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: world.accentColor }}
                />

                {/* Ambient Card Glow on Hover */}
                <div
                  className="absolute -right-16 -top-16 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: world.accentColor }}
                />

                <div>
                  {/* Top Bar: Icon + Storyteller Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/15 shadow-md transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: `${world.accentColor}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: world.accentColor }} />
                    </div>

                    {/* Storyteller Tag */}
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 font-medium">
                      {world.storyteller.name}
                    </span>
                  </div>

                  {/* World Title & Subtitle */}
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-white transition-colors flex items-center justify-between">
                    <span>{world.name}</span>
                  </h3>
                  <p className="text-xs font-medium tracking-wide mt-0.5 mb-3" style={{ color: world.accentColor }}>
                    {world.tagline}
                  </p>

                  {/* World Description */}
                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                    {world.description}
                  </p>
                </div>

                {/* Footer: Folder Status & Portal Enter Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div
                    className={`flex items-center gap-1.5 text-[11px] font-mono ${
                      isConfigured ? 'text-emerald-300' : 'text-amber-300'
                    }`}
                  >
                    {isConfigured ? (
                      <>
                        <FolderCheck className="w-3.5 h-3.5" />
                        <span>Ready</span>
                      </>
                    ) : (
                      <>
                        <FolderX className="w-3.5 h-3.5" />
                        <span>Unconfigured</span>
                      </>
                    )}
                  </div>

                  <span className="flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:text-white group-hover:translate-x-1 transition-all">
                    <span>Enter World</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Architectural Isolation Notice Footer */}
        <div className="mt-14 max-w-md text-center text-xs text-white/40 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-white/30 shrink-0" />
          <span>
            Strict world isolation enabled. Only active world scenes mount WebGL context and media memory.
          </span>
        </div>
      </main>
    </div>
  );
}
