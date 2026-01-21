"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
// Ensure this helper exists to calculate weights later
import { getHaversineDistance } from "@/algorithms/geodesic";
import { getGraphData } from "@/algorithms/mapData";
import { runMapAStar } from "@/algorithms/mapDijkstra";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-stone-100 animate-pulse rounded-xl" />
  ),
});

export default function MapEnginePage() {
  const [points, setPoints] = useState({ start: null, end: null });
  const [path, setPath] = useState([]); // To store the line coordinates
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [animInterval, setAnimInterval] = useState(null);

  const findClosest = (clickedPoint, nodesMap) => {
    let closestId = null;
    let minDistance = Infinity;

    nodesMap.forEach((coords, id) => {
      // We use the Haversine formula to calculate real-world distance
      const dist = getHaversineDistance(clickedPoint, coords);
      if (dist < minDistance) {
        minDistance = dist;
        closestId = id;
      }
    });

    return closestId;
  };

  const handleExecute = async () => {
    if (!points.start || !points.end) return;

    setIsSelecting(false);
    setIsCalculating(true);

    // NUMBER 2 IMPLEMENTATION:
    // Clear any existing animation interval before starting a new calculation.
    // This prevents Error 1 (appendChild) by ensuring two intervals aren't
    // fighting to update the map at the same time.
    if (animInterval) {
      clearInterval(animInterval);
      setAnimInterval(null);
    }

    setPath([]);

    try {
      // 1. Fetch real road data from Overpass API
      const { adjacencyList, nodesMap } = await getGraphData(
        points.start,
        points.end,
      );

      // 2. Find the nearest "Road Node" to where you clicked
      const startId = findClosest(points.start, nodesMap);
      const endId = findClosest(points.end, nodesMap);

      // 3. Run the A* algorithm on the road network
      const resultIds = runMapAStar(startId, endId, adjacencyList, nodesMap);

      // 4. Transform Node IDs into an array of [lat, lng]
      const fullPath = resultIds
        .map((id) => {
          const node = nodesMap.get(id);
          return node ? [node.lat, node.lng] : null;
        })
        .filter((coord) => coord !== null);

      if (fullPath.length === 0) {
        throw new Error("Path result is empty");
      }

      // 5. Update the state (Sequential Animation)
      let i = 0;
      const stepSize = fullPath.length > 200 ? 5 : 1;
      const interval = setInterval(() => {
        setPath((prev) => {
          if (i >= fullPath.length) {
            clearInterval(interval);
            return prev;
          }
          return [...fullPath.slice(0, i + stepSize)];
        });

        i += stepSize;
        if (i >= fullPath.length) clearInterval(interval);
      }, 20);

      // Store the interval ID in state so it can be cleaned up if the user
      // clicks "Execute" again or leaves the page.
      setAnimInterval(interval);
    } catch (error) {
      console.error("Pathfinding Error:", error);
      alert("Could not find a road path between these points.");
    } finally {
      setIsCalculating(false);
    }
  };

  const clearBoard = () => {
    setPoints({ start: null, end: null });
    setPath([]);
  };

  return (
    <div className="bg-brand-paper min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-stone-200 pb-8">
          <span className="text-brand-earth font-bold tracking-[0.3em] uppercase text-[10px]">
            Geospatial Analysis // 001
          </span>
          <h1 className="text-5xl font-bold text-brand-dark mt-4">
            Map Routing Engine
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-3 space-y-8">
            <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
              <h3 className="text-xs font-bold uppercase text-stone-400 tracking-widest mb-4">
                Waypoints
              </h3>
              <div className="space-y-4">
                <StatusIndicator
                  label="Start"
                  value={points.start}
                  color="bg-brand-ochre"
                />
                <StatusIndicator
                  label="End"
                  value={points.end}
                  color="bg-red-800"
                />
              </div>

              <button
                onClick={() => setIsSelecting(!isSelecting)}
                className={`w-full py-3 mt-5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all border-2 ${
                  isSelecting
                    ? "bg-brand-ochre border-brand-ochre text-white"
                    : "border-stone-200 text-stone-500 hover:border-brand-ochre"
                }`}
              >
                {isSelecting ? "Selection Enabled" : "Enable Point Selection"}
              </button>
              <button
                onClick={handleExecute}
                // Disable if calculating OR if points are missing
                disabled={isCalculating || !points.start || !points.end}
                className={`w-full mt-6 py-4 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95 shadow-lg ${
                  isCalculating || !points.start || !points.end
                    ? "bg-stone-300 cursor-not-allowed opacity-70"
                    : "bg-brand-dark hover:bg-brand-earth shadow-brand-earth/20"
                }`}
              >
                {isCalculating
                  ? "Calculating Path..."
                  : !points.start || !points.end
                    ? "Select Both Points"
                    : "Run Optimized Path"}
              </button>

              <button
                onClick={() => {
                  setPoints({ start: null, end: null });
                  setPath([]);
                  setIsSelecting(false); // Stop selection mode on clear
                }}
                className="w-full mt-2 py-2 text-[10px] font-bold uppercase text-stone-400 hover:text-red-800 transition-colors"
              >
                Clear All Data
              </button>
            </div>
          </aside>

          <main className="lg:col-span-9 relative">
            {/* PASS PATH DOWN TO MAP */}
            <LeafletMap
              points={points}
              setPoints={setPoints}
              path={path}
              isSelecting={isSelecting}
            />

            {/* Visual Feedback Overlay */}
            {isCalculating && (
              <div className="absolute inset-0 z-[1000] bg-brand-paper/40 backdrop-blur-[2px] flex items-center justify-center rounded-xl">
                <div className="bg-brand-dark text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-brand-ochre border-t-transparent animate-spin rounded-full"></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    Searching Nodes...
                  </span>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function StatusIndicator({ label, value, color }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-bold text-stone-400 uppercase">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="font-mono text-xs text-brand-dark">
          {value
            ? `${value.lat.toFixed(4)}, ${value.lng.toFixed(4)}`
            : "Awaiting selection..."}
        </span>
      </div>
    </div>
  );
}
