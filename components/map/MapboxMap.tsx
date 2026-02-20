"use client";

import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

// Use Mapbox CDN worker so the map works in Next.js (bundled worker can fail with Turbopack/webpack).
const MAPBOX_GL_VERSION = "3.18.1";
const MAPBOX_WORKER_URL = `https://api.mapbox.com/mapbox-gl-js/v${MAPBOX_GL_VERSION}/mapbox-gl-csp-worker.js`;

export interface Builder {
  id: string;
  name: string | null;
  city: string | null;
  latitude: number;
  longitude: number;
  fairScore: number;
  profilePhoto: string | null;
}

interface MapboxMapProps {
  builders: Builder[];
  selectedBuilder: Builder | null;
  onSelectBuilder: (b: Builder | null) => void;
  mapboxToken: string;
}

export default function MapboxMap({
  builders,
  selectedBuilder,
  onSelectBuilder,
  mapboxToken,
}: MapboxMapProps) {
  return (
    <Map
      mapboxAccessToken={mapboxToken}
      initialViewState={{
        longitude: 118.0,
        latitude: -2.5,
        zoom: 4,
      }}
      style={{ width: "100%", height: 600 }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      workerUrl={MAPBOX_WORKER_URL}
      onError={(e) => {
        console.error("Mapbox error:", e.error);
      }}
    >
      {builders.map((builder) => (
        <Marker
          key={builder.id}
          longitude={builder.longitude}
          latitude={builder.latitude}
          onClick={() => onSelectBuilder(builder)}
        >
          <div className="h-8 w-8 rounded-full border-2 border-white bg-indigo-600 shadow transition hover:scale-110 cursor-pointer" />
        </Marker>
      ))}
      {selectedBuilder && (
        <Popup
          longitude={selectedBuilder.longitude}
          latitude={selectedBuilder.latitude}
          onClose={() => onSelectBuilder(null)}
        >
          <div className="min-w-[140px] p-2">
            <h3 className="font-bold text-slate-900">
              {selectedBuilder.name ?? "Builder"}
            </h3>
            <p className="text-sm text-slate-600">
              {selectedBuilder.city ?? "—"}
            </p>
            <p className="text-sm font-semibold text-slate-900">
              FairScore: {selectedBuilder.fairScore}
            </p>
          </div>
        </Popup>
      )}
    </Map>
  );
}
