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
      className="block border rounded-xl p-4 hover:shadow-lg transition"
    >
      <div className="flex gap-3">
        {builder.profilePhoto ? (
          <img
            src={builder.profilePhoto}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
            {(builder.name ?? builder.walletAddress).slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold truncate">
            {builder.name ?? shortenAddress(builder.walletAddress)}
          </h3>
          <p className="text-sm text-gray-500">
            FairScore: {builder.fairScore} · {builder.city ?? "Remote"}
          </p>
          {builder.skills && builder.skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {builder.skills.slice(0, 3).map((us) => (
                <span
                  key={us.id}
                  className="text-xs px-2 py-0.5 bg-gray-100 rounded"
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
