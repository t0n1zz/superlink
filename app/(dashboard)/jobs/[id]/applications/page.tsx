"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCurrentUser } from "@/components/auth/CurrentUserContext";
import { shortenAddress } from "@/lib/solana";

interface Applicant {
  id: string;
  name: string | null;
  walletAddress: string;
  fairScore: number;
  city: string | null;
  profilePhoto: string | null;
}

interface Application {
  id: string;
  coverLetter: string | null;
  proposedRate: number | null;
  status: string;
  createdAt: string;
  applicant: Applicant;
}

export default function JobApplicationsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { user, loading } = useCurrentUser();
  const [job, setJob] = useState<{ id: string } | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/jobs/${id}/applications`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data.job);
        setApplications(data.applications ?? []);
      })
      .catch(() => setLoadError("Failed to load"));
  }, [id]);

  if (loading) return <div className="max-w-3xl mx-auto p-6">Loading…</div>;
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-gray-600">Connect your wallet to view applications.</p>
        <Link href="/" className="text-purple-600 hover:underline mt-2 inline-block">Home</Link>
      </div>
    );
  }
  if (loadError || !job) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-red-600">{loadError ?? "Job not found"}</p>
        <Link href="/jobs" className="text-purple-600 hover:underline mt-2 inline-block">Back to jobs</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href={`/jobs/${id}`} className="text-sm text-purple-600 hover:underline mb-4 inline-block">
        ← Back to job
      </Link>
      <h1 className="text-2xl font-bold mb-2">Applications</h1>
      <p className="text-gray-600 mb-6">{applications.length} applicant(s)</p>
      {applications.length === 0 ? (
        <p className="text-gray-500">No applications yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  {app.applicant.profilePhoto ? (
                    <img
                      src={app.applicant.profilePhoto}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                      {(app.applicant.name ?? app.applicant.walletAddress).slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <Link
                      href={`/profile/${app.applicant.id}`}
                      className="font-semibold text-purple-600 hover:underline"
                    >
                      {app.applicant.name ?? shortenAddress(app.applicant.walletAddress)}
                    </Link>
                    <p className="text-sm text-gray-500">
                      FairScore: {app.applicant.fairScore}
                      {app.applicant.city && ` · ${app.applicant.city}`}
                    </p>
                  </div>
                </div>
                <span className="text-sm px-2 py-1 rounded bg-gray-100 capitalize">
                  {app.status}
                </span>
              </div>
              {app.coverLetter && (
                <p className="mt-3 text-gray-700 text-sm whitespace-pre-wrap">
                  {app.coverLetter}
                </p>
              )}
              {app.proposedRate != null && (
                <p className="mt-2 text-sm text-gray-600">
                  Proposed rate: {app.proposedRate} USDC
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
