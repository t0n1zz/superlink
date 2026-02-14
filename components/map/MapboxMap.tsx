"use client";

import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

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
      initialViewState={{
        longitude: 118.0,
        latitude: -2.5,
        zoom: 4,
      }}
      style={{ width: "100%", height: 600 }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={mapboxToken}
    >
      {builders.map((builder) => (
        <Marker
          key={builder.id}
          longitude={builder.longitude}
          latitude={builder.latitude}
          onClick={() => onSelectBuilder(builder)}
        >
          <div className="w-8 h-8 bg-purple-600 rounded-full border-2 border-white cursor-pointer hover:scale-110 transition shadow" />
        </Marker>
      ))}
      {selectedBuilder && (
        <Popup
          longitude={selectedBuilder.longitude}
          latitude={selectedBuilder.latitude}
          onClose={() => onSelectBuilder(null)}
        >
          <div className="p-2 min-w-[140px]">
            <h3 className="font-bold">
              {selectedBuilder.name ?? "Builder"}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedBuilder.city ?? "—"}
            </p>
            <p className="text-sm font-semibold">
              FairScore: {selectedBuilder.fairScore}
            </p>
          </div>
        </Popup>
      )}
    </Map>
  );
}
