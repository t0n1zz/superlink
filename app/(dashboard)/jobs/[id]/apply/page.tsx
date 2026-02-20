"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCurrentUser } from "@/components/auth/CurrentUserContext";

export default function JobApplyPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { user: currentUser, loading: userLoading } = useCurrentUser();
  const [job, setJob] = useState<{
    title: string;
    minFairScore: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ coverLetter: "", proposedRate: "" });

  useEffect(() => {
    if (!id) return;
    fetch(`/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch(() => setError("Job not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !currentUser) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/jobs/${id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicantId: currentUser.id,
          coverLetter: form.coverLetter || undefined,
          proposedRate: form.proposedRate ? parseInt(form.proposedRate, 10) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Application failed");
        return;
      }
      router.push(`/jobs/${id}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (userLoading || loading) return <div className="max-w-xl mx-auto p-6">Loading…</div>;
  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <p className="text-gray-600 mb-4">
          Connect your wallet and create a profile to apply for this job.
        </p>
        <Link href="/" className="text-purple-600 hover:underline">
          Go to homepage
        </Link>
      </div>
    );
  }
  if (error && !job) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <p className="text-red-600">{error}</p>
        <Link href="/jobs" className="text-purple-600 hover:underline mt-2 inline-block">
          Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <Link
        href={`/jobs/${id}`}
        className="text-sm text-purple-600 hover:underline mb-4 inline-block"
      >
        ← Back to job
      </Link>
      <h1 className="text-xl font-bold">Apply for {job?.title ?? "this job"}</h1>
      {job && (
        <p className="text-sm text-gray-500 mt-1">
          Minimum FairScore required: {job.minFairScore}
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium mb-1">Cover letter</label>
          <textarea
            value={form.coverLetter}
            onChange={(e) => setForm((f) => ({ ...f, coverLetter: e.target.value }))}
            rows={5}
            className="w-full border rounded-lg p-3"
            placeholder="Introduce yourself and why you're a good fit…"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Proposed rate (USDC, optional)</label>
          <input
            type="number"
            value={form.proposedRate}
            onChange={(e) => setForm((f) => ({ ...f, proposedRate: e.target.value }))}
            className="w-full border rounded-lg p-3"
            placeholder="e.g. 500"
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={submitting || !currentUser}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit application"}
        </button>
      </form>
    </div>
  );
}
