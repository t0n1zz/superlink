"use client";

import { useState, useCallback } from "react";

export function useFairScoreSync() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sync = useCallback(async (userId: string, walletAddress: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/fairscale/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, walletAddress }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Sync failed");
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sync failed");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sync, loading, error };
}
