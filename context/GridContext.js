"use client";

import React, { createContext, useContext, useState } from "react";

const GridContext = createContext();

export const GridProvider = ({ children }) => {
  const [gridRows, setGridRows] = useState(20);
  const [gridCols, setGridCols] = useState(40);
  const [allowDiagonal, setAllowDiagonal] = useState(false);
  const [nodeSize, setNodeSize] = useState(25);

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