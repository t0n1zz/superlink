"use client";

import { useState } from "react";
import { useCurrentUser } from "@/components/auth/CurrentUserContext";

interface EndorseButtonProps {
  receiverId: string;
  onEndorsed?: () => void;
}

export default function EndorseButton({ receiverId, onEndorsed }: EndorseButtonProps) {
  const { user } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user || user.id === receiverId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/endorsements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          giverId: user.id,
          receiverId,
          message: message || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setOpen(false);
      setMessage("");
      onEndorsed?.();
      if (typeof window !== "undefined") window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="inline-block">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl border-2 border-indigo-600 px-4 py-2 font-semibold text-indigo-600 transition hover:bg-indigo-50"
        >
          Endorse
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="min-w-[260px] rounded-xl border border-slate-200 bg-white p-4 shadow-md">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say something nice…"
            rows={3}
            className="mb-3 w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          {error && <p className="mb-2 text-sm font-medium text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Send"}
            </button>
            <button
              type="button"
              onClick={() => { setOpen(false); setError(null); }}
              className="rounded-xl border-2 border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
