import { shortenAddress } from "@/lib/solana";
import type { User } from "@prisma/client";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      {user.profilePhoto ? (
        <img
          src={user.profilePhoto}
          alt={user.name ?? "Profile"}
          className="w-24 h-24 rounded-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-2xl font-bold text-purple-600">
          {(user.name ?? user.walletAddress).slice(0, 1).toUpperCase()}
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold">
          {user.name ?? shortenAddress(user.walletAddress)}
        </h1>
        <p className="text-gray-500 text-sm font-mono">
          {shortenAddress(user.walletAddress, 8)}
        </p>
        {user.bio && (
          <p className="mt-2 text-gray-600 max-w-xl">{user.bio}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          <span
            className={`
            px-2 py-0.5 rounded text-sm font-medium
            ${user.fairScoreTier === "PLATINUM" ? "bg-amber-100 text-amber-800" : ""}
            ${user.fairScoreTier === "GOLD" ? "bg-yellow-100 text-yellow-800" : ""}
            ${user.fairScoreTier === "SILVER" ? "bg-gray-200 text-gray-700" : ""}
            ${user.fairScoreTier === "BRONZE" ? "bg-orange-100 text-orange-800" : ""}
          `}
          >
            FairScore: {user.fairScore} ({user.fairScoreTier})
          </span>
          {user.city && (
            <span className="text-sm text-gray-500">{user.city}</span>
          )}
        </div>
      </div>
    </div>
  );
}
