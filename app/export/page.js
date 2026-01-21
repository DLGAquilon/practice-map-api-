"use client";

import React, { useState } from "react";
import { useGrid } from "@/context/GridContext";

export default function ExportPage() {
  const { gridRows, gridCols } = useGrid();
  const [exportData, setExportData] = useState(null);

  const handleGenerateExport = () => {
    // In a real scenario, we would pull the 'grid' state from Context
    // or a shared state. For now, we'll create the schema.
    const schema = {
      metadata: {
        version: "1.0.0",
        timestamp: new Date().toISOString(),
        dimensions: { rows: gridRows, cols: gridCols },
      },
      layers: {
        walls: [], // Array of {r, c}
        pathfinding: "dijkstra_optimized",
      },
    };

    setExportData(JSON.stringify(schema, null, 2));
  };

  return (
    <div className="bg-brand-paper min-h-screen py-20 px-6 font-roboto">
      <article className="max-w-3xl mx-auto">
        <span className="text-brand-earth font-bold tracking-widest uppercase text-xs underline decoration-brand-ochre/40">
          Technical Manuscript // 004
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mt-4 mb-8">
          Data Serialization <br /> & Portability
        </h1>

        <section className="prose prose-stone">
          <p className="text-lg text-stone-700 leading-relaxed mb-12 font-serif italic">
            "The value of a coordinate system lies in its ability to be
            translated. By serializing the grid state, we transform a visual
            experience into a portable data asset."
          </p>

          <div className="grid grid-cols-1 gap-8">
            {/* Export Action */}
            <div className="p-8 bg-stone-100 border border-stone-200 rounded-xl">
              <h3 className="font-bold text-brand-dark uppercase text-sm mb-4">
                Export Current Configuration
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Generates a standardized JSON object containing grid dimensions,
                obstacle coordinates, and start/end vectors.
              </p>

              <button
                onClick={handleGenerateExport}
                className="w-full py-4 bg-brand-dark text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-earth transition-all shadow-lg active:scale-95"
              >
                Generate JSON Payload
              </button>
            </div>

            {/* Output Display */}
            {exportData && (
              <div className="relative group">
                <div className="absolute -top-3 left-6 bg-brand-ochre px-3 py-1 text-[10px] text-white font-bold uppercase tracking-widest rounded">
                  Raw Output // JSON
                </div>
                <pre className="bg-brand-dark p-8 pt-10 rounded-xl text-brand-paper font-mono text-[11px] overflow-x-auto shadow-2xl border-t-4 border-brand-earth">
                  {exportData}
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(exportData)}
                  className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors"
                  title="Copy to Clipboard"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Technical Specs */}
          <div className="mt-16 border-t border-stone-200 pt-12">
            <h2 className="text-2xl font-bold text-brand-dark uppercase tracking-tighter mb-6">
              Schema Specifications
            </h2>
            <div className="space-y-6">
              <SpecItem
                title="Coordinate Encoding"
                desc="Obstacles are stored as a flat array of integers to reduce payload size, mapped as (row * totalCols) + col."
              />
              <SpecItem
                title="Vector Format"
                desc="Start and End points are exported as normalized objects {r, c} for direct injection into pathfinding heuristics."
              />
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}

function SpecItem({ title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="w-1.5 h-1.5 bg-brand-ochre rounded-full mt-1.5 shrink-0"></div>
      <div>
        <h4 className="text-sm font-bold text-brand-dark uppercase tracking-wide">
          {title}
        </h4>
        <p className="text-xs text-stone-500 leading-relaxed mt-1">{desc}</p>
      </div>
    </div>
  );
}
