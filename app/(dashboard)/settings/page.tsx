"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCurrentUser } from "@/components/auth/CurrentUserContext";
import { useWallet } from "@solana/wallet-adapter-react";

export default function SettingsPage() {
  const { user, loading, refetch } = useCurrentUser();
  const { connected } = useWallet();
  const router = useRouter();
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [studentForm, setStudentForm] = useState({
    university: "",
    major: "",
    graduationYear: "",
    studentId: "",
    studentEmail: "",
  });
  const [studentSubmitting, setStudentSubmitting] = useState(false);
  const [studentMessage, setStudentMessage] = useState<string | null>(null);
  const [superteamUsername, setSuperteamUsername] = useState("");
  const [superteamSubmitting, setSuperteamSubmitting] = useState(false);
  const [superteamMessage, setSuperteamMessage] = useState<string | null>(null);

  const handleSyncFairScore = async () => {
    if (!user) return;
    setSyncing(true);
    setSyncMessage(null);
    try {
      const res = await fetch("/api/fairscale/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          walletAddress: user.walletAddress,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Sync failed");
      setSyncMessage(
        `FairScore updated: ${data.fairScore?.score ?? "—"}`
      );
    } catch (err) {
      setSyncMessage(
        err instanceof Error ? err.message : "Sync failed"
      );
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Loading…
      </div>
    );
  }

  if (!connected || !user) {
    return (
      <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mb-4 text-slate-600">
          Connect your wallet to access settings.
        </p>
        <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
          Go to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Profile</h2>
        <Link
          href="/profile/edit"
          className="block rounded-xl border-2 border-slate-200 p-4 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Edit your profile (name, bio, location, social links)
        </Link>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">FairScore</h2>
        <p className="mb-3 text-sm text-slate-600">
          Your current FairScore: <strong className="text-slate-900">{user.fairScore}</strong> (
          {user.fairScoreTier})
        </p>
        <button
          type="button"
          onClick={handleSyncFairScore}
          disabled={syncing}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {syncing ? "Syncing…" : "Sync FairScore"}
        </button>
        {syncMessage && (
          <p
            className={
              syncMessage.startsWith("FairScore updated")
                ? "text-emerald-600 text-sm font-medium"
                : "text-red-600 text-sm font-medium"
            }
          >
            {syncMessage}
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Student verification</h2>
        <p className="mb-4 text-sm text-slate-600">
          Verify as a student to get a FairScore bonus. Use a .ac.id email for
          instant verification.
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!user) return;
            setStudentSubmitting(true);
            setStudentMessage(null);
            try {
              const res = await fetch("/api/students/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  userId: user.id,
                  university: studentForm.university || undefined,
                  major: studentForm.major || undefined,
                  graduationYear: studentForm.graduationYear
                    ? parseInt(studentForm.graduationYear, 10)
                    : undefined,
                  studentId: studentForm.studentId || undefined,
                  studentEmail: studentForm.studentEmail || undefined,
                }),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.error ?? "Verification failed");
              setStudentMessage(
                data.verified
                  ? "Verified! Your FairScore has been updated."
                  : "Submitted. Manual verification may be required."
              );
              await refetch();
            } catch (err) {
              setStudentMessage(
                err instanceof Error ? err.message : "Verification failed"
              );
            } finally {
              setStudentSubmitting(false);
            }
          }}
          className="max-w-md space-y-3"
        >
          <input
            type="text"
            value={studentForm.university}
            onChange={(e) =>
              setStudentForm((f) => ({ ...f, university: e.target.value }))
            }
            placeholder="University name"
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <input
            type="text"
            value={studentForm.major}
            onChange={(e) =>
              setStudentForm((f) => ({ ...f, major: e.target.value }))
            }
            placeholder="Major"
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <input
            type="number"
            value={studentForm.graduationYear}
            onChange={(e) =>
              setStudentForm((f) => ({ ...f, graduationYear: e.target.value }))
            }
            placeholder="Graduation year"
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <input
            type="text"
            value={studentForm.studentId}
            onChange={(e) =>
              setStudentForm((f) => ({ ...f, studentId: e.target.value }))
            }
            placeholder="Student ID (optional)"
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <input
            type="email"
            value={studentForm.studentEmail}
            onChange={(e) =>
              setStudentForm((f) => ({ ...f, studentEmail: e.target.value }))
            }
            placeholder="Student email (.ac.id for auto-verify)"
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          {studentMessage && (
            <p
              className={
                studentMessage.includes("Verified")
                  ? "text-emerald-600 text-sm font-medium"
                  : "text-amber-600 text-sm font-medium"
              }
            >
              {studentMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={studentSubmitting}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {studentSubmitting ? "Submitting…" : "Submit verification"}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Superteam Earn</h2>
        <p className="mb-4 text-sm text-slate-600">
          Import your Superteam Earn (earn.superteam.fun) profile to boost your
          FairScore based on completed bounties.
        </p>
        <div className="flex max-w-md flex-wrap items-end gap-2">
          <input
            type="text"
            value={superteamUsername}
            onChange={(e) => setSuperteamUsername(e.target.value)}
            placeholder="Your earn username"
            className="min-w-[160px] flex-1 rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <button
            type="button"
            onClick={async () => {
              if (!user || !superteamUsername.trim()) return;
              setSuperteamSubmitting(true);
              setSuperteamMessage(null);
              try {
                const res = await fetch("/api/superteam/import", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId: user.id,
                    username: superteamUsername.trim(),
                  }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error ?? "Import failed");
                setSuperteamMessage(
                  `Imported. Score boost: +${data.scoreBoost ?? 0}. New FairScore: ${data.newFairScore ?? user.fairScore}`
                );
                await refetch();
              } catch (err) {
                setSuperteamMessage(
                  err instanceof Error ? err.message : "Import failed"
                );
              } finally {
                setSuperteamSubmitting(false);
              }
            }}
            disabled={superteamSubmitting}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {superteamSubmitting ? "Importing…" : "Import"}
          </button>
        </div>
        {superteamMessage && (
          <p
            className={
              superteamMessage.startsWith("Imported")
                ? "mt-2 text-sm font-medium text-emerald-600"
                : "mt-2 text-sm font-medium text-red-600"
            }
          >
            {superteamMessage}
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Account</h2>
        <p className="font-mono text-sm text-slate-600">
          {user.walletAddress}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Your account is linked to your Solana wallet. Disconnect from the
          wallet button in the nav to sign out.
        </p>
      </section>
    </div>
  );
}
