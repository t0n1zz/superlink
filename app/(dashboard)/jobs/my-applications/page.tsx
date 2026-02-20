"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/components/auth/CurrentUserContext";

interface Application {
  id: string;
  jobId: string;
  status: string;
  coverLetter: string | null;
  proposedRate: number | null;
  createdAt: string;
  job: {
    id: string;
    title: string;
    category: string;
    poster: { id: string; name: string | null };
  };
}

export default function MyApplicationsPage() {
  const { user, loading } = useCurrentUser();
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/jobs/my-applications?applicantId=${encodeURIComponent(user.id)}`)
      .then((res) => res.json())
      .then((data) => setApplications(data.applications ?? []))
      .catch(() => setError("Failed to load"));
  }, [user]);

  if (loading) return <div className="max-w-3xl mx-auto p-6">Loading…</div>;
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-gray-600">Connect your wallet to see your applications.</p>
        <Link href="/" className="text-purple-600 hover:underline mt-2 inline-block">Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href="/jobs" className="text-sm text-purple-600 hover:underline mb-4 inline-block">
        ← Back to jobs
      </Link>
      <h1 className="text-2xl font-bold mb-6">My applications</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {applications.length === 0 ? (
        <p className="text-gray-500">You haven&apos;t applied to any jobs yet.</p>
      ) : (
        <ul className="space-y-3">
          {applications.map((app) => (
            <li key={app.id} className="border rounded-lg p-4">
              <Link
                href={`/jobs/${app.job.id}`}
                className="font-semibold text-purple-600 hover:underline"
              >
                {app.job.title}
              </Link>
              <p className="text-sm text-gray-500 mt-1">{app.job.category}</p>
              <p className="text-sm text-gray-600 mt-1">
                Posted by {app.job.poster.name ?? "Anonymous"}
              </p>
              <span className="inline-block mt-2 text-sm px-2 py-0.5 rounded bg-gray-100 capitalize">
                {app.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
