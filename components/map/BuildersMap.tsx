"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Builder } from "./MapboxMap";

const MapboxMap = dynamic(() => import("./MapboxMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full animate-pulse rounded-xl border border-slate-200 bg-slate-100" />
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
      <div className="flex h-[400px] w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600">
        Add <code className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-sm">NEXT_PUBLIC_MAPBOX_TOKEN</code> to .env.local to show the map.
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200">
      <MapboxMap
        builders={builders}
        selectedBuilder={selectedBuilder}
        onSelectBuilder={setSelectedBuilder}
        mapboxToken={token}
      />
    </div>
  );
}
