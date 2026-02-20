"use client";

import { WalletProvider } from "@/components/auth/WalletProvider";
import { CurrentUserProvider } from "@/components/auth/CurrentUserContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <CurrentUserProvider>{children}</CurrentUserProvider>
    </WalletProvider>
  );
}
