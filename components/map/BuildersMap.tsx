"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Builder } from "./MapboxMap";

const MapboxMap = dynamic(() => import("./MapboxMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 rounded-xl animate-pulse" />
  ),
});

export default function BuildersMap() {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [selectedBuilder, setSelectedBuilder] = useState<Builder | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/users/map")
      .then((res) => res.json())
      .then((data) => setBuilders(data.users ?? []))
      .catch(() => setError("Failed to load map data"));
  }, []);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
        Add NEXT_PUBLIC_MAPBOX_TOKEN to show the map
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border">
      <MapboxMap
        builders={builders}
        selectedBuilder={selectedBuilder}
        onSelectBuilder={setSelectedBuilder}
        mapboxToken={token}
      />
    </div>
  );
}
