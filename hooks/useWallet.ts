"use client";

import { useWallet } from "@solana/wallet-adapter-react";

export function useWalletAddress() {
  const { publicKey, connected } = useWallet();
  return {
    address: publicKey?.toBase58() ?? null,
    connected,
  };
}
