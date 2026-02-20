import Link from "next/link";
import { shortenAddress } from "@/lib/solana";
import type { User } from "@prisma/client";
import type { University } from "@prisma/client";

interface ProfileHeaderProps {
  user: User;
  university?: University | null;
}

const tierStyles: Record<string, string> = {
  PLATINUM: "bg-amber-100 text-amber-900",
  GOLD: "bg-yellow-100 text-yellow-900",
  SILVER: "bg-slate-200 text-slate-800",
  BRONZE: "bg-orange-100 text-orange-900",
};

export default function ProfileHeader({ user, university }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
      {user.profilePhoto ? (
        <img
          src={user.profilePhoto}
          alt={user.name ?? "Profile"}
          className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-2 ring-slate-200"
        />
      ) : (
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-3xl font-bold text-indigo-600">
          {(user.name ?? user.walletAddress).slice(0, 1).toUpperCase()}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-bold text-slate-900">
          {user.name ?? shortenAddress(user.walletAddress)}
        </h1>
        <p className="text-sm font-mono text-slate-500">
          {shortenAddress(user.walletAddress, 8)}
        </p>
        {user.bio && (
          <p className="mt-2 max-w-xl text-slate-600 leading-relaxed">{user.bio}</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-lg px-2.5 py-1 text-sm font-semibold ${
              tierStyles[user.fairScoreTier] ?? "bg-slate-100 text-slate-700"
            }`}
          >
            FairScore: {user.fairScore} ({user.fairScoreTier})
          </span>
          {user.city && (
            <span className="text-sm text-slate-600">{user.city}</span>
          )}
          {university && (
            <Link
              href={`/universities/${university.id}`}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              {university.name}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
