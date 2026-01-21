import { getHaversineDistance } from "./geodesic";

export async function getGraphData(start, end) {
    const dist = getHaversineDistance(start, end);
  // 1. Define bounding box
  const buffer = dist > 10? 0.03: 0.01;
  const bbox = `${Math.min(start.lat, end.lat) - buffer},${Math.min(start.lng, end.lng) - buffer},${Math.max(start.lat, end.lat) + buffer},${Math.max(start.lng, end.lng) + buffer}`;

  // 2. Overpass Query: Fetch roads (ways) and their nodes
  const query = `[out:json][timeout:60];
  way["highway"~"primary|secondary|tertiary|residential|trunk"](${bbox});
  out body;>;out skel qt;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  const data = await response.json();

  // 3. Build Adjacency List
  const adjacencyList = new Map();
  const nodesMap = new Map(); // Stores lat/lng for each node ID

  // Map node details
  data.elements.forEach(el => {
    if (el.type === "node") {
      nodesMap.set(el.id, { lat: el.lat, lng: el.lon });
    }
  });

  // Connect nodes based on roads (ways)
  data.elements.forEach(el => {
    if (el.type === "way" && el.nodes) {
      for (let i = 0; i < el.nodes.length - 1; i++) {
        const u = el.nodes[i];
        const v = el.nodes[i + 1];
        const dist = getHaversineDistance(nodesMap.get(u), nodesMap.get(v));

        if (!adjacencyList.has(u)) adjacencyList.set(u, []);
        if (!adjacencyList.has(v)) adjacencyList.set(v, []);

        adjacencyList.get(u).push({ node: v, weight: dist });
        adjacencyList.get(v).push({ node: u, weight: dist }); // Undirected graph
      }
    }
  });

  return { adjacencyList, nodesMap };
}