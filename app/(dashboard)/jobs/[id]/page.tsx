import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { shortenAddress } from "@/lib/solana";
import ViewApplicationsLink from "@/components/jobs/ViewApplicationsLink";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      poster: {
        select: {
          id: true,
          name: true,
          walletAddress: true,
          fairScore: true,
          city: true,
        },
      },
    },
  });

  if (!job) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/jobs"
        className="mb-6 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
      >
        ← Back to jobs
      </Link>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
        <p className="mt-1 text-slate-500">{job.category}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-lg bg-indigo-100 px-2.5 py-1 text-sm font-medium text-indigo-800">
            Min FairScore: {job.minFairScore}
          </span>
          {job.budget != null && (
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700">
              {job.budget} USDC ({job.budgetType})
            </span>
          )}
          {job.timeline && (
            <span className="text-sm text-slate-600">{job.timeline}</span>
          )}
          {job.isRemote && (
            <span className="text-sm text-slate-600">Remote</span>
          )}
        </div>
        <div className="mt-6 text-slate-700">
          <p className="whitespace-pre-wrap">{job.description}</p>
        </div>
        {job.requiredSkills.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-2 font-semibold text-slate-900">Required skills</h3>
            <ul className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
        {job.poster && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <h3 className="font-semibold text-slate-900">Posted by</h3>
            <Link
              href={`/profile/${job.poster.id}`}
              className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              {job.poster.name ?? shortenAddress(job.poster.walletAddress)}
            </Link>
            <p className="text-sm text-slate-600">
              FairScore: {job.poster.fairScore}
              {job.poster.city && ` · ${job.poster.city}`}
            </p>
          </div>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={`/jobs/${id}/apply`}
            className="inline-block rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
          >
            Apply for this job
          </Link>
          <ViewApplicationsLink jobId={id} posterId={job.posterId} />
        </div>
      </div>
    </div>
  );
}
