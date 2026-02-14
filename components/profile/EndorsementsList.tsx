import type { Endorsement, User } from "@prisma/client";

type EndorsementWithGiver = Endorsement & { giver: User };

interface EndorsementsListProps {
  endorsements: EndorsementWithGiver[];
}

export default function EndorsementsList({
  endorsements,
}: EndorsementsListProps) {
  if (endorsements.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Endorsements</h2>
      <ul className="space-y-3">
        {endorsements.map((e) => (
          <li key={e.id} className="border rounded-lg p-3">
            <p className="text-sm text-gray-600">
              From{" "}
              <span className="font-medium">
                {e.giver.name ?? e.giver.walletAddress.slice(0, 8)}...
              </span>
            </p>
            {e.message && (
              <p className="mt-1 text-gray-700">&ldquo;{e.message}&rdquo;</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
