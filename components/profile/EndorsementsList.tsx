import type { Endorsement, User } from "@prisma/client";

type EndorsementWithGiver = Endorsement & { giver: User };

interface EndorsementsListProps {
  endorsements: EndorsementWithGiver[];
}

export default function EndorsementsList({
  endorsements,
}: EndorsementsListProps) {
  if (endorsements.length === 0) {
    return <p className="text-sm text-slate-500">No endorsements yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {endorsements.map((e) => (
        <li key={e.id} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
          <p className="text-sm text-slate-600">
            From{" "}
            <span className="font-semibold text-slate-900">
              {e.giver.name ?? e.giver.walletAddress.slice(0, 8)}...
            </span>
          </p>
          {e.message && (
            <p className="mt-1.5 text-slate-700">&ldquo;{e.message}&rdquo;</p>
          )}
        </li>
      ))}
    </ul>
  );
}
