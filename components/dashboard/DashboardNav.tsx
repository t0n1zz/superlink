"use client";

import Link from "next/link";
import { useCurrentUser } from "@/components/auth/CurrentUserContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const navLink =
  "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900";

export function DashboardNav() {
  const { user } = useCurrentUser();

  return (
    <div className="flex flex-wrap items-center gap-1">
      <Link href="/directory" className={navLink}>
        Directory
      </Link>
      <Link href="/jobs" className={navLink}>
        Jobs
      </Link>
      {user && (
        <Link href="/jobs/my-applications" className={navLink}>
          My applications
        </Link>
      )}
      <Link href="/map" className={navLink}>
        Map
      </Link>
      <Link href="/universities" className={navLink}>
        Universities
      </Link>
      {user && (
        <>
          <Link href={`/profile/${user.id}`} className={navLink}>
            My profile
          </Link>
          <Link href="/profile/edit" className={navLink}>
            Edit profile
          </Link>
          <Link href="/settings" className={navLink}>
            Settings
          </Link>
        </>
      )}
      <div className="ml-2">
        <WalletMultiButton className="!rounded-xl !bg-indigo-600 !px-4 !py-2 !text-sm !font-semibold !text-white hover:!bg-indigo-700 !transition-colors" />
      </div>
    </div>
  );
}
