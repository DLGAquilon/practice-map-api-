import React from 'react';

const EnginePreviewVideo = () => {
  return (
    <div className="relative group w-full max-w-4xl mx-auto">
      {/* Decorative "Vintage Frame" Border */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-ochre to-brand-earth rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      
      <div className="relative bg-brand-dark rounded-lg overflow-hidden border border-white/10 shadow-2xl">
        {/* Top Bar - "System" UI feel */}
        <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">
            Engine_Preview.mp4
          </span>
        </div>

        {/* The Video Element */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-auto aspect-video object-cover"
        >
          <source src="./videos/0120.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Stats - Highlights your Min-Heap & Complexity work */}
        <div className="absolute bottom-4 left-4 p-3 bg-brand-dark/90 backdrop-blur-md rounded border border-brand-ochre/30 shadow-lg pointer-events-none">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-8 items-center">
              <span className="text-[9px] text-stone-400 uppercase">Complexity</span>
              <span className="text-[10px] text-brand-ochre font-bold">O(V log V)</span>
            </div>
            <div className="flex justify-between gap-8 items-center">
              <span className="text-[9px] text-stone-400 uppercase">Search Engine</span>
              <span className="text-[10px] text-brand-ochre font-bold">Min-Heap Optimized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnginePreviewVideo;