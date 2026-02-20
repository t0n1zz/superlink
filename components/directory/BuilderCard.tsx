import Link from "next/link";
import type { User } from "@prisma/client";
import type { UserSkill, Skill } from "@prisma/client";
import { shortenAddress } from "@/lib/solana";

type Builder = User & {
  skills?: (UserSkill & { skill: Skill })[];
};

interface BuilderCardProps {
  builder: Builder;
}

export default function BuilderCard({ builder }: BuilderCardProps) {
  return (
    <Link
      href={`/profile/${builder.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-slate-300"
    >
      <div className="flex gap-4">
        {builder.profilePhoto ? (
          <img
            src={builder.profilePhoto}
            alt=""
            className="h-14 w-14 shrink-0 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-semibold text-indigo-600">
            {(builder.name ?? builder.walletAddress).slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-900 truncate">
            {builder.name ?? shortenAddress(builder.walletAddress)}
          </h3>
          <p className="text-sm text-slate-600">
            FairScore: <span className="font-medium text-indigo-600">{builder.fairScore}</span>
            {" · "}
            {builder.city ?? "Remote"}
          </p>
          {builder.skills && builder.skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {builder.skills.slice(0, 3).map((us) => (
                <span
                  key={us.id}
                  className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                >
                  {us.skill.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
