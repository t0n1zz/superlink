"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface User {
  id: string;
  walletAddress: string;
  name: string | null;
  email: string | null;
  userType: string;
  fairScore: number;
  fairScoreTier: string;
  [key: string]: unknown;
}

interface CurrentUserContextValue {
  user: User | null;
  loading: boolean;
  refetch: () => Promise<void>;
  register: (data: {
    name?: string;
    email?: string;
    userType?: string;
  }) => Promise<User>;
}

const CurrentUserContext = createContext<CurrentUserContextValue | null>(null);

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const { publicKey, connected } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!publicKey?.toBase58()) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/users/me?walletAddress=${encodeURIComponent(publicKey.toBase58())}`
      );
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    refetch();
  }, [refetch, connected]);

  const register = useCallback(
    async (data: { name?: string; email?: string; userType?: string }) => {
      const address = publicKey?.toBase58();
      if (!address) throw new Error("Wallet not connected");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: address,
          name: data.name,
          email: data.email,
          userType: data.userType ?? "BUILDER",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Registration failed");
      setUser(json.user);
      return json.user;
    },
    [publicKey]
  );

  return (
    <CurrentUserContext.Provider
      value={{ user, loading, refetch, register }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const ctx = useContext(CurrentUserContext);
  if (!ctx) throw new Error("useCurrentUser must be used within CurrentUserProvider");
  return ctx;
}
