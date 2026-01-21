import { getHaversineDistance } from "./geodesic";

export function runMapAStar(startNodeId, endNodeId, adjacencyList, nodesMap) {
  const goalCoords = nodesMap.get(endNodeId);
  const distances = {}; // g-score: distance from start
  const fScores = {}; // f-score: g-score + heuristic (distance to goal)
  const previous = {};
  const openSet = new Set([startNodeId]);

  adjacencyList.forEach((_, node) => {
    distances[node] = Infinity;
    fScores[node] = Infinity;
    previous[node] = null;
  });

  distances[startNodeId] = 0;
  fScores[startNodeId] = getHaversineDistance(
    nodesMap.get(startNodeId),
    goalCoords,
  );

  while (openSet.size > 0) {
    // Pick the node in openSet with the lowest fScore
    let curr = null;
    for (let node of openSet) {
      if (curr === null || fScores[node] < fScores[curr]) curr = node;
    }

    if (curr === endNodeId) break;
    openSet.delete(curr);

    const neighbors = adjacencyList.get(curr) || [];
    for (let neighbor of neighbors) {
      const tentativeGScore = distances[curr] + neighbor.weight;

      if (tentativeGScore < distances[neighbor.node]) {
        previous[neighbor.node] = curr;
        distances[neighbor.node] = tentativeGScore;
        const h = getHaversineDistance(nodesMap.get(neighbor.node), goalCoords);
        const epsilon = 1.05;
        fScores[neighbor.node] = tentativeGScore + h * epsilon;

        openSet.add(neighbor.node);
      }
    }
  }

  // Reconstruct path
  const path = [];
  let temp = endNodeId;
  while (temp !== null) {
    path.unshift(temp);
    temp = previous[temp];
  }
  return path;
}
