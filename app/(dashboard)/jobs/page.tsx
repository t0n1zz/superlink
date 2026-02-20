import Link from "next/link";
import JobsList from "@/components/jobs/JobsList";

export default function JobsPage() {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Jobs</h1>
          <p className="mt-1 text-slate-600">
            Browse open opportunities or post a job (with FairScore gating).
          </p>
        </div>
        <Link
          href="/jobs/post"
          className="whitespace-nowrap rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          Post a job
        </Link>
      </div>
      <JobsList />
    </div>
  );
}
