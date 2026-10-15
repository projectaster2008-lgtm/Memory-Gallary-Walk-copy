import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWorld } from '../context/WorldContext';
import { HARDCODED_MEMORIES } from '../memoriesData';
import { MemoryItem } from '../types';
import LobbyHub from './LobbyHub';
import GalleryGlobe from './GalleryGlobe';
import LocationDetailsScreen from './LocationDetailsScreen';
import WorldNavigationHeader from './WorldNavigationHeader';
import UnconfiguredWorldNotice from './UnconfiguredWorldNotice';

export default function WorldContainer() {
  const { activeWorld, activeConfig, isFolderConfigured, isTransitioning, reducedMotion } = useWorld();
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  // Memories for World 1 (The Globe). Uses HARDCODED_MEMORIES as initial dataset.
  const [globeMemories] = useState<MemoryItem[]>(HARDCODED_MEMORIES);

  return (
    <div className="relative w-full h-full min-h-screen bg-black overflow-hidden select-none">
      {/* Universal Floating Navigation Header for any active World */}
      <WorldNavigationHeader />

      {/* Strict World Mount/Unmount Isolation Switcher */}
      <div className="relative w-full h-full inset-0">
        {activeWorld === 'lobby' && (
          <motion.div
            key="world-lobby"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.4 }}
            className="w-full h-full"
          >
            <LobbyHub />
          </motion.div>
        )}

        {activeWorld === 'globe' && (
          <motion.div
            key="world-globe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.4 }}
            className="w-full h-full relative"
          >
            {/* 3D Gallery Walk Canvas for Globe */}
            <div
              className={`absolute inset-0 ${selectedMemory ? 'pointer-events-none opacity-25' : 'opacity-100'} transition-opacity duration-300`}
            >
              <GalleryGlobe
                memories={globeMemories}
                folderName="The Globe Memory Walk"
                onSelect={(memory) => setSelectedMemory(memory)}
                onResetView={() => setSelectedMemory(null)}
              />
            </div>

            {/* Memory Details Modal */}
            <AnimatePresence>
              {selectedMemory && (
                <LocationDetailsScreen
                  key={selectedMemory.id}
                  memory={selectedMemory}
                  allMemories={globeMemories}
                  onSelectMemory={(mem) => setSelectedMemory(mem)}
                  onClose={() => setSelectedMemory(null)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Other Initial Worlds (Prism, Forest, Observatory, Theater) */}
        {activeWorld !== 'lobby' && activeWorld !== 'globe' && activeConfig && (
          <motion.div
            key={`world-${activeWorld}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.4 }}
            className="w-full h-full relative"
          >
            {!isFolderConfigured ? (
              <UnconfiguredWorldNotice world={activeConfig} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white bg-slate-950">
                <p className="text-sm font-light">Loading world collection...</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Cinematic Transition Curtain Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="transition-curtain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.45 }}
            className="fixed inset-0 z-50 bg-black pointer-events-auto flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs tracking-widest uppercase text-white/60 font-light">
                Traversing Sanctuary...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
