"use client";

import { useState, useEffect } from "react";
import JobCard from "./JobCard";

interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number | null;
  budgetType: string;
  minFairScore: number;
  timeline: string | null;
  isRemote: boolean;
  poster: { id: string; name: string | null; fairScore: number } | null;
}

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/jobs?status=open")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs ?? []))
      .catch(() => setError("Failed to load jobs"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Loading jobs…
      </div>
    );
  }
  if (error) return <div className="font-medium text-red-600">{error}</div>;
  if (jobs.length === 0) {
    return (
      <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
        No open jobs yet. Be the first to post one.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          description={job.description}
          category={job.category}
          budget={job.budget}
          budgetType={job.budgetType}
          minFairScore={job.minFairScore}
          timeline={job.timeline}
          isRemote={job.isRemote}
          poster={job.poster}
        />
      ))}
    </div>
  );
}
