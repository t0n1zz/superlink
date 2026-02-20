import Link from "next/link";

interface JobCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number | null;
  budgetType: string;
  minFairScore: number;
  timeline: string | null;
  isRemote: boolean;
  poster?: { id: string; name: string | null; fairScore: number } | null;
}

export default function JobCard({
  id,
  title,
  description,
  category,
  budget,
  budgetType,
  minFairScore,
  timeline,
  isRemote,
  poster,
}: JobCardProps) {
  return (
    <Link
      href={`/jobs/${id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-slate-300"
    >
      <h3 className="font-semibold text-lg text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{category}</p>
      <p className="mt-2 line-clamp-2 text-slate-600">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {budget != null && (
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
            {budget} USDC ({budgetType})
          </span>
        )}
        <span className="rounded-lg bg-indigo-100 px-2.5 py-1 font-medium text-indigo-800">
          Min FairScore: {minFairScore}
        </span>
        {timeline && (
          <span className="text-slate-500">{timeline}</span>
        )}
        {isRemote && (
          <span className="text-slate-500">Remote</span>
        )}
      </div>
      {poster && (
        <p className="mt-3 text-sm text-slate-600">
          Posted by {poster.name ?? "Anonymous"} · FairScore {poster.fairScore}
        </p>
      )}
    </Link>
  );
}
