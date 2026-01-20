"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(40);
  const [allowDiagonal, setAllowDiagonal] = useState(false);
  const [nodeSize, setNodeSize] = useState(25);

  return (
    <div className="bg-brand-paper min-h-screen py-20 px-6 font-roboto">
      <article className="max-w-3xl mx-auto">
        <span className="text-brand-earth font-bold tracking-widest uppercase text-xs">System Configuration // 002</span>
        <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mt-4 mb-12">
          Grid & Engine <br/> Parameters
        </h1>

        <div className="space-y-12">
          {/* Section 1: Dimensions */}
          <section className="p-8 bg-stone-50/50 border border-stone-200 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-brand-dark uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-6 bg-brand-earth rounded-full"></span>
              Grid Dimensions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SettingSlider 
                label="Rows" 
                value={rows} 
                min={10} max={50} 
                onChange={(e) => setRows(e.target.value)} 
              />
              <SettingSlider 
                label="Columns" 
                value={cols} 
                min={10} max={80} 
                onChange={(e) => setCols(e.target.value)} 
              />
            </div>
            <p className="mt-4 text-[10px] text-stone-400 uppercase italic">
              * Increasing dimensions will increase complexity to $O(V \log V)$ where $V = Rows \times Cols$.
            </p>
          </section>

          {/* Section 2: Algorithm Behavior */}
          <section className="p-8 bg-stone-50/50 border border-stone-200 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-brand-dark uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-6 bg-brand-ochre rounded-full"></span>
              Heuristic & Logic
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-brand-dark text-sm uppercase">Allow Diagonal Movement</h4>
                  <p className="text-xs text-stone-500">Enable 8-directional search instead of the standard 4-way Manhattan distance.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={allowDiagonal}
                  onChange={() => setAllowDiagonal(!allowDiagonal)}
                  className="w-5 h-5 accent-brand-earth cursor-pointer"
                />
              </div>

              <div className="border-t border-stone-200 pt-6">
                <SettingSlider 
                  label="Node Scale (px)" 
                  value={nodeSize} 
                  min={15} max={40} 
                  onChange={(e) => setNodeSize(e.target.value)} 
                />
              </div>
            </div>
          </section>

          {/* Save Action */}
          <div className="flex justify-end gap-4">
            <button className="px-6 py-2 text-xs font-bold uppercase text-stone-500 hover:text-brand-dark transition-colors">
              Reset to Defaults
            </button>
            <button className="px-10 py-3 bg-brand-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-earth transition-all shadow-lg active:scale-95">
              Apply Changes
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

function SettingSlider({ label, value, min, max, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-end">
        <label className="font-bold text-brand-dark text-xs uppercase tracking-wider">{label}</label>
        <span className="text-lg font-mono text-brand-earth font-bold">{value}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={onChange}
        className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-brand-earth"
      />
    </div>
  );
}