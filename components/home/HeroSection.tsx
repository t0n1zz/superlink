"use client";

import Link from "next/link";
import { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCurrentUser } from "@/components/auth/CurrentUserContext";

export default function HeroSection() {
  const { connected } = useWallet();
  const { user, loading, register } = useCurrentUser();
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("BUILDER");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const u = await register({ name: name || undefined, userType });
      window.location.href = `/profile/${u.id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-800 text-white py-24 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white drop-shadow-sm">
          Reputation-Powered Connections
        </h1>
        <p className="text-lg md:text-xl mb-10 text-slate-200 max-w-2xl mx-auto leading-relaxed">
          Indonesia&apos;s verified Web3 talent network, powered by FairScale
        </p>

        {loading ? (
          <div className="text-slate-300 animate-pulse">Loading…</div>
        ) : user ? (
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/profile/${user.id}`}
              className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 shadow-lg transition hover:bg-slate-100 hover:shadow-xl"
            >
              My profile
            </Link>
            <Link
              href="/directory"
              className="rounded-xl border-2 border-white/90 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-indigo-600"
            >
              Browse Directory
            </Link>
            <Link
              href="/settings"
              className="rounded-xl border border-white/60 px-6 py-3 font-semibold text-white/95 transition hover:bg-white/10"
            >
              Settings
            </Link>
          </div>
        ) : connected ? (
          <>
            <div className="max-w-md mx-auto text-left rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 shadow-xl">
              <p className="font-semibold mb-4 text-white">Complete your profile</p>
              <form onSubmit={handleRegister} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-white placeholder:text-slate-300 focus:border-white/50 focus:ring-2 focus:ring-white/20"
                />
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-white focus:border-white/50 focus:ring-2 focus:ring-white/20 [&>option]:text-slate-900"
                >
                  <option value="BUILDER">Builder</option>
                  <option value="STUDENT">Student</option>
                  <option value="COMPANY">Company</option>
                  <option value="UNIVERSITY">University</option>
                </select>
                {error && (
                  <p className="text-red-200 text-sm font-medium">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-white py-3 font-semibold text-indigo-600 shadow transition hover:bg-slate-100 disabled:opacity-60"
                >
                  {submitting ? "Creating profile…" : "Create my profile"}
                </button>
              </form>
            </div>
            <Link
              href="/directory"
              className="inline-block mt-5 text-slate-200 text-sm font-medium hover:text-white transition"
            >
              Browse directory →
            </Link>
          </>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center">
            <WalletMultiButton className="!rounded-xl !bg-white !px-6 !py-3 !font-semibold !text-indigo-600 hover:!bg-slate-100 !shadow-lg !transition-all" />
            <Link
              href="/directory"
              className="rounded-xl border-2 border-white/90 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-indigo-600"
            >
              Browse Directory
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
