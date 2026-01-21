"use client";
import React from "react";
import { useGrid } from "@/context/GridContext"; // Use @ to point to root context


export default function SettingsPage() {
  // Pull EVERYTHING from the context
  const {
    gridRows,
    setGridRows,
    gridCols,
    setGridCols,
    allowDiagonal,
    setAllowDiagonal,
    nodeSize,
    setNodeSize,
    saveSettings
  } = useGrid();

  return (
    <div className="bg-brand-paper min-h-screen py-20 px-6 font-roboto">
      <article className="max-w-3xl mx-auto">
        <span className="text-brand-earth font-bold tracking-widest uppercase text-xs underline decoration-brand-ochre/40">
          System Configuration // 002
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mt-4 mb-12">
          Grid & Engine <br /> Parameters
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
                value={gridRows}
                min={5}
                max={40}
                onChange={(e) => setGridRows(parseInt(e.target.value))}
              />
              <SettingSlider
                label="Columns"
                value={gridCols}
                min={5}
                max={80}
                onChange={(e) => setGridCols(parseInt(e.target.value))}
              />
            </div>
          </section>

          {/* Section 2: Algorithm Behavior */}
          <section className="p-8 bg-stone-50/50 border border-stone-200 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-brand-dark uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-6 bg-brand-ochre rounded-full"></span>
              Engine Logic
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-brand-dark text-sm uppercase">
                    Diagonal Search
                  </h4>
                  <p className="text-xs text-stone-500">
                    Enable 8-directional neighbor detection.
                  </p>
                </div>
                <button
                  onClick={() => setAllowDiagonal(!allowDiagonal)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${allowDiagonal ? "bg-brand-earth" : "bg-stone-300"}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${allowDiagonal ? "left-7" : "left-1"}`}
                  />
                </button>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <SettingSlider
                  label="Node Scale (px)"
                  value={nodeSize}
                  min={10}
                  max={50}
                  onChange={(e) => setNodeSize(parseInt(e.target.value))}
                />
              </div>
            </div>
          </section>
          <section className="mt-12 pt-8 border-t border-stone-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-md">
                <h4 className="text-sm font-bold text-brand-dark uppercase">
                  Persistence Engine
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Saving your configuration will store these parameters in your
                  local browser storage for future sessions.
                </p>
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-brand-dark transition-colors"
                >
                  Discard Changes
                </button>
                <button
                  onClick={saveSettings}
                  className="grow md:grow-0 px-10 py-4 bg-brand-dark text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-earth transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                  Commit Configuration
                </button>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}

function SettingSlider({ label, value, min, max, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-end font-mono">
        <label className="font-bold text-brand-dark text-[10px] uppercase tracking-widest">
          {label}
        </label>
        <span className="text-sm text-brand-earth font-bold">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-brand-earth"
      />
    </div>
  );
}
