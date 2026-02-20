"use client";

import Link from "next/link";
import { useCurrentUser } from "@/components/auth/CurrentUserContext";

interface ViewApplicationsLinkProps {
  jobId: string;
  posterId: string;
}

export default function ViewApplicationsLink({
  jobId,
  posterId,
}: ViewApplicationsLinkProps) {
  const { user } = useCurrentUser();
  if (!user || user.id !== posterId) return null;
  return (
    <Link
      href={`/jobs/${jobId}/applications`}
      className="inline-block ml-3 text-purple-600 hover:underline text-sm"
    >
      View applications
    </Link>
  );
}
