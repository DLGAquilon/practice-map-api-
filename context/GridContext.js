"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const GridContext = createContext();

export const GridProvider = ({ children }) => {
  const [gridRows, setGridRows] = useState(20);
  const [gridCols, setGridCols] = useState(40);
  const [allowDiagonal, setAllowDiagonal] = useState(false);
  const [nodeSize, setNodeSize] = useState(25);

  useEffect(() => {
    const saved = localStorage.getItem('pathfinder-settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      setGridRows(parsed.gridRows);
      setGridCols(parsed.gridCols);
      setAllowDiagonal(parsed.allowDiagonal);
      setNodeSize(parsed.nodeSize);
    }
  }, []);

  const saveSettings = () => {
    const config = { gridRows, gridCols, allowDiagonal, nodeSize};
    localStorage.setItem ("pathfinder-settings", JSON.stringify(config));
    alert("Configuration saved to browser memory.");
  }

  return (
    <GridContext.Provider
      value={{
        gridRows, setGridRows,
        gridCols, setGridCols,
        allowDiagonal, setAllowDiagonal,
        nodeSize, setNodeSize,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export const useGrid = () => useContext(GridContext);