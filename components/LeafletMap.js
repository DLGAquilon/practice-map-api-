"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, memo } from "react";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LeafletMap = memo(function LeafletMap({
  points,
  setPoints,
  path = [],
  isSelecting,
}){
  const defaultCenter = [7.0167, 125.495];

  function MapEvents({ points, setPoints, isSelecting }) {
    const map = useMapEvents({
      click(e) {
        if (!isSelecting) return;

        if (!points.start) {
          setPoints({ ...points, start: e.latlng });
        } else if (!points.end) {
          setPoints({ ...points, end: e.latlng });
        } else {
          setPoints({ start: e.latlng, end: null });
        }
      },
    });

    useEffect(() => {
      if (isSelecting) {
        map.getContainer().style.cursor = "crosshair";
      } else {
        map.getContainer().style.cursor = "";
      }
    }, [isSelecting, map]);

    return null;
  }
  return(
    <div style={{ height: "600px", width: "100%", position: "relative" }}>
      <MapContainer 
        center={[7.0167, 125.495]} 
        zoom={15} 
        style={{ height: "100%", width: "100%" }}
        // FIX: Ensure the map doesn't try to re-initialize on every state change
        whenReady={(mapInstance) => {
          mapInstance.target.invalidateSize();
        }}
      >
         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 2. FIX: ACTUALLY CALL THE EVENTS HELPER */}
        <MapEvents points={points} setPoints={setPoints} isSelecting={isSelecting} />

        {/* 3. FIX: RENDER THE MARKERS AND THE PATH */}
        {points.start && <Marker position={points.start} icon={icon} />}
        {points.end && <Marker position={points.end} icon={icon} />}
        {path && path.length > 0 && (
          <Polyline positions={path} color="#dda15e" weight={5} opacity={0.8} />
        )}
      </MapContainer>
      </div>
  );
});

export default LeafletMap;

