"use client";

import type { Endorsement, User } from "@prisma/client";
import EndorseButton from "./EndorseButton";
import EndorsementsList from "./EndorsementsList";

type EndorsementWithGiver = Endorsement & { giver: User };

interface EndorsementsSectionProps {
  receiverId: string;
  endorsements: EndorsementWithGiver[];
}

export default function EndorsementsSection({
  receiverId,
  endorsements,
}: EndorsementsSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between gap-4 mb-3">
        <h2 className="text-lg font-semibold">Endorsements</h2>
        <EndorseButton receiverId={receiverId} />
      </div>
      <EndorsementsList endorsements={endorsements} />
    </section>
  );
}
