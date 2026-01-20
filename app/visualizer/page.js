"use client";

import React, { useState, useEffect } from "react";
import Node from "./components/Node"; // Ensure this path matches your file structure
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";
import { recursiveBactracker } from "./algorithms/maze";

const GRID_ROWS = 20;
const GRID_COLS = 40;

const DEFAULT_START = { row: 10, col: 10 };
const DEFAULT_END = { row: 10, col: 30 };

export default function VisualizerPage() {
  const [grid, setGrid] = useState([]);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [startPos, setStartPos] = useState(DEFAULT_START);
  const [endPos, setEndPos] = useState(DEFAULT_END);

  const [selectionMode, setSelectionMode] = useState("WALL"); // 'start' | 'end' | null

  useEffect(() => {
    const initialGrid = createInitialGrid();
    setGrid(initialGrid);
  }, []);

  const createInitialGrid = () => {
    const nodes = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < GRID_COLS; col++) {
        currentRow.push(createNode(row, col));
      }
      nodes.push(currentRow);
    }
    return nodes;
  };

  const createNode = (row, col) => ({
    row,
    col,
    isStart: row === startPos.row && col === startPos.col,
    isFinish: row === endPos.row && col === endPos.col,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  });

  const handleNodeInteraction = (row, col) => {
    const newGrid = [...grid];
    const node = newGrid[row][col];

    if (selectionMode === "START") {
      newGrid[startPos.row][startPos.col].isStart = false;
      node.isStart = true;
      node.isWall = false;
      setStartPos({ row, col });
      setSelectionMode("WALL");
    } else if (selectionMode === "END") {
      newGrid[endPos.row][endPos.col].isFinish = false;
      node.isFinish = true;
      node.isWall = false;
      setEndPos({ row, col });
      setSelectionMode("WALL");
    } else {
      if (!node.isStart && !node.isFinish) {
        node.isWall = !node.isWall;
      }
    }
    setGrid(newGrid);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed || selectionMode !== "WALL") return;
    handleNodeInteraction(row, col);
  };

  const toggleWall = (row, col) => {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    if (!node.isStart && !node.isFinish) {
      newGrid[row][col] = { ...node, isWall: !node.isWall };
      setGrid(newGrid);
    }
  };

  const generateMaze = () => {
    const newGrid = createInitialGrid();
    const mazeGrid = recursiveBactracker(newGrid);
    setGrid([...mazeGrid]);
  };

  const visualizeDijkstra = () => {
    const currentGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
      })),
    );

    // Use currentGrid here, NOT the state 'grid'
    const startNode = currentGrid[startPos.row][startPos.col];
    const finishNode = currentGrid[endPos.row][endPos.col];
    
    // Pass currentGrid to the algorithm
    const visitedNodesInOrder = dijkstra(currentGrid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

    // Update state so the logic knows the grid has been "cleaned"
    setGrid(currentGrid); 

    if (!visitedNodesInOrder || visitedNodesInOrder.length <= 1) {
      alert("No path found!");
      return;
    }
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
};
  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }

      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`,
        );

        // DEBUG: If this logs null, your IDs are wrong!
        if (nodeElement && !node.isStart && !node.isFinish) {
          nodeElement.className =
            "w-[25px] h-[25px] border-[0.5px] border-brand-ochre/10 transition-all duration-500 bg-node-visited scale-110";
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const el = document.getElementById(`node-${node.row}-${node.col}`);
        if (el) {
          // Use !important or specific utility classes to ensure visibility
          el.style.backgroundColor = "#dda15e"; // Your brand-ochre color
          el.style.transition = "background-color 0.5s ease-out";
          el.classList.add("z-10", "scale-110");
        }
      }, 50 * i);
    }
  };

  /**
   * PHASE 3: EXECUTION LOGIC
   */

  return (
    <div className="min-h-screen bg-brand-paper py-12 px-4 flex flex-col items-center">
      {/* Toolbar with Toggle Buttons */}
      <div className="w-full max-w-6xl mb-8 p-4 bg-brand-dark rounded-lg shadow-xl flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={visualizeDijkstra}
            className="px-4 py-2 bg-brand-earth text-white font-bold rounded hover:bg-brand-ochre transition-all text-xs uppercase tracking-widest active:scale-95"
          >
            Run Dijkstra
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-stone-500 text-stone-300 font-bold rounded hover:bg-stone-800 transition-colors text-xs uppercase tracking-widest"
          >
            Reset
          </button>
          <button
            onClick={generateMaze}
            className="px-4 py-2 border border-brand-ochre text-brand-ochre font-bold rounded hover:bg-brand-ochre hover:text-white transition-all text-xs uppercase"
          >
            Generate Maze
          </button>
        </div>

        {/* Selection Mode Toggles */}
        <div className="flex gap-2 bg-stone-800 p-1 rounded-md">
          <ModeButton
            active={selectionMode === "START"}
            onClick={() => setSelectionMode("START")}
            label="Set Start"
            color="bg-brand-ochre"
          />
          <ModeButton
            active={selectionMode === "END"}
            onClick={() => setSelectionMode("END")}
            label="Set End"
            color="bg-red-800"
          />
          <ModeButton
            active={selectionMode === "WALL"}
            onClick={() => setSelectionMode("WALL")}
            label="Draw Walls"
            color="bg-stone-600"
          />
        </div>
      </div>

      {/* The Grid */}
      <div
        className="grid border-[1px] border-brand-dark/20 shadow-2xl bg-white/50 backdrop-blur-sm"
        onMouseDown={() => setIsMousePressed(true)}
        onMouseUp={() => setIsMousePressed(false)}
        style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 25px)` }}
      >
        {grid.map((row, rowIdx) => (
          <React.Fragment key={rowIdx}>
            {row.map((node, nodeIdx) => (
              <Node
                key={nodeIdx}
                node={node}
                onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                onMouseDown={() => handleNodeInteraction(node.row, node.col)}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  function ModeButton({ active, onClick, label, color }) {
    return (
      <button
        onClick={onClick}
        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-tighter rounded transition-all ${
          active
            ? `${color} text-white ring-2 ring-white/20`
            : "text-stone-400 hover:text-stone-200"
        }`}
      >
        {label}
      </button>
    );
  }
}
